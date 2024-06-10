import { Pattern, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async findAll(): Promise<Pattern[]> {
    const patterns = await prisma.pattern.findMany({
      include: {
        configuration: true,
      },
    })
    return patterns 
  },
  async find(id: number): Promise<Pattern> {
    const pattern = await prisma.pattern.findUnique({
      where: { id }
    })
    
    if (!pattern) throw new Error('chiant')

    return pattern
  },
  async create(newPattern: Pattern) {
    try {
      // @ts-expect-error
      const pattern = await prisma.pattern.create({ data: newPattern })
      return pattern 
    } catch (e) {
      console.log(e)
    }
  },
  async update(id: number, updatedPattern: Pattern): Promise<Pattern> {
    const updatePattern = await prisma.pattern.update({
      where: { id },
      //@ts-expect-error
      data: updatedPattern
    })
    return updatePattern
  },
  async delete(id: number): Promise<void> {
    await prisma.pattern.delete({ where: { id }})
  }
}
