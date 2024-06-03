import { Pattern, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
  async findAll(): Promise<Pattern[]> {
    const patterns = await prisma.pattern.findMany()
    return patterns 
  },
  async find(id: number): Promise<Pattern> {
    const pattern = await prisma.pattern.findUnique({
      where: { id }
    })
    
    if (!pattern) throw new Error('chiant')

    return pattern
  },
  async create(newPattern: Pattern): Promise<Pattern> {
    // @ts-expect-error
    const pattern = await prisma.pattern.create({ data: newPattern })
    return pattern 
  }
}

// function create(newArtist) { ... }

// function update(id, updatedArtist) { ... }

// function remove(id) { ... }