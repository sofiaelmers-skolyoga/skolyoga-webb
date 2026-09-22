#!/bin/zsh
export PATH="$HOME/.local/node/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"
echo "================================================"
echo "  🌿 Startar Skolyogas Hemsida..."
echo "================================================"
echo ""
echo "Öppnar din webbläsare på http://localhost:3000 strax..."
(sleep 3 && open "http://localhost:3000") &
npm run dev
