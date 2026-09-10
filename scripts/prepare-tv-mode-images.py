from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS = ROOT / "docs" / "screenshots"

IMAGES = (
    ("tv-mode-live-tv-epg.webp", "tv-mode-live-tv-epg.jpg"),
    ("tv-mode-movies.webp", "tv-mode-movies.jpg"),
    ("tv-mode-series.webp", "tv-mode-series.jpg"),
)

for source_name, output_name in IMAGES:
    source = SCREENSHOTS / source_name
    output = SCREENSHOTS / output_name
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.save(output, "JPEG", quality=92, optimize=True, progressive=True)
        print(f"Prepared {output_name}: {image.width}x{image.height}")
