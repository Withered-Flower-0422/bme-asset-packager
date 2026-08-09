import type { ReactNode } from "react"
// import style from "./index.module.css"

const { openExternal } = window.electronAPI

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
