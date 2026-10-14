Set-Location $PSScriptRoot

$python = if (Test-Path "$PSScriptRoot\.venv\Scripts\python.exe") {
    "$PSScriptRoot\.venv\Scripts\python.exe"
} else {
    "python"
}

Write-Host ""
Write-Host "  VerveStacks docs (local preview)" -ForegroundColor Cyan
Write-Host "  Open: http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "  Stop: Ctrl+C" -ForegroundColor Yellow
Write-Host ""
& $python -m mkdocs serve
