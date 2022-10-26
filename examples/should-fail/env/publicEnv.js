const { zenv } = require('next-zodenv')
const { z } = require('zod')

module.exports.publicEnv = zenv(
  z.object({
    NEXT_PUBLIC_BAR: z.string(),
  }),
  {
    nextPublic: {
      NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
    }
  },
)
