import { app, BrowserWindow } from "electron"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { store } from "./ipc/store"
import "./ipc"

const appDir = dirname(fileURLToPath(import.meta.url))

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1000,
    height: 570,
    resizable: false,
    title: "BME Asset Packager",
    icon: join(appDir, "..", "public", "ballex2.ico"),
    webPreferences: { preload: join(appDir, "preload.mjs") },
  })
  win.removeMenu()

  const bounds = store.get("winBounds")
  if (bounds) win.setBounds(bounds)
  win.on("moved", () => store.set("winBounds", win.getBounds()))

  if (app.isPackaged) win.loadFile(join(appDir, "..", "dist", "index.html"))
  else {
    win.webContents.openDevTools({ mode: "detach" })
    win.loadURL("http://localhost:5173")
  }
})
