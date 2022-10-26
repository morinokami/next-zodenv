import type { NextApiRequest, NextApiResponse } from 'next'

import { serverEnv } from '../../env/serverenv'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(serverEnv)
}
