# next-zodenv

next-zodenv makes dealing with environment variables in [Next.js](https://nextjs.org/) safer. Its concept is heavily inspired by [envsafe](https://github.com/KATT/envsafe) created by [KATT](https://github.com/KATT), but there are some nuances; you define a schema for your `process.env` with [Zod](https://zod.dev/)'s constructs! In addition, because it's developed to work with Next.js in mind, integrating next-zodenv with Next.js is a piece of cake (it can be used with other environments, though).

Here are the basic ideas of next-zodenv:

* 💎 Express environment variables declaratively using Zod
* ✅ Validate that the specified environment variables are not missing
* 🪄 Transform environment variables to the type your application expects
* 🌀 Make sure environment variables are fully typed
* 🤝 Work on Node.js and the browser

## Setup

```sh
npm install next-zodenv
```

## Usage

```ts
const env = zenv(z.object({
  FOO: z.string(),
  PORT: z.preprocess(Number, z.number().int().gte(1).lte(65535)),
  API_URL: z.string().url(),
}))

env.FOO     // string
env.PORT    // number (1-65535)
env.API_URL // string (URL)
```

Note that types other than string must be transformed with `z.preprocess` beforehand. This is because environment variables are always string and we need to transform them to the type Zod's schema expects.

## Next.js

In order to expose environment variables to the browser in Next.js, you need to pass the `nextPublic` option to `zenv` like this:

```ts
const env = zenv(
  z.object({
    NEXT_PUBLIC_VAR: z.string(),
  }),
  {
    nextPublic: {
      NEXT_PUBLIC_VAR: process.env.NEXT_PUBLIC_VAR,
    }
  },
)

env.NEXT_PUBLIC_VAR // available in the browser
```
