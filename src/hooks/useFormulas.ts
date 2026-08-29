import { useEffect, useState } from "react"
import type { Formula, Formulas } from "../../electron/ipc/store"

export default () => {
  const [formulas, setFormulas] = useState<Formulas>({})

  useEffect(() => void electronAPI.loadFormulas().then(setFormulas), [])

  return {
    formulas,
    deleteFormula: (name: string) => {
      electronAPI.deleteFormula(name)
      setFormulas(prev => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    },
    saveFormula: (name: string, formula: Formula) => {
      electronAPI.saveFormula(name, formula)
      setFormulas(prev => ({ ...prev, [name]: formula }))
    },
  }
}
