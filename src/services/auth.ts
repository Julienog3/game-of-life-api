import { PrismaClient } from "@prisma/client"
import { verifyPassword } from "../lib/hash.js"

export type Credentials = {
  email: string, 
  password: string 
}

const prisma = new PrismaClient()

export default {
  async authenticate(credentials: Credentials) {
    const { email, password } = credentials 

    const user = await prisma.user.findUniqueOrThrow({ where: { email }})
    return verifyPassword(password,user.salt, user.password)
  }
}