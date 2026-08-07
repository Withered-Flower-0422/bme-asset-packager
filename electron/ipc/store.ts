import Store from "electron-store"
import type { Rectangle } from "electron"
import type { HandlersSatisfier } from "."
import type { Lang } from "../../src/locales"

export type Formulas = Record<string, Formula>

export interface Formula {
  folders: string[]
  extras: string[]
  icons: string[]
}

export interface StoreType {
  winBounds: Rectangle | null
  formulas: Formulas
  lang: Lang
}

export const store = new Store<StoreType>({
  defaults: {
    winBounds: null,
    formulas: {},
    lang: "en",
  },
})

export default {
  getLang: () => store.get("lang"),

  setLang: (_, lang: Lang) => store.set("lang", lang),

  loadFormulas: () => store.get("formulas"),

  saveFormula: (_, name: string, formula: Formula) =>
    store.set("formulas", { ...store.get("formulas"), [name]: formula }),

  deleteFormula: (_, name: string) => {
    const formulas = store.get("formulas")
    delete formulas[name]
    store.set("formulas", formulas)
  },
} satisfies HandlersSatisfier
