import { z, ZodError } from 'zod'

import { defaultReporter } from './reporter'
import { ZenvOptions, ZodErrors } from './types'

export function zenv<EnvVar extends z.ZodRawShape>(
  validators: z.ZodObject<EnvVar>,
  {
    nextPublic = false,
    env = process.env,
    reporter = defaultReporter,
  }: ZenvOptions = {},
): z.infer<z.ZodObject<EnvVar>> {
  const result = {} as z.infer<z.ZodObject<EnvVar>>
  const errors: ZodErrors = {}

  // Validate environment variables
  for (const key in validators.shape) {
    const validator = validators.shape[key]
    try {
      const value = env[nextPublic ? `NEXT_PUBLIC_${key}` : key]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[key] = validator.parse(value)
    } catch (error) {
      errors[key] = error as ZodError
    }
  }

  // Report errors if any
  if (Object.keys(errors).length > 0) {
    reporter(errors)
  }

  return result
}
