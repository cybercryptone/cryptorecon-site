$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backup = Join-Path $root "backup-old-design-2026-04-01"

if (-not (Test-Path $backup)) {
  throw "Backup folder not found: $backup"
}

$files = @("index.html", "styles.css", "script.js", "privacy.html")

foreach ($file in $files) {
  $source = Join-Path $backup $file
  $destination = Join-Path $root $file

  if (-not (Test-Path $source)) {
    throw "Missing backup file: $source"
  }

  Copy-Item -LiteralPath $source -Destination $destination -Force
}

Write-Host "Old design restored from $backup"
