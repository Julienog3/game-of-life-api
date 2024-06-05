import { Configuration, Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
  async findAll(): Promise<Configuration[]> {
    const configurations = await prisma.configuration.findMany()
    return configurations 
  },
  async find(id: number): Promise<Configuration> {
    const configuration = await prisma.configuration.findUnique({
      where: { id }
    })
    
    if (!configuration) throw new Error('Configuration not found')

    return configuration
  },
  async create(newConfiguration: Configuration): Promise<Configuration> {
    // const existingConfiguration = await prisma.configuration.findUnique({
    //   where: { name: newConfiguration.name }
    // })

    // if (existingConfiguration) throw new Error('Configuration already exist')

    try {
      const configuration = await prisma.configuration.create({ data: newConfiguration })
      return configuration 
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e)
        // TODO: Add errors
      }
      throw e
    }

  },
  async update(id: number, updatedConfiguration: Configuration): Promise<Configuration> {
    const updateConfiguration = await prisma.configuration.update({
      where: { id },
      data: updatedConfiguration
    })
    return updateConfiguration
  },
  async delete(id: number): Promise<void> {
    await prisma.configuration.delete({ where: { id }})
  }
}

// function update(id, updatedArtist) { ... }

// function remove(id) { ... }