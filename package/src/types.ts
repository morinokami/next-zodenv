import { ZodError } from 'zod'

export type ZodErrors = Record<string, ZodError>

export type ZenvOptions = {
  nextPublic?: Record<string, unknown>
  env?: Record<string, string | undefined>
  reporter?: (errors: ZodErrors) => unknown
}
