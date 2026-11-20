"""验证商店素材生成器的确定性元数据门禁。"""

from __future__ import annotations

from copy import deepcopy

import prepare_shop_assets as generator


def expect_metadata_failure(
    manifest: dict, assets: dict, key: str, replace
) -> None:
    broken = deepcopy(manifest)
    entry = next(item for item in broken["assets"] if item["name"] == "mood-joy")
    entry[key] = replace(entry[key])
    try:
        generator.check_assets(broken, assets)
    except ValueError as error:
        if "mood-joy.webp 确定性清单字段不一致" not in str(error):
            raise
        return
    raise AssertionError(f"篡改 {key} 后仍通过")


def main() -> None:
    generator.require_pillow_version()
    assets, metadata = generator.build_assets()
    manifest = generator.manifest_for(assets, metadata)
    generator.check_assets(manifest, assets)
    expect_metadata_failure(
        manifest,
        assets,
        "processing",
        lambda value: f"{value}（篡改）",
    )
    expect_metadata_failure(
        manifest,
        assets,
        "source",
        lambda value: value.replace(
            "assets/energy_park_art_pack_v1/02_characters/expressions/yunrong_happy.png",
            "yonrong_happy.png",
        ),
    )
    print("通过：确定性清单通过；篡改 processing/source 均失败")


if __name__ == "__main__":
    main()
