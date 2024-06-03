import { User, PrismaClient } from "@prisma/client"
import crypto from 'node:crypto'

const prisma = new PrismaClient()

export default {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users 
  },
  async create(newUser: User): Promise<User> {
    const { password, ...payload } = newUser

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

    const user = await prisma.user.create({ data: {
      ...payload,
      password: hashedPassword
    }})
    return user
  }
}