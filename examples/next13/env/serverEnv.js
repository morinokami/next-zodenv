const { zenv, str, bool, port, url } = require('next-zodenv')

const { publicEnv } = require('./publicEnv')

module.exports.serverEnv = {
  ...publicEnv,
  ...zenv({
    FOO: str(),
    IS_BAR: bool(),
    PORT: port(),
    API_URL: url(),
  }),
}
