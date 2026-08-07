import { existsSync, readFileSync, readdirSync } from "fs"
import { join } from "path"
import type { BMEFolder, BMEIconPath, BMEPath } from "../types/suffix"
import {
  isBuiltin,
  isHybridAsset,
  isIcon,
  isScriptAsset,
} from "../utils/builtin"
import { assetRegs, importedPathInJsReg, nonAsciiReg, sep } from "../utils/reg"

export type GroupedAssets = {
  Audios: Set<BMEPath<"Audios">>
  Items: Set<BMEPath<"Items">>
  Materials: Set<BMEPath<"Materials">>
  Meshes: Set<BMEPath<"Meshes">>
  Scripts: Set<BMEPath<"Scripts">>
  Textures: Set<BMEPath<"Textures">>
  Scenes: Set<BMEPath<"Scenes">>
  Icons: Set<BMEIconPath>
  NotFounds: Set<BMEPath | BMEIconPath>
}

export default class BMEAssetsGetter {
  constructor(
    public root: string,
    public readonly folders: BMEFolder[] = [],
    public readonly extras: BMEPath[] = [],
    public readonly icons: string[] = [],
  ) {
    if (!existsSync(root)) throw new Error("Root does not exist")
  }

  get allInitialAssets(): Set<BMEPath | BMEIconPath> {
    const res = new Set<BMEPath | BMEIconPath>()

    for (const folder of this.folders) {
      if (isBuiltin(folder)) continue
      const dir = join(this.root, folder)
      if (!existsSync(dir)) continue
      for (const asset of readdirSync(dir))
        res.add(`${folder}/${asset}` as BMEPath)
    }

    for (const extra of this.extras) {
      if (isBuiltin(extra)) continue
      res.add(extra)
    }

    for (const icon of this.icons) {
      res.add(`Scripts/_Editor/Icons/${icon}.tex`)
    }

    return res
  }

  get allAssets(): Record<"assets" | "notFounds", Set<BMEPath | BMEIconPath>> {
    const assets = new Set<BMEPath | BMEIconPath>()
    const notFounds = new Set<BMEPath | BMEIconPath>()

    const q = [...this.allInitialAssets]
    while (q.length) {
      const a = q.shift()!
      if (isBuiltin(a) || assets.has(a)) continue

      const p = join(this.root, a)
      if (!existsSync(p)) {
        notFounds.add(a)
        continue
      }

      assets.add(a)
      if (isIcon(a)) continue

      if (isHybridAsset(a)) {
        for (const reg of assetRegs) {
          const matches = readFileSync(p, "utf-8")
            .replaceAll(nonAsciiReg, "")
            .match(reg) as BMEPath[] | null
          if (!matches) continue
          q.push(...matches)
        }
      } else if (isScriptAsset(a)) {
        q.push(
          ...readFileSync(p, "utf-8")
            .matchAll(importedPathInJsReg)
            .map(([, , p]) => p as BMEPath),
        )
      }
    }

    return { assets, notFounds }
  }

  get groupedAllAssets(): GroupedAssets {
    const res: GroupedAssets = {
      Audios: new Set(),
      Items: new Set(),
      Materials: new Set(),
      Meshes: new Set(),
      Scripts: new Set(),
      Textures: new Set(),
      Scenes: new Set(),
      Icons: new Set(),
      NotFounds: new Set(),
    }

    const { assets, notFounds } = this.allAssets

    for (const asset of assets) {
      if (isIcon(asset)) res.Icons.add(asset)
      else (res as any)[asset.split(sep)[0]].add(asset)
    }

    for (const asset of notFounds) res.NotFounds.add(asset)

    return res
  }
}
