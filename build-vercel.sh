#!/bin/bash
echo "Starting Vercel build process..."

# Ensure Prisma Client is generated
echo "Generating Prisma Client..."
npx prisma generate

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
