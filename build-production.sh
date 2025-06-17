#!/bin/bash
# Script de build robusto para produção

echo "🚀 Iniciando build de produção..."

# Função para log com timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Função para verificar se o Prisma Client existe
check_prisma_client() {
    if [ -d "node_modules/.prisma/client" ] || [ -d "node_modules/@prisma/client" ]; then
        log "✅ Prisma Client encontrado"
        return 0
    else
        log "❌ Prisma Client não encontrado"
        return 1
    fi
}

# Função para gerar Prisma Client com retry
generate_prisma_with_retry() {
    local max_attempts=3
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log "🔄 Tentativa $attempt/$max_attempts: Gerando Prisma Client..."
        
        if npx prisma generate; then
            log "✅ Prisma Client gerado com sucesso!"
            return 0
        else
            log "❌ Falha na tentativa $attempt"
            if [ $attempt -lt $max_attempts ]; then
                log "⏳ Aguardando 2 segundos antes da próxima tentativa..."
                sleep 2
            fi
            attempt=$((attempt + 1))
        fi
    done
    
    log "⚠️ Falha ao gerar Prisma Client após $max_attempts tentativas"
    return 1
}

# Verificar se já existe um Prisma Client válido
if check_prisma_client; then
    log "📦 Usando Prisma Client existente"
else
    log "🔧 Tentando gerar novo Prisma Client..."
    if ! generate_prisma_with_retry; then
        log "⚠️ Continuando sem regenerar Prisma Client..."
    fi
fi

# Build do Next.js
log "🏗️ Iniciando build do Next.js..."
if npx next build; then
    log "✅ Build do Next.js concluído com sucesso!"
else
    log "❌ Falha no build do Next.js"
    exit 1
fi

log "🎉 Build de produção concluído!"
