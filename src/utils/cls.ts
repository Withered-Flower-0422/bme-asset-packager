export default (compName: string) =>
  (className = "") =>
    `_${compName}_${className}`
