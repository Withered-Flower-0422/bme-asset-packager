import { contextBridge, ipcRenderer } from "electron"
import type { Api } from "./ipc"
import pre from "./pre"

const apis = [
  "selectPath",
  "getAssetsPath",
  "getUserProfile",
  "getSep",
  "isDir",
  "isFile",

  "saveFormula",
  "loadFormulas",
  "deleteFormula",

  "getLang",
  "setLang",

  "getTitleGradient",
  "setTitleGradient",

  "openExternal",
  "showItemInFolder",
  "openPath",

  "pack",
] satisfies Api[]
export type ExposedApi = (typeof apis)[number]

contextBridge.exposeInMainWorld("electronAPI", {
  ...Object.fromEntries(
    apis.map(api => [
      api,
      (...args: any[]) => ipcRenderer.invoke(api, ...args),
    ]),
  ),
  ...pre,
})
