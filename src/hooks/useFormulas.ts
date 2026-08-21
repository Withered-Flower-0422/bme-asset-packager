import { useCallback, useEffect, useState } from "react"
import type { Formula, Formulas } from "../../electron/ipc/store"

export default function () {
  const [formulas, setFormulas] = useState<Formulas>({})

  const loadFormulas = useCallback(
    async () => setFormulas(await electronAPI.loadFormulas()),
    [],
  )

  const deleteFormula = useCallback(
    async (name: string) => {
      await electronAPI.deleteFormula(name)
      await loadFormulas()
    },
    [loadFormulas],
  )

  const saveFormula = useCallback(
    async (name: string, formula: Formula) => {
      await electronAPI.saveFormula(name, formula)
      await loadFormulas()
    },
    [loadFormulas],
  )

  useEffect(() => void loadFormulas(), [loadFormulas])

  return { formulas, deleteFormula, saveFormula, loadFormulas }
}
