import { app, BrowserWindow } from "electron"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { store } from "./ipc/store"
import "./ipc"

const lock = app.requestSingleInstanceLock()
const appDir = dirname(fileURLToPath(import.meta.url))

const winSize = { width: 1000, height: 635 }

let win: BrowserWindow
if (!lock) app.quit()
else {
  app.on("second-instance", () => {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  })

  app.whenReady().then(() => {
    win = new BrowserWindow({
      ...winSize,
      resizable: false,
      title: "BME Asset Packager",
      icon: join(appDir, "..", "public", "ballex2.ico"),
      webPreferences: { preload: join(appDir, "preload.mjs") },
    })
    win.removeMenu()

    const bounds = store.get("winBounds")
    if (bounds) win.setBounds({ ...bounds, ...winSize })
    win.on("moved", () => store.set("winBounds", win.getBounds()))

    if (app.isPackaged) win.loadFile(join(appDir, "..", "dist", "index.html"))
    else {
      win.webContents.openDevTools({ mode: "detach" })
      win.loadURL("http://localhost:5173")
    }
  })
}
