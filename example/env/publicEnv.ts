import { z } from 'zod'

export const publicEnv = zenv(
  {
    BAR: z.string(),
  },
  { nextPublic: true },
)
