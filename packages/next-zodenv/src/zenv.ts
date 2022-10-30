import { defaultReporter } from './reporter'
import { ParsedSchema, Schema, ZenvOptions, ZodErrors } from './types'

export function zenv<Validators extends Schema>(
  validators: Validators,
  {
    nextPublic = {},
    env = process.env,
    reporter = defaultReporter,
  }: ZenvOptions = {},
): ParsedSchema<Validators> {
  const result = {} as Record<string, unknown>
  const errors: ZodErrors = {}

  // Validate environment variables
  for (const [key, validator] of Object.entries(validators)) {
    const value = nextPublic[key] ?? env[key]
    const resolved = validator.safeParse(value)
    if (resolved.success) {
      result[key] = resolved.data
    } else {
      errors[key] = resolved.error.issues
    }
  }

  // Report errors if any
  if (Object.keys(errors).length > 0) {
    reporter(errors)
  }

  return result as ParsedSchema<Validators>
}
