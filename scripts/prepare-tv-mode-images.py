from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS = ROOT / "docs" / "screenshots"
REQUIRED = (
    "tv-mode-live-tv-epg-v3.jpg",
    "tv-mode-movies-v2.jpg",
    "tv-mode-series-v2.jpg",
)

for name in REQUIRED:
    path = SCREENSHOTS / name
    if not path.exists():
        raise RuntimeError(f"Missing TV Mode screenshot: {path}")

    data = path.read_bytes()
    if not data.startswith(b"\xff\xd8\xff"):
        raise RuntimeError(f"TV Mode screenshot is not a JPEG: {path}")

    print(f"Verified {path.name}: {len(data)} bytes")
