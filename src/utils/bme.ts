export type Categories = keyof typeof assetsPreToSux
export type AssetSuffix = (typeof assetsPreToSux)[Categories]
export const assetsPreToSux = {
  Audios: "audio",
  Items: "item",
  Scenes: "scene",
  Scripts: "js",
  Materials: "mat",
  Meshes: "mesh",
  Textures: "tex",
} as const

export const categories = Object.keys(assetsPreToSux) as Categories[]
export const suffixes = Object.values(assetsPreToSux) as AssetSuffix[]
