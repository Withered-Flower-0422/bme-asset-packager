import type {
  AssetPrefix,
  BMEFolder,
  BMEIconPath,
  BMEPath,
} from "../types/suffix"
import { sep } from "./reg"

const builtinAssets: Record<AssetPrefix, string[]> = {
  Audios: ["Balls"],
  Items: [
    "Arches",
    "Ballustrades",
    "Bridge",
    "CheckPoint",
    "Cliff",
    "Columns",
    "DoorsAndKeys",
    "Floors",
    "FortressWalls",
    "Machinery",
    "Misc",
    "Pool",
    "RailBlock",
    "Rails",
    "Rigidbody",
    "RoundTowers",
    "Space",
    "Stairs",
    "Switcher",
    "Trims",
    "Vegetation",
    "Volcano",
    "Walls",
    "WoodenObjects",
  ],
  Materials: ["Balls", "Cliff", "Machinery", "Space", "Utility"],
  Meshes: ["Balls", "Space"],
  Scripts: [],
  Textures: [],
  Scenes: [],
}

export const isBuiltin = (asset: BMEFolder | BMEPath): boolean => {
  const [category, folder] = asset.split(sep) as
    | [AssetPrefix, string]
    | [AssetPrefix, string, string]
  return builtinAssets[category].includes(folder)
}

export const isHybridAsset = (
  asset: BMEPath,
): asset is BMEPath<"Items" | "Materials" | "Scenes"> =>
  asset.startsWith("Items") ||
  asset.startsWith("Materials") ||
  asset.startsWith("Scenes")

export const isPureAsset = (
  asset: BMEPath,
): asset is BMEPath<"Audios" | "Meshes" | "Textures"> =>
  asset.startsWith("Audios") ||
  asset.startsWith("Meshes") ||
  asset.startsWith("Textures")

export const isIcon = (asset: BMEPath | BMEIconPath): asset is BMEIconPath =>
  asset.startsWith("Scripts/_Editor/Icons")

export const isScriptAsset = (asset: BMEPath): asset is BMEPath<"Scripts"> =>
  asset.startsWith("Scripts")
