import { z } from 'zod'

export const calculatorSchema = z.object({
  age: z.number().min(18).max(65),
  salary: z.number().min(930), // Sueldo mínimo Perú
  monthlyContribution: z.number().min(0),
  fundType: z.enum(['0', '1', '2', '3']),
  yearsToRetirement: z.number().min(1).max(47)
})

export type CalculatorInput = z.infer<typeof calculatorSchema>