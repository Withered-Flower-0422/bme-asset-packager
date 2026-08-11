import { useCallback, useEffect, useState } from "react"
import type { Formula, Formulas } from "../../electron/ipc/store"

export default function () {
  const [formulas, setFormulas] = useState<Formulas>({})

  const loadFormulas = useCallback(
    async () => setFormulas(await window.electronAPI.loadFormulas()),
    [],
  )

  const deleteFormula = useCallback(
    async (name: string) => {
      await window.electronAPI.deleteFormula(name)
      await loadFormulas()
    },
    [loadFormulas],
  )

  const saveFormula = useCallback(
    async (name: string, formula: Formula) => {
      await window.electronAPI.saveFormula(name, formula)
      await loadFormulas()
    },
    [loadFormulas],
  )

  useEffect(() => void loadFormulas(), [loadFormulas])

  return { formulas, deleteFormula, saveFormula, loadFormulas }
}
