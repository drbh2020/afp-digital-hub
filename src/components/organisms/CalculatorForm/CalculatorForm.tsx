import { debounce } from "lodash"
import { useMemo, useState } from "react"

export const CalculatorForm = () => {
  const [results, setResults] = useState<PensionResults>()
  
  // Real-time calculation mientras el user tipea
  const debouncedCalculation = useMemo(
    () => debounce(calculatePension, 500),
    []
  )
  
  return (
    <div>
      {/* Form */}
      {results && (
        <AnimatedChart data={results.projectionByYear} />
      )}
    </div>
  )
}