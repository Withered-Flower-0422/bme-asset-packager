import { contextBridge, ipcRenderer, type IpcMainInvokeEvent } from "electron"
import type { Api, Handlers } from "./ipc"
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

contextBridge.exposeInMainWorld("electronAPI", {
  ...Object.fromEntries(
    apis.map(api => [
      api,
      (...args: any[]) => ipcRenderer.invoke(api, ...args),
    ]),
  ),
  ...pre,
})

declare global {
  const electronAPI: {
    [K in (typeof apis)[number]]: Handlers[K] extends (
      ...args: infer A
    ) => infer R
      ? (
          ...args: A extends [IpcMainInvokeEvent, ...infer B] ? B : A
        ) => Promise<Awaited<R>>
      : never
  } & typeof pre
}
