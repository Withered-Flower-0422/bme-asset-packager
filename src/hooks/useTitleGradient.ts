import { useEffect, useState } from "react"

export default () => {
  const [titleGradient, setTitleGradient] = useState(false)

  useEffect(
    () => void electronAPI.getTitleGradient().then(setTitleGradient),
    [],
  )

  return {
    titleGradient,
    setTitleGradient: (value: boolean) => {
      electronAPI.setTitleGradient(value)
      setTitleGradient(value)
    },
  }
}
