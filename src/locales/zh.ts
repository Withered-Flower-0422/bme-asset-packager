import type { Locale } from "."

export default {
  abbr: "中",
  missingFormulaNameWarning: "请输入配方名称",
  saveFormulaSuccess: inputValue => `保存成功：${inputValue}`,
  overwriteWarningTitle: "覆盖？",
  overwriteWarningMessage: inputValue => `"${inputValue}"已存在，是否覆盖？`,
  noSelectedFormulaWarning: "请选择一个配方以导入",
  loadFormulaSuccess: selectedValue => `"${selectedValue}"已加载`,
  addFolders: "添加文件夹",
  wrongFolderPathWarning:
    "添加的文件夹必须为Assets文件夹的子文件夹（如：Items/Maze）。非法资源已被忽略。",
  addAssets: "添加资源",
  wrongAssetPathWarning:
    "添加的资源必须在Assets文件夹的子文件夹下（如：Items/Maze/MazeWall.item）。非法资源已被忽略。",
  addIcons: "添加图标",
  wrongIconPathWarning:
    '图标必须在"Scripts/_Editor/Icons/"路径下。非法资源已被忽略。',
  formulaName: "配方名称",
  save: "保存",
  selectFormula: "选择配方",
  deleteWarningTitle: "删除？",
  deleteWarningMessage: label => `你确定要删除"${label}"吗？`,
  import: "导入",
  packing: "打包中...",
  zip: "打包",
  ok: "确认",
  cancel: "取消",
  packSuccessTitle: "打包成功",
  packSuccessMessage: zipSize => `压缩包大小：${zipSize}字节`,
  notFoundAssetWarningTitle: "未找到的资源",
  notFoundAssetWarningFooter:
    "*有时编辑资源后会残留一些旧的关联资源，只要游戏中资源正常工作，这些未找到的资源可以忽略。",
  bmeAssetPackager: "BME资源打包工具",
  author: author => `作者: ${author}`,
  version: version => `版本: ${version}`,
  license: license => `许可证: ${license}`,
} satisfies Locale
