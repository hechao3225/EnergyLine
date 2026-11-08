from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets/energy_park_art_pack_v1/manifest.json"


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    errors: list[str] = []
    for asset in manifest["assets"]:
        path = ROOT / "assets/energy_park_art_pack_v1" / asset["file"]
        if not path.exists():
            errors.append(f"missing: {asset['file']}")
            continue
        with Image.open(path) as image:
            actual_size = list(image.size)
            expected_size = asset.get("size")
            if expected_size and actual_size != expected_size:
                errors.append(f"size: {asset['file']} expected {expected_size}, got {actual_size}")
            if asset.get("alpha") and "A" not in image.getbands():
                errors.append(f"alpha: {asset['file']} has no alpha channel")
            if asset.get("alpha") and image.getchannel("A").getbbox() is None:
                errors.append(f"alpha: {asset['file']} is fully transparent")

    if errors:
        raise SystemExit("\n".join(errors))
    print(f"verified {len(manifest['assets'])} assets")


if __name__ == "__main__":
    main()
