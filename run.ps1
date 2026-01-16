Write-Host "Starting backend and frontend..."

# Backend
Start-Process powershell `
  -ArgumentList "-NoExit", "cd backend; go mod tidy; go run ." `
  -WindowStyle Normal

# Frontend
$packageManager = if (Get-Command yarn -ErrorAction SilentlyContinue) { "yarn" } else { "npm" }
Start-Process powershell `
  -ArgumentList "-NoExit", "cd frontend; $packageManager install; $packageManager run dev" `
  -WindowStyle Normal

Write-Host "Both servers started."
Write-Host "Press Ctrl+C to stop them."