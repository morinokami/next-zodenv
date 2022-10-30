const { zenv } = require('next-zodenv')
const { z } = require('zod')

module.exports.publicEnv = zenv(
  {
    NEXT_PUBLIC_BAR: {
      zodType: z.string(),
      value: process.env.NEXT_PUBLIC_BAR
    },
  },
)
