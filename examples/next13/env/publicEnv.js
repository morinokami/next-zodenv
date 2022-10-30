const { zenv } = require('next-zodenv')
const { z } = require('zod')

module.exports.publicEnv = zenv(
  {
    NEXT_PUBLIC_VAR: z.string(),
  },
  {
    nextPublic: {
      NEXT_PUBLIC_VAR: process.env.NEXT_PUBLIC_VAR,
    }
  },
)
