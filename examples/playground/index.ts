import { zenv, str, port } from 'next-zodenv'
import { z } from 'zod'

const env = zenv({
  FOO: str().default('foo'),
  PORT: port(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

console.log(env.FOO)
console.log(env.PORT)
console.log(env.NODE_ENV)
