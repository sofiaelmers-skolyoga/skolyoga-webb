#!/bin/zsh
export PATH="$HOME/.local/node/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"
echo "🚀 Startar Skolyoga hemsida..."
echo "📍 Öppna http://localhost:3000 i Safari eller Chrome"
npm run dev
