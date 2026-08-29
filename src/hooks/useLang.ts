import { useEffect, useState } from "react"
import t, { type Lang } from "../locales"

export default () => {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(
    () => void electronAPI.getLang().then(la => setLang((t.lang = la))),
    [],
  )

  return {
    lang,
    setLang: (value: Lang) => {
      t.lang = value
      electronAPI.setLang(value)
      setLang(value)
    },
  }
}
