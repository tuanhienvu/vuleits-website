
$docPath = "C:\Users\tuanh\OneDrive\Projects\WebPortal\Docs\SRS_VULEITS_IEEE830_EN.docx"

# Check if file exists
if (-not (Test-Path $docPath)) {
    Write-Host "Document not found at: $docPath"
    Write-Host "Current directory: $(Get-Location)"
    Write-Host "Available directories:"
    Get-ChildItem "C:\Users\tuanh\OneDrive\Projects\WebPortal\"
    exit
}

Write-Host "Found document: $docPath"

try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::OpenRead($docPath)
    
    # Get document.xml
    $entry = $zip.Entries | Where-Object { $_.Name -eq 'document.xml' }
    
    if ($null -eq $entry) {
        Write-Host "document.xml not found in archive"
        $zip.Dispose()
        exit
    }
    
    $reader = New-Object System.IO.StreamReader($entry.Open())
    $xmlContent = $reader.ReadToEnd()
    $reader.Close()
    $zip.Dispose()
    
    # Parse XML and extract text
    [xml]$doc = $xmlContent
    
    # Extract all text elements - remove XML tags
    $cleaned = $xmlContent -replace '<[^>]+>', ' '
    $cleaned = $cleaned -replace '\s+', ' '
    $fullContent = $cleaned.Trim()
    Write-Host "Total content length: $($fullContent.Length) characters"
    Write-Host ""
    Write-Host "=== EXTRACTED CONTENT ==="
    Write-Host $fullContent
    
} catch {
    Write-Host "Error: $_"
}
