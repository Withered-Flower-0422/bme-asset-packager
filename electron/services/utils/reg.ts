export const sep = /\/|\\/g

export const nonAsciiReg = /[^ \P{C}\s]/gu

export const importedPathInJsReg =
  /(?:import|from)\s*(["'])(Scripts\/[^"']*?\.js)\1/g

export const assetRegs = [
  /Audios\/[^/]+\/[^/]+\.audio/g,
  /Items\/[^/]+\/[^/]+\.item/g,
  /Materials\/[^/]+\/[^/]+\.mat/g,
  /Meshes\/[^/]+\/[^/]+\.mesh/g,
  /Scripts\/[^/]+\/[^/]+\.js/g,
  /Textures\/[^/]+\/[^/]+\.tex/g,
  /Scenes\/[^/]+\/[^/]+\.scene/g,
]
