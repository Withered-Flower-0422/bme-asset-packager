import type { IpcMainInvokeEvent } from "electron"
import type { Handlers } from "../../electron/ipc"
import type pre from "../../electron/pre"
import type { ExposedApi } from "../../electron/preload"

declare global {
  const electronAPI: {
    [K in ExposedApi]: Handlers[K] extends (...args: infer A) => infer R
      ? (
          ...args: A extends [IpcMainInvokeEvent, ...infer B] ? B : A
        ) => Promise<Awaited<R>>
      : never
  } & typeof pre
}
