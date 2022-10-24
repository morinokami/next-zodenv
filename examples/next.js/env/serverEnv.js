const { zenv } = require('next-zodenv')
const { z } = require('zod')

const { publicEnv } = require('./publicEnv')

module.exports.serverEnv = {
  ...publicEnv,
  ...zenv(z.object({
    FOO: z.string(),
  })),
}
