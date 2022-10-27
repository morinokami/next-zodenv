const { zenv } = require('next-zodenv')
const { z } = require('zod')

const { publicEnv } = require('./publicEnv')

module.exports.serverEnv = {
  ...publicEnv,
  ...zenv(z.object({
    FOO: z.string(),
    PORT: z.preprocess(Number, z.number().int().gte(1).lte(65535)),
    API_URL: z.string().url(),
  })),
}
