import { useCallback, useEffect, useState } from "react"
import t, { type Lang } from "../locales"

export default function () {
  const [lang, _setLang] = useState<Lang>("en")

  const loadLang = useCallback(
    async () => _setLang((t.lang = await electronAPI.getLang())),
    [],
  )

  const setLang = useCallback(
    async (lang: Lang) => {
      await electronAPI.setLang(lang)
      await loadLang()
    },
    [loadLang],
  )

  useEffect(() => void loadLang(), [loadLang])

  return { lang, loadLang, setLang }
}
