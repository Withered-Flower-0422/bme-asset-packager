import { Tooltip } from "antd"
import { useState } from "react"
import mush from "../../assets/mush/mush.png"
import memes from "../../assets/memes"
import t from "../../locales"
import { getRandomItem } from "../../utils/rnd"
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
      placement="leftTop"
      color="#333"
      title={() =>
        /* eslint-disable-next-line */
        Math.random() > 0.1 ? (
          <span className={styles.quote}>{t("mushQuote")}</span>
        ) : (
          <img className={styles.meme} src={getRandomItem(memes)} />
        )
      }
    >
      <img
        className={`${styles.self} ${styles[colors.at(colorIndex)!]}`}
        src={mush}
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
