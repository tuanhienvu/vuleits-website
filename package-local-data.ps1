$ErrorActionPreference = "Stop"

$Root = $PSScriptRoot
$PackageDir = Join-Path $Root "deploy\package"
$PublicDir = Join-Path $PackageDir "public"
$FrontendPublic = Join-Path $Root "frontend\public"
$BackendPublic = Join-Path $Root "backend\public"
$SnapshotFile = Join-Path $Root "prisma\seed.db.snapshot.json"
$SqlOut = Join-Path $PackageDir "db.sql"

New-Item -ItemType Directory -Force -Path $PackageDir | Out-Null
New-Item -ItemType Directory -Force -Path $PublicDir | Out-Null

if (Test-Path $FrontendPublic) {
  robocopy $FrontendPublic (Join-Path $PublicDir "frontend") /E /NFL /NDL /NJH /NJS /NP | Out-Null
}
if (Test-Path $BackendPublic) {
  robocopy $BackendPublic (Join-Path $PublicDir "backend") /E /NFL /NDL /NJH /NJS /NP | Out-Null
}
if (Test-Path $SnapshotFile) {
  Copy-Item $SnapshotFile (Join-Path $PackageDir "seed.db.snapshot.json") -Force
}

Write-Host "Exporting MySQL data from container mysql_db ..."
docker exec mysql_db sh -lc 'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --single-transaction --routines --triggers --events vuleits_db' | Out-File -Encoding utf8 $SqlOut
if ($LASTEXITCODE -ne 0 -or -not (Test-Path $SqlOut) -or ((Get-Item $SqlOut).Length -eq 0)) {
  throw "Database dump failed. Ensure Docker daemon is running and mysql_db container is healthy."
}

Write-Host "Package created at: $PackageDir"
Write-Host "Contains: db.sql, seed.db.snapshot.json, public/frontend, public/backend"
