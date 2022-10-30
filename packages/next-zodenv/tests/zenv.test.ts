import { num, str, zenv } from '../src'

describe('zenv', () => {
  test('validate and transform environment variables', () => {
    const EnvSchema = {
      FOO: 'foo',
      BAR: '888',
    }
    const env = zenv(
      {
        FOO: str(),
        BAR: num(),
      },
      { env: EnvSchema },
    )
    expect(env).toStrictEqual({
      FOO: 'foo',
      BAR: 888,
    })
  })

  test('validate and transform public environment variables', () => {
    const env = zenv({
      NEXT_PUBLIC_FOO: { zodType: str(), value: 'foo' },
      NEXT_PUBLIC_BAR: { zodType: num(), value: '888' },
    })
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
        {
          FOO: str(),
          BAR: str(),
        },
        { env: EnvSchema },
      ),
    ).toThrowError(TypeError)

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
        {
          FOO: str(),
          BAR: num(),
        },
        { env: EnvSchema },
      ),
    ).toThrowError(TypeError)

    console.error = originalError
  })
})
