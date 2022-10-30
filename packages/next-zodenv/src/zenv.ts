import { z } from 'zod'

import { defaultReporter } from './reporter'
import { ParsedSchema, Schema, ZenvOptions, ZodErrors } from './types'

export function zenv<S extends Schema>(
  schema: S,
  { env = process.env, reporter = defaultReporter }: ZenvOptions = {},
): ParsedSchema<S> {
  const result = {} as Record<string, unknown>
  const errors: ZodErrors = {}

  // Validate environment variables
  for (const [key, entry] of Object.entries(schema)) {
    const value = entry instanceof z.ZodType ? env[key] : entry.value
    const resolved =
      entry instanceof z.ZodType
        ? entry.safeParse(value)
        : entry.zodType.safeParse(value)
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

  return result as ParsedSchema<S>
}
