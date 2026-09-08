const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.admin.upsert({
    where: { username: 'placeitadmin' },
    update: {},
    create: {
      username: 'placeitadmin',
      password: 'place5.0',
      isMain: true,
    },
  })
  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
