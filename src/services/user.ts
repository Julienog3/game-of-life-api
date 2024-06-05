import { User, PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/hash.js"

const prisma = new PrismaClient()

export default {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users 
  },
  async create(newUser: User): Promise<User> {
    const { password, ...payload } = newUser
    const { hash, salt } = hashPassword(password) 

    const user = await prisma.user.create({ data: {
      ...payload,
      password: hash,
      salt
    }})
    return user
  }
}