import { z, ZodIssue } from 'zod'

type Environment = Record<string, string | undefined>

type ZodType<TOut = unknown, TIn = unknown> = z.ZodType<TOut, z.ZodTypeDef, TIn>

export type Schema = Record<string, ZodType>

export type ParsedSchema<Validators extends Schema> = {
  [K in keyof Validators]: z.infer<Validators[K]>
}

export type ZodErrors = Record<string, ZodIssue[]>

export type ZenvOptions = {
  nextPublic?: Record<string, unknown>
  env?: Environment
  reporter?: (errors: ZodErrors) => unknown
}
