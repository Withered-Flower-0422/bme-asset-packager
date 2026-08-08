import { Button } from "antd"
import type useLang from "../../hooks/useLang"
import t from "../../locales"
import cc from "../../utils/cls"
import "./index.css"

const c = cc("lang-changer")

export default function LangChanger({
  lang,
  setLang,
}: {
  lang: ReturnType<typeof useLang>["lang"]
  setLang: ReturnType<typeof useLang>["setLang"]
}) {
  const setToNextLang = (step = 1) =>
    setLang(t.langs.at((t.langs.indexOf(lang) + step) % t.langs.length)!)

  return (
    <Button
      className={c()}
      type="text"
      onClick={() => setToNextLang()}
      onWheel={({ deltaY }) => setToNextLang(Math.sign(deltaY))}
    >
      {t("abbr")}
    </Button>
  )
}
