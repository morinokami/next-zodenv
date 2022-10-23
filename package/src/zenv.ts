import { z } from 'zod'

import { defaultReporter } from './reporter'
import { ZenvOptions, ZodErrors } from './types'

export function zenv<EnvVar extends z.ZodRawShape>(
  validators: z.ZodObject<EnvVar>,
  {
    nextPublic = {},
    env = process.env,
    reporter = defaultReporter,
  }: ZenvOptions = {},
): z.infer<z.ZodObject<EnvVar>> {
  const result = {} as z.infer<z.ZodObject<EnvVar>>
  const errors: ZodErrors = {}

  // Validate environment variables
  for (const key in validators.shape) {
    const validator = validators.shape[key]
    const value = nextPublic[key] ?? env[key]
    const resolved = validator.safeParse(value)
    if (resolved.success) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[key] = resolved.data
    } else {
      errors[key] = resolved.error.issues
    }
  }

  // Report errors if any
  if (Object.keys(errors).length > 0) {
    reporter(errors)
  }

  return result
}
