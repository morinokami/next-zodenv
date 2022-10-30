# next-zodenv

next-zodenv makes dealing with environment variables in [Next.js](https://nextjs.org/) safer. Its concept is heavily inspired by [envsafe](https://github.com/KATT/envsafe) created by [KATT](https://github.com/KATT), but there are some nuances; you define a schema for your `process.env` with [Zod](https://zod.dev/)'s constructs! In addition, because it's developed to work with Next.js in mind, integrating next-zodenv with Next.js is a piece of cake (it can be used with other environments, though).

Here are the basic ideas of next-zodenv:

* 💎 Express environment variables declaratively using Zod
* ✅ Validate that the specified environment variables are not missing on build time
* 🪄 Transform environment variables to the type your application expects
* 🤝 Work on Node.js and the browser

## Setup

```sh
npm install next-zodenv zod
```

## Usage

Suppose that you have the following environment variables:

```
FOO="server_only_variable"
PORT=3000
API_URL="https://example.com/api"
NEXT_PUBLIC_VAR="public_variable"
```

You can define a schema for your environment variables:

```ts
import { zenv } from 'next-zodenv'
import { z } from 'zod'

const env = zenv({
  FOO: z.string(),
  PORT: z.preprocess(Number, z.number().int().gte(1).lte(65535)),
  API_URL: z.string().url(),
})

env.FOO             // string
env.PORT            // number (1-65535)
env.API_URL         // string (URL)
env.NEXT_PUBLIC_VAR // undefined
```

Note that types other than string must be transformed with [`z.preprocess`](https://github.com/colinhacks/zod#preprocess) beforehand. This is because environment variables are always string and we need to transform them to the type Zod's schema expects.

For simple cases like the above, next-zodenv offers built-in validators defined using Zod's constructs:

```ts
import { zenv, str, port, url } from 'next-zodenv'

const env = zenv({
  FOO: str(),
  PORT: port(),
  API_URL: url(),
})
```

The complete list of built-in validators is as follows:

Validator | Zod schema
--- | ---
`str()` | `z.string()` 
`bool()` | `z.preprocess((val) => val === 'true', z.boolean())`
`num()` | `z.preprocess(Number, z.number())`
`port()` | `z.preprocess(Number, z.number().int().min(1).max(65535))`
`url()` | `z.string().url()`
`email()` | `z.string().email()`

### Next.js

In order to expose environment variables to the browser in Next.js, you need to pass the `nextPublic` option to `zenv` like this:

```ts
const env = zenv(
  {
    NEXT_PUBLIC_VAR: z.string(),
  },
  {
    nextPublic: {
      NEXT_PUBLIC_VAR: process.env.NEXT_PUBLIC_VAR,
    }
  },
)

env.NEXT_PUBLIC_VAR // available in the browser
```

To validate on build time and stop the build process if there are missing environment variables, load your schema in `next.config.js`:

```ts
// next.config.js
const { env } = require('./env/server.js');

// ...
```
