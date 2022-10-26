import { ZodIssue } from 'zod'

export type Environment = Record<string, string | undefined>

export type ZodErrors = Record<string, ZodIssue[]>

export type ZenvOptions = {
  nextPublic?: Record<string, unknown>
  env?: Environment
  reporter?: (errors: ZodErrors) => unknown
}
