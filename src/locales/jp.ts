import type { Locale } from "."

export default {
  abbr: "日",
  missingFormulaNameWarning: "数式名を入力してください",
  saveFormulaSuccess: inputValue => `保存に成功しました: ${inputValue}`,
  overwriteWarningTitle: "上書きしますか？",
  overwriteWarningMessage: inputValue =>
    `"${inputValue}" は既に存在します。上書きしますか？`,
  noSelectedFormulaWarning: "読み込む数式を選択してください",
  loadFormulaSuccess: selectedValue => `"${selectedValue}" を読み込みました`,
  addFolders: "フォルダを追加",
  wrongFolderPathWarning:
    "追加できるフォルダは Assets フォルダのサブフォルダである必要があります（例: Items/Maze）。無効なフォルダは無視されます。",
  addAssets: "アセットを追加",
  wrongAssetPathWarning:
    "追加できるアセットは Assets フォルダ内のサブフォルダに配置されている必要があります（例: Items/Maze/MazeWall.item）。無効なアセットは無視されます。",
  addIcons: "アイコンを追加",
  wrongIconPathWarning:
    'アイコンは "Scripts/_Editor/Icons/" 配下に配置する必要があります。無効なアセットは無視されます。',
  formulaName: "数式名",
  save: "保存",
  selectFormula: "数式を選択",
  deleteWarningTitle: "削除しますか？",
  deleteWarningMessage: label => `"${label}" を削除してもよろしいですか？`,
  import: "インポート",
  packing: "パッキング中...",
  zip: "ZIP",
  ok: "OK",
  cancel: "キャンセル",
  packSuccessTitle: "パッキング成功",
  packSuccessMessage: zipSize => `ZIP ファイルサイズ: ${zipSize} バイト`,
  notFoundAssetWarningTitle: "見つからないアセット",
  notFoundAssetWarningFooter:
    "*アセットを編集した後、古い関連アセットが残る場合があります。ゲーム内で正常に動作している場合、これらの見つからないアセットは無視できます。",
  bmeAssetPackager: "BME アセットパッケージャー",
  author: author => `作者: ${author}`,
  version: version => `バージョン: ${version}`,
  license: license => `ライセンス: ${license}`,
} satisfies Locale
