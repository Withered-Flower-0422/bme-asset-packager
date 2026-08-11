import useTitleGradient from "../../hooks/useTitleGradient"
import styles from "./index.module.css"

export default function Title({ children }: { children: string }) {
  const { titleGradient, setTitleGradient } = useTitleGradient()

  return (
    <h1
      className={`${styles.self} ${titleGradient ? styles.active : ""}`}
      onClick={() => setTitleGradient(!titleGradient)}
    >
      <span>{children}</span>
      <span className={styles.gradient}>{children}</span>
    </h1>
  )
}
