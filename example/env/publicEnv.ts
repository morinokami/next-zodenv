import { zenv } from 'next-zodenv'
import { z } from 'zod'

export const publicEnv = zenv(
  z.object({
    NEXT_PUBLIC_BAR: z.string(),
  }),
  {
    nextPublic: {
      NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
    }
  },
)
