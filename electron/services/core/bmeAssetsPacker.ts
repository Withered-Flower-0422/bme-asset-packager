import { ZipArchive } from "archiver"
import { createWriteStream, existsSync, readFileSync } from "fs"
import { dirname, join, relative } from "path"
import type { BMEFolder, BMEPath } from "../types/suffix"
import BMEAssetsGetter from "./bmeAssetsGetter"

export default class BMEAssetsPacker {
  zipName = "Assets.zip"
  readonly assetsGetter: BMEAssetsGetter

  private get zipDir() {
    return dirname(this.assetsGetter.root)
  }

  constructor(
    public outputDir: string,
    assetsConfig: {
      root: string
      folders?: BMEFolder[]
      extras?: BMEPath[]
      icons?: string[]
    },
    public readonly extraFiles: Record<string, string | null> = {},
  ) {
    this.assetsGetter = new BMEAssetsGetter(
      assetsConfig.root,
      assetsConfig.folders,
      assetsConfig.extras,
      assetsConfig.icons,
    )
  }

  async pack() {
    const archive = new ZipArchive({ zlib: { level: 9 } })
    archive.pipe(createWriteStream(join(this.outputDir, this.zipName)))

    const { assets, grouped } = this.assetsGetter.allAssets

    const notFound = new Set<string>(grouped.NotFounds)
    for (const asset of assets) {
      const assetPath = join(this.assetsGetter.root, asset)
      if (!existsSync(assetPath)) {
        notFound.add(asset)
        continue
      }

      if (assetPath.endsWith(".js")) {
        const tsNocheck = "// @ts-nocheck\n"
        let content = readFileSync(assetPath, "utf-8")
        if (!content.startsWith(tsNocheck)) content = tsNocheck + content
        archive.append(content, { name: relative(this.zipDir, assetPath) })
      } else archive.file(assetPath, { name: relative(this.zipDir, assetPath) })
    }

    for (const [source, target] of Object.entries(this.extraFiles))
      archive.file(source, { name: target ?? relative(this.zipDir, source) })

    await archive.finalize()

    return {
      zippedAssets: grouped,
      extraFiles: this.extraFiles,
      notFound,
      zipSize: archive.pointer(),
    }
  }
}
