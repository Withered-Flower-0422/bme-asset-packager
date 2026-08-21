import { app, dialog, type OpenDialogOptions } from "electron"
import { statSync } from "fs"
import { join, sep } from "path"
import type { HandlersSatisfier } from "."

const userProfile = app.getPath("home")

const assetsPath = join(
  userProfile,
  "AppData",
  "LocalLow",
  "Mushreb",
  "BME Pro HDRP",
  "Assets",
)

export default {
  getSep: () => sep,

  getAssetsPath: () => assetsPath,

  getUserProfile: () => userProfile,

  selectPath: async (_, opt: OpenDialogOptions) =>
    (await dialog.showOpenDialog(opt)).filePaths,

  isDir: (_, path: string) => {
    try {
      return statSync(path).isDirectory()
    } catch {
      return false
    }
  },

  isFile: (_, path: string) => {
    try {
      return statSync(path).isFile()
    } catch {
      return false
    }
  },
} satisfies HandlersSatisfier
