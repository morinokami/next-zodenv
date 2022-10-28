import { z } from 'zod'

export const str = () => z.string()
export const bool = () => z.preprocess((val) => val === 'true', z.boolean())
export const num = () => z.preprocess(Number, z.number())
export const port = () =>
  z.preprocess(Number, z.number().int().min(1).max(65535))
export const url = () => z.string().url()
export const email = () => z.string().email()
