# Script de build robusto para produção (PowerShell)

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] $Message"
}

function Test-PrismaClient {
    $prismaPath1 = "node_modules\.prisma\client"
    $prismaPath2 = "node_modules\@prisma\client"
    
    if ((Test-Path $prismaPath1) -or (Test-Path $prismaPath2)) {
        Write-Log "✅ Prisma Client encontrado"
        return $true
    } else {
        Write-Log "❌ Prisma Client não encontrado"
        return $false
    }
}

function Invoke-PrismaGenerateWithRetry {
    $maxAttempts = 3
    
    for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
        Write-Log "🔄 Tentativa $attempt/$maxAttempts`: Gerando Prisma Client..."
        
        try {
            npx prisma generate
            if ($LASTEXITCODE -eq 0) {
                Write-Log "✅ Prisma Client gerado com sucesso!"
                return $true
            }
        } catch {
            Write-Log "❌ Erro na tentativa $attempt`: $($_.Exception.Message)"
        }
        
        if ($attempt -lt $maxAttempts) {
            Write-Log "⏳ Aguardando 2 segundos antes da próxima tentativa..."
            Start-Sleep -Seconds 2
        }
    }
    
    Write-Log "⚠️ Falha ao gerar Prisma Client após $maxAttempts tentativas"
    return $false
}

# Início do script
Write-Log "🚀 Iniciando build de produção..."

# Verificar se já existe um Prisma Client válido
if (Test-PrismaClient) {
    Write-Log "📦 Usando Prisma Client existente"
} else {
    Write-Log "🔧 Tentando gerar novo Prisma Client..."
    if (-not (Invoke-PrismaGenerateWithRetry)) {
        Write-Log "⚠️ Continuando sem regenerar Prisma Client..."
    }
}

# Build do Next.js
Write-Log "🏗️ Iniciando build do Next.js..."
try {
    npx next build
    if ($LASTEXITCODE -eq 0) {
        Write-Log "✅ Build do Next.js concluído com sucesso!"
    } else {
        Write-Log "❌ Falha no build do Next.js (Exit Code: $LASTEXITCODE)"
        exit 1
    }
} catch {
    Write-Log "❌ Erro no build do Next.js: $($_.Exception.Message)"
    exit 1
}

Write-Log "🎉 Build de produção concluído!"
