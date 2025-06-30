import { calculatorSchema } from "@/schemas/business/calculator.schema"
import { useCallback, useReducer } from "react"

export const useCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  
  const calculate = useCallback((input: CalculatorInput) => {
    const validation = calculatorSchema.safeParse(input)
    if (!validation.success) {
      dispatch({ type: 'SET_ERRORS', errors: validation.error })
      return
    }
    
    const results = calculatePensionProjection(validation.data)
    dispatch({ type: 'SET_RESULTS', results })
  }, [])
  
  return { state, calculate }
}