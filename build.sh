#!/bin/bash
echo "🔧 Gerando Prisma Client..."
npx prisma generate

echo "✅ Prisma Client gerado com sucesso!"
echo "🏗️ Iniciando build do Next.js..."
npx next build

echo "✅ Build concluído!"
