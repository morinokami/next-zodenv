import { z } from 'zod'

import { zenv } from '../src'

describe('zenv', () => {
  test('validate and transform environment variables', () => {
    const EnvSchema = {
      FOO: 'foo',
      BAR: '888',
    }
    const env = zenv(
      z.object({
        FOO: z.string(),
        BAR: z.string().transform((val) => Number(val)),
      }),
      { env: EnvSchema },
    )
    expect(env).toStrictEqual({
      FOO: 'foo',
      BAR: 888,
    })
  })

  test('validate and transform public environment variables', () => {
    const env = zenv(
      z.object({
        NEXT_PUBLIC_FOO: z.string(),
        NEXT_PUBLIC_BAR: z.string().transform((val) => Number(val)),
      }),
      { nextPublic: { NEXT_PUBLIC_FOO: 'foo', NEXT_PUBLIC_BAR: '888' } },
    )
    expect(env).toStrictEqual({
      NEXT_PUBLIC_FOO: 'foo',
      NEXT_PUBLIC_BAR: 888,
    })
  })

  test('missing env error', () => {
    const originalError = console.error
    console.error = jest.fn()

    const EnvSchema = {
      FOO: 'foo',
    }
    expect(() =>
      zenv(
        z.object({
          FOO: z.string(),
          BAR: z.string(),
        }),
        { env: EnvSchema },
      ),
    ).toThrowError()

    console.error = originalError
  })

  test('invalid env error', () => {
    const originalError = console.error
    console.error = jest.fn()

    const EnvSchema = {
      FOO: 'foo',
      BAR: 'bar',
    }
    expect(() =>
      zenv(
        z.object({
          FOO: z.string(),
          BAR: z.number(),
        }),
        { env: EnvSchema },
      ),
    ).toThrowError()

    console.error = originalError
  })
})
