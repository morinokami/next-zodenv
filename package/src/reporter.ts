import { InvalidEnvError, MissingEnvError } from './errors'
import { ZodErrors } from './types'

export function defaultReporter(errors: ZodErrors): never {
  // TODO: Use MissingEnvError and InvalidEnvError
  throw new Error(JSON.stringify(errors, null, 2))
}
