import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('base64')
  const hash = scryptSync(password, salt, 32).toString('hex')
  return { salt, hash }
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const newHash = scryptSync(password, salt, 32).toString('hex')
  return timingSafeEqual(Buffer.from(hash), Buffer.from(newHash))
}