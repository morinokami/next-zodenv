import { ZodErrors } from './types'

export function defaultReporter(errors: ZodErrors): void {
  if (Object.keys(errors).length > 0) {
    const output: string[] = []

    for (const [key, issues] of Object.entries(errors)) {
      for (const issue of issues) {
        output.push(`  ${key}: ${issue.message}`)
      }
    }

    const message = `Invalid environment variables:\n${output.join('\n')}`
    console.error(message)
    throw new TypeError(message)
  }
}
