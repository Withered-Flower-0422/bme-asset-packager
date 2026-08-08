import type { Locale } from "."

export default {
  abbr: "ES",
  missingFormulaNameWarning: "Se requiere el nombre de la fórmula",
  saveFormulaSuccess: inputValue => `Guardado correctamente: ${inputValue}`,
  overwriteWarningTitle: "¿Sobrescribir?",
  overwriteWarningMessage: inputValue =>
    `"${inputValue}" ya existe. ¿Desea sobrescribirlo?`,
  noSelectedFormulaWarning: "Seleccione una fórmula para cargar",
  loadFormulaSuccess: selectedValue => `"${selectedValue}" cargada`,
  addFolders: "Añadir carpetas",
  wrongFolderPathWarning:
    "Las carpetas añadidas deben ser subcarpetas de la carpeta Assets (por ejemplo: Items/Maze). Las carpetas no válidas serán ignoradas.",
  addAssets: "Añadir recursos",
  wrongAssetPathWarning:
    "Los recursos añadidos deben estar dentro de las subcarpetas de la carpeta Assets (por ejemplo: Items/Maze/MazeWall.item). Los recursos no válidos serán ignorados.",
  addIcons: "Añadir iconos",
  wrongIconPathWarning:
    'Los iconos deben estar dentro de "Scripts/_Editor/Icons/". Los recursos no válidos serán ignorados.',
  formulaName: "Nombre de la fórmula",
  save: "Guardar",
  selectFormula: "Seleccionar fórmula",
  deleteWarningTitle: "¿Eliminar?",
  deleteWarningMessage: label => `¿Está seguro de eliminar "${label}"?`,
  import: "Importar",
  packing: "Empaquetando...",
  zip: "ZIP",
  ok: "Aceptar",
  cancel: "Cancelar",
  packSuccessTitle: "Empaquetado correctamente",
  packSuccessMessage: zipSize => `Tamaño del archivo ZIP: ${zipSize} bytes`,
  notFoundAssetWarningTitle: "Recursos no encontrados",
  notFoundAssetWarningFooter:
    "*A veces, después de editar recursos, pueden quedar algunos recursos antiguos relacionados. Siempre que estos recursos funcionen correctamente en el juego, pueden ignorarse.",
  bmeAssetPackager: "Empaquetador de recursos BME",
  author: author => `Autor: ${author}`,
  version: version => `Versión: ${version}`,
  license: license => `Licencia: ${license}`,
} satisfies Locale
