import { ZodError } from 'zod'

export type ZodErrors = Record<string, ZodError>

export type ZenvOptions = {
  nextPublic?: boolean
  env?: Record<string, string | undefined>
  reporter?: (errors: ZodErrors) => unknown
}
