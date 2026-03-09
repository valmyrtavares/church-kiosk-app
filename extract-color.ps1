Add-Type -AssemblyName System.Drawing

$bitmap = [System.Drawing.Bitmap]::FromFile("$PWD\src\assets\images\header.jpg")
$r = 0; $g = 0; $b = 0; $count = 0

for ($x = 0; $x -lt $bitmap.Width; $x += 10) {
    for ($y = 0; $y -lt $bitmap.Height; $y += 10) {
        $pixel = $bitmap.GetPixel($x, $y)
        $r += $pixel.R
        $g += $pixel.G
        $b += $pixel.B
        $count++
    }
}

$r = [Math]::Round($r / $count)
$g = [Math]::Round($g / $count)
$b = [Math]::Round($b / $count)

$hex = "#{0:X2}{1:X2}{2:X2}" -f $r, $g, $b
Write-Output "Average Color RGB: $r, $g, $b"
Write-Output "Average Color HEX: $hex"
$bitmap.Dispose()
