import { zenv } from 'next-zodenv'
import { z } from 'zod'

import { publicEnv } from './publicEnv'

export const serverEnv = {
  ...publicEnv,
  ...zenv(z.object({
    FOO: z.string(),
  })),
}
