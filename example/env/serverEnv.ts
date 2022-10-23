import { z } from 'zod'

import { publicEnv } from './publicEnv'

export const serverEnv = {
  ...publicEnv,
  ...zenv({
    FOO: z.string(),
  }),
}
