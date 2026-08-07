import { useState, useEffect, useCallback } from "react"
import m, { type Lang } from "../locales"

export default function () {
  const [lang, _setLang] = useState<Lang>("en")

  const loadLang = useCallback(
    async () => _setLang((m.lang = await window.electronAPI.getLang())),
    [],
  )

  const setLang = useCallback(
    async (lang: Lang) => {
      await window.electronAPI.setLang(lang)
      await loadLang()
    },
    [loadLang],
  )

  useEffect(() => void loadLang(), [loadLang])

  return { lang, loadLang, setLang }
}
