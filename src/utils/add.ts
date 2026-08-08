import { root, sep } from "./sys"
import { categories, suffixes } from "./bme"
import { warning } from "./msg"
import t from "../locales"

const { selectPath } = window.electronAPI

export const addFolders = async () => {
  let warn = false

  const res: string[] = []
  for (let path of await selectPath({
    properties: ["openDirectory", "multiSelections"],
    defaultPath: root,
  })) {
    if (!path.startsWith(root)) {
      warn = true
      continue
    }

    path = path.replace(root + sep, "")

    if (
      !categories.some(
        category => path.startsWith(category) && path.split(sep).length === 2,
      )
    ) {
      warn = true
      continue
    }

    res.push(path)
  }

  if (warn) warning(t("wrongFolderPathWarning"))

  return res
}

export const addAssets = async () => {
  let warn = false

  const res: string[] = []
  for (let path of await selectPath({
    properties: ["openFile", "multiSelections"],
    defaultPath: root,
    filters: [{ name: "BME Assets", extensions: suffixes }],
  })) {
    if (!path.startsWith(root)) {
      warn = true
      continue
    }

    path = path.replace(root + sep, "")

    if (
      !categories.some(
        category => path.startsWith(category) && path.split(sep).length === 3,
      )
    ) {
      warn = true
      continue
    }

    res.push(path)
  }

  if (warn) warning(t("wrongAssetPathWarning"))

  return res
}

export const addIcons = async () => {
  let warn = false

  const res: string[] = []
  const iconRoot = [root, "Scripts", "_Editor", "Icons"].join(sep)
  for (const path of await selectPath({
    properties: ["openFile", "multiSelections"],
    defaultPath: iconRoot,
    filters: [{ name: "BME Icons", extensions: ["tex"] }],
  })) {
    if (!path.startsWith(iconRoot)) {
      warn = true
      continue
    }
    res.push(path.split(sep).at(-1)!.replace(".tex", ""))
  }

  if (warn) warning(t("wrongIconPathWarning"))

  return res
}
