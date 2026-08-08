import type { Locale } from "."

export default {
  abbr: "EN",
  missingFormulaNameWarning: "Formula name required",
  saveFormulaSuccess: inputValue => `Save successfully: ${inputValue}`,
  overwriteWarningTitle: "Overwrite?",
  overwriteWarningMessage: inputValue =>
    `"${inputValue}" already exists. Do you want to overwrite it?`,
  noSelectedFormulaWarning: "Please select a formula to load",
  loadFormulaSuccess: selectedValue => `"${selectedValue}" loaded`,
  addFolders: "Add Folders",
  wrongFolderPathWarning:
    "The added folders must be the sub-folders of the Assets folders (e.g. Items/Maze). Invalid folders ignored.",
  addAssets: "Add Assets",
  wrongAssetPathWarning:
    "The added assets must be under the sub-folders of the Assets folders (e.g. Items/Maze/MazeWall.item). Invalid assets ignored.",
  addIcons: "Add Icons",
  wrongIconPathWarning:
    'Icons must be under "Scripts/_Editor/Icons/". Invalid assets ignored.',
  formulaName: "Formula Name",
  save: "Save",
  selectFormula: "Select Formula",
  deleteWarningTitle: "Delete?",
  deleteWarningMessage: label => `Are you sure to delete "${label}"?`,
  import: "Import",
  packing: "Packing...",
  zip: "Zip",
  ok: "OK",
  cancel: "Cancel",
  packSuccessTitle: "Pack Success",
  packSuccessMessage: zipSize => `Zip file size: ${zipSize} bytes`,
  notFoundAssetWarningTitle: "Not Found Assets",
  notFoundAssetWarningFooter:
    "*Sometimes after editing assets, some old related assets may remain. As long as these assets work well in game, these unfounded assets can be ignored.",
  bmeAssetPackager: "BME Asset Packager",
  author: author => `Author: ${author}`,
  version: version => `Version: ${version}`,
  license: license => `License: ${license}`,
} satisfies Locale
