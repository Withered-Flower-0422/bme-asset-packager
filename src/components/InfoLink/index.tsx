import type { ReactNode } from "react"
// import styles from "./index.module.scss"

const { openExternal } = electronAPI

export default function InfoLink({
  link,
  children,
}: {
  link: string
  children: ReactNode
}) {
  return (
    <a
      onClick={e => {
        e.preventDefault()
        openExternal(link)
      }}
    >
      {children}
    </a>
  )
}
