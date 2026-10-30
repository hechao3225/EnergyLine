import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

// Minimal pure-Node PNG encoder without external dependencies
function createPng(width, height, getPixel) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth: 8
  ihdrData.writeUInt8(6, 9); // color type: 6 (RGBA)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data: filter byte (0) + width * 4 bytes per scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(height * scanlineLength);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // IDAT Chunk
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table & function for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const typeAndData = Buffer.concat([typeBuf, data]);
  const crc = crc32(typeAndData);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

// Draw brand emblem: emerald gradient background + golden/teal blossom & water drops
function generateBrandPixel(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxR = w / 2;

  // Background radial gradient from #064e3b (center) to #022c22 (edges)
  const normDist = Math.min(1, dist / maxR);
  let r = Math.round(6 + (2 - 6) * normDist);
  let g = Math.round(78 + (44 - 78) * normDist);
  let b = Math.round(59 + (34 - 59) * normDist);
  let a = 255;

  // Maskable safe zone margin check
  const scale = isMaskable ? 0.72 : 0.88;
  const targetR = (w * 0.42) * scale;

  // Sacred Spring water ring
  if (Math.abs(dist - targetR * 0.7) < w * 0.02) {
    return [52, 211, 153, 200]; // #34d399 ring
  }

  // Center blossom petals
  const angle = Math.atan2(dy, dx);
  const petalR = targetR * 0.5 * (1 + 0.35 * Math.cos(4 * angle));
  if (dist < petalR) {
    if (dist < targetR * 0.18) {
      // Golden core
      return [250, 204, 21, 255]; // #facc15
    }
    // Lotus pink/coral petal
    return [244, 114, 182, 240]; // #f472b6
  }

  // Water spring flow lines
  if (Math.abs(dx) < w * 0.035 && dy > 0 && dy < targetR * 0.85) {
    return [103, 232, 249, 255]; // #67e8f9 cyan water stream
  }

  // Two side water drops
  const dropLDist = Math.hypot(x - (cx - targetR * 0.55), y - cy);
  const dropRDist = Math.hypot(x - (cx + targetR * 0.55), y - cy);
  if (dropLDist < w * 0.06 || dropRDist < w * 0.06) {
    return [103, 232, 249, 240];
  }

  return [r, g, b, a];
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. pwa-192x192.png
fs.writeFileSync(
  path.join(publicDir, 'pwa-192x192.png'),
  createPng(192, 192, (x, y, w, h) => generateBrandPixel(x, y, w, h, false))
);

// 2. pwa-512x512.png
fs.writeFileSync(
  path.join(publicDir, 'pwa-512x512.png'),
  createPng(512, 512, (x, y, w, h) => generateBrandPixel(x, y, w, h, false))
);

// 3. pwa-maskable-512x512.png (with safe zone)
fs.writeFileSync(
  path.join(publicDir, 'pwa-maskable-512x512.png'),
  createPng(512, 512, (x, y, w, h) => generateBrandPixel(x, y, w, h, true))
);

// 4. apple-touch-icon.png (180x180)
fs.writeFileSync(
  path.join(publicDir, 'apple-touch-icon.png'),
  createPng(180, 180, (x, y, w, h) => generateBrandPixel(x, y, w, h, false))
);

console.log('Successfully generated compliant Android PWA PNG icon set!');
