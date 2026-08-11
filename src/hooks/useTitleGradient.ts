import { useCallback, useEffect, useState } from "react"

export default function () {
  const [titleGradient, _setTitleGradient] = useState(false)

  const loadTitleGradient = useCallback(
    async () => _setTitleGradient(await window.electronAPI.getTitleGradient()),
    [],
  )

  const setTitleGradient = useCallback(
    async (titleGradient: boolean) => {
      await window.electronAPI.setTitleGradient(titleGradient)
      await loadTitleGradient()
    },
    [loadTitleGradient],
  )

  useEffect(() => void loadTitleGradient(), [loadTitleGradient])

  return { titleGradient, loadTitleGradient, setTitleGradient }
}
