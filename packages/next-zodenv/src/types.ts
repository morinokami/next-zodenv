import { z, ZodIssue } from 'zod'

type Environment = Record<string, string | undefined>

type ZodType<TOut = unknown, TIn = unknown> = z.ZodType<TOut, z.ZodTypeDef, TIn>

type NextPublic = {
  zodType: ZodType
  value: string | undefined
}

export type Schema = Record<string, ZodType | NextPublic>

export type ParsedSchema<S extends Schema> = {
  [K in keyof S]: S[K] extends ZodType
    ? z.infer<S[K]>
    : S[K] extends NextPublic
    ? z.infer<S[K]['zodType']>
    : never
}

export type ZodErrors = Record<string, ZodIssue[]>

export type ZenvOptions = {
  nextPublic?: Record<string, unknown>
  env?: Environment
  reporter?: (errors: ZodErrors) => unknown
}
