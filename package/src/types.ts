import { ZodIssue } from 'zod'

export type ZodErrors = Record<string, ZodIssue[]>

export type ZenvOptions = {
  nextPublic?: Record<string, unknown>
  env?: Record<string, string | undefined>
  reporter?: (errors: ZodErrors) => unknown
}
