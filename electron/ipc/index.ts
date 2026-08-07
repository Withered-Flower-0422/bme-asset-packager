import { ipcMain, type IpcMainInvokeEvent } from "electron"
import packIpcHandlers from "./pack"
import pathIpcHandlers from "./path"
import shellIpcHandlers from "./shell"
import storeIpcHandlers from "./store"

const handlers = {
  ...packIpcHandlers,
  ...pathIpcHandlers,
  ...shellIpcHandlers,
  ...storeIpcHandlers,
} satisfies HandlersSatisfier

export type HandlersSatisfier = Record<
  string,
  (e: IpcMainInvokeEvent, ...args: any[]) => any
>
export type Handlers = typeof handlers
export type Api = keyof Handlers

Object.entries(handlers).forEach(([api, f]) => ipcMain.handle(api, f))
