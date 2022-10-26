// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { serverEnv } from '../../env/serverEnv'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(serverEnv)
}
