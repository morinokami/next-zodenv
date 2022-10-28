import { ZodError } from 'zod'

import { bool, email, num, port, str, url } from '../src'

test('str', () => {
  expect(str().parse('foo')).toBe('foo')
  expect(() => str().parse(123)).toThrowError(ZodError)
})

test('bool', () => {
  expect(bool().parse('true')).toBe(true)
  expect(bool().parse('false')).toBe(false)
  expect(bool().parse('foo')).toBe(false)
})

test('num', () => {
  expect(num().parse('123')).toBe(123)
  expect(num().parse('3.14')).toBe(3.14)
  expect(() => num().parse('foo')).toThrowError(ZodError)
})

test('port', () => {
  expect(port().parse('123')).toBe(123)
  expect(() => port().parse('0')).toThrowError(ZodError)
  expect(() => port().parse('65536')).toThrowError(ZodError)
  expect(() => port().parse('3.14')).toThrowError(ZodError)
  expect(() => port().parse('foo')).toThrowError(ZodError)
})

test('url', () => {
  expect(url().parse('https://example.com')).toBe('https://example.com')
  expect(() => url().parse('foo')).toThrowError(ZodError)
})

test('email', () => {
  expect(email().parse('foo@example.com')).toBe('foo@example.com')
  expect(() => email().parse('foo')).toThrowError(ZodError)
})
