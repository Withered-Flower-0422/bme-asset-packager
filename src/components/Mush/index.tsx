import { Tooltip } from "antd"
import { useState } from "react"
import t from "../../locales"
import styles from "./index.module.css"

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "wheat",
] as const

export default function Mush() {
  const [colorIndex, setColorIndex] = useState(0)

  return (
    <Tooltip
      placement="left"
      color="#333"
      title={() => <span className={styles.quote}>{t("mushQuote")}</span>}
    >
      <img
        className={`${styles.self} ${styles[colors.at(colorIndex)!]}`}
        src="mush.png"
        alt="Mush"
        onClick={() =>
          window.electronAPI.openExternal(
            "https://store.steampowered.com/app/1383570/",
          )
        }
        onWheel={({ deltaY }) =>
          setColorIndex(prev => (prev + Math.sign(deltaY)) % colors.length)
        }
      />
    </Tooltip>
  )
}
