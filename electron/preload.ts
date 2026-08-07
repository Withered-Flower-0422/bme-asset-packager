import { contextBridge, ipcRenderer, type IpcMainInvokeEvent } from "electron"
import type { Api, Handlers } from "./ipc"

const apis = [
  "selectPath",
  "getAssetsPath",
  "getUserProfile",
  "getSep",

  "saveFormula",
  "loadFormulas",
  "deleteFormula",

  "getLang",
  "setLang",

  "openExternal",

  "pack",
] satisfies Api[]

contextBridge.exposeInMainWorld(
  "electronAPI",
  Object.fromEntries(
    apis.map(api => [
      api,
      (...args: any[]) => ipcRenderer.invoke(api, ...args),
    ]),
  ),
)

declare global {
  interface Window {
    electronAPI: {
      [K in (typeof apis)[number]]: Handlers[K] extends (
        ...args: infer A
      ) => infer R
        ? (
            ...args: A extends [IpcMainInvokeEvent, ...infer B] ? B : A
          ) => R extends Promise<any> ? R : Promise<R>
        : never
    }
  }
}
