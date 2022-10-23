import { ZodIssue } from 'zod'

import { defaultReporter } from '../src'

describe('defaultReporter', () => {
  test('do nothing if no errors', () => {
    expect(() => defaultReporter({})).not.toThrow()
  })

  test('report missing env error', () => {
    const originalError = console.error
    console.error = jest.fn()

    const errors = {
      FOO: [
        {
          message: 'Expected string, received undefined',
        } as ZodIssue,
      ],
    }
    const expected =
      'Invalid environment variables:\n  FOO: Expected string, received undefined'
    expect(() => defaultReporter(errors)).toThrow(new TypeError(expected))

    console.error = originalError
  })

  test('report invalid env error', () => {
    const originalError = console.error
    console.error = jest.fn()

    const errors = {
      FOO: [
        {
          message: 'Expected string, received number',
        } as ZodIssue,
      ],
    }
    const expected =
      'Invalid environment variables:\n  FOO: Expected string, received number'
    expect(() => defaultReporter(errors)).toThrow(new TypeError(expected))

    console.error = originalError
  })
})
