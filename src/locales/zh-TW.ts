import type { Locale } from "."

export default {
  abbr: "繁",
  missingFormulaNameWarning: "請輸入配方名稱",
  saveFormulaSuccess: inputValue => `保存成功：${inputValue}`,
  overwriteWarningTitle: "覆蓋？",
  overwriteWarningMessage: inputValue => `"${inputValue}"已存在，是否覆蓋？`,
  noSelectedFormulaWarning: "請選擇一個配方以導入",
  loadFormulaSuccess: selectedValue => `"${selectedValue}"已載入`,
  addFolders: "添加資料夾",
  wrongFolderPathWarning:
    "添加的資料夾必須為 Assets 資料夾的子資料夾（例如：Items/Maze）。非法資源已被忽略。",
  addAssets: "添加資源",
  wrongAssetPathWarning:
    "添加的資源必須位於 Assets 資料夾的子資料夾下（例如：Items/Maze/MazeWall.item）。非法資源已被忽略。",
  addIcons: "添加圖示",
  wrongIconPathWarning:
    '圖示必須位於 "Scripts/_Editor/Icons/" 路徑下。非法資源已被忽略。',
  formulaName: "配方名稱",
  save: "保存",
  selectFormula: "選擇配方",
  deleteWarningTitle: "刪除？",
  deleteWarningMessage: label => `你確定要刪除 "${label}" 嗎？`,
  import: "導入",
  packing: "打包中...",
  zip: "打包",
  ok: "確認",
  cancel: "取消",
  packSuccessTitle: "打包成功",
  packSuccessMessage: zipSize => `壓縮檔大小：${zipSize} 位元組`,
  notFoundAssetWarningTitle: "未找到的資源",
  notFoundAssetWarningFooter:
    "*有時編輯資源後會殘留一些舊的相關資源，只要這些資源在遊戲中正常運作，這些未找到的資源可以忽略。",
  bmeAssetPackager: "BME 資源打包工具",
  author: author => `作者: ${author}`,
  version: version => `版本: ${version}`,
  license: license => `授權條款: ${license}`,
} satisfies Locale
