const { zenv, str, bool, port, url } = require('next-zodenv')
const { z } = require('zod')

const { publicEnv } = require('./publicEnv')

module.exports.serverEnv = {
  ...publicEnv,
  ...zenv(z.object({
    FOO: str(),
    IS_BAR: bool(),
    PORT: port(),
    API_URL: url(),
  })),
}
