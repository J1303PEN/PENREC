$ErrorActionPreference = "Stop"
Write-Host "PENREC11 installer"
Write-Host "=================="
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js 20.9 or later is required."
}
npm install
if (-not (Test-Path ".env.local")) {
  Copy-Item ".env.example" ".env.local"
  Write-Host "Created .env.local. Add your Supabase URL and anon key."
}
npm run build
Write-Host "PENREC11 is installed. Run: npm run dev"
