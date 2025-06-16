const { PrismaClient } = require('@prisma/client')

console.log('Testing Prisma Client initialization...')

try {
  const prisma = new PrismaClient()
  console.log('✅ Prisma Client initialized successfully')
  console.log('Database URL configured:', !!process.env.DATABASE_URL)
  console.log('Prisma Client version:', require('@prisma/client/package.json').version)
  
  // Test connection
  prisma.$connect().then(() => {
    console.log('✅ Database connection successful')
    prisma.$disconnect()
  }).catch((error) => {
    console.log('❌ Database connection failed:', error.message)
    console.log('This is expected in build environment without DATABASE_URL')
  })
  
} catch (error) {
  console.error('❌ Prisma Client initialization failed:', error.message)
  process.exit(1)
}
