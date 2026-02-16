
import { PrismaClient } from "../generated/prisma"


const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error", "warn"],
  })
}


declare global {
  var prisma: PrismaClient | undefined
}


export const prisma =
  globalThis.prisma ?? prismaClientSingleton()


if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma
}