from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS = ROOT / "docs" / "screenshots"
PARTS = (
    ROOT / "scripts" / "tv-live-part1.txt",
    ROOT / "scripts" / "tv-live-part2.txt",
)
OUTPUT = SCREENSHOTS / "tv-mode-live-tv-epg.webp"

encoded = "".join(part.read_text(encoding="utf-8").strip() for part in PARTS)
data = base64.b64decode(encoded, validate=True)

if not (data.startswith(b"RIFF") and data[8:12] == b"WEBP"):
    raise RuntimeError("Reconstructed TV Mode Live image is not a valid WebP container")

OUTPUT.write_bytes(data)
print(f"Repaired {OUTPUT.name}: {len(data)} bytes")
