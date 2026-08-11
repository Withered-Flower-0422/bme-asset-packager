import { shell } from "electron"
import type { HandlersSatisfier } from "."

export default {
  openExternal: (_, url: string) => shell.openExternal(url),
  showItemInFolder: (_, path: string) => shell.showItemInFolder(path),
  openPath: (_, path: string) => shell.openPath(path),
} satisfies HandlersSatisfier
