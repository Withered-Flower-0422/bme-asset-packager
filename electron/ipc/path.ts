import { dialog, type OpenDialogOptions } from "electron"
import { statSync } from "fs"
import { join, sep } from "path"
import type { HandlersSatisfier } from "."

const userProfile = process.env.USERPROFILE!

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

  isDir: (_, path: string) => statSync(path).isDirectory(),

  isFile: (_, path: string) => statSync(path).isFile(),
} satisfies HandlersSatisfier
