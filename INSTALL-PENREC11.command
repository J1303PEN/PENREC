#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "PENREC11 rebuilt installer"
echo "=========================="

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20.9 or later is required."
  read -p "Press Return to close."
  exit 1
fi

if [ -f .env.local ]; then
  echo "Keeping your existing .env.local Supabase configuration."
else
  cp .env.example .env.local
  echo "Created .env.local. Add your Supabase Project URL and publishable key before running PENREC11."
fi

echo "Checking dependencies..."
npm install

echo "Checking TypeScript..."
npx tsc --noEmit

echo "Checking production build..."
npm run build

echo ""
echo "PENREC11 rebuilt installation completed."
echo "Run the Supabase SQL migration if you have not already done so."
echo "Then start PENREC with: npm run dev"
read -p "Press Return to close."
