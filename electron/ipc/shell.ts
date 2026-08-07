import { shell } from "electron"
import type { HandlersSatisfier } from "."

export default {
  openExternal: (_, url: string) => shell.openExternal(url),
} satisfies HandlersSatisfier
