import { User, PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/hash.js"

const prisma = new PrismaClient()

export default {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users 
  },
  async find(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    
    if (!user) throw new Error('Utilisateur not found')

    return user
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
  },
  async update(id: number, updatedUser: User): Promise<User> {
    const updateUser = await prisma.user.update({
      where: { id },
      data: updatedUser
    })
    return updateUser
  },
  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id }})
  }
}