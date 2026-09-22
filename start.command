#!/bin/zsh
export PATH="$HOME/.local/node/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"

echo "=================================================="
echo "  🌿 Startar Skolyogas Hemsida (Next.js)..."
echo "=================================================="
echo ""

# Frigör port 3000 om en gammal process hänger kvar
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "💡 Låt detta fönster vara öppet medan du testar hemsidan."
echo "💡 När du är klar kan du stänga detta fönster."
echo ""
echo "Öppnar webbläsaren på http://localhost:3000 strax..."
(sleep 3 && open "http://localhost:3000") &

npm run dev

