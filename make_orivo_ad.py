"""ORIVO 15s cinematic marketplace ad from the brand logo."""

from __future__ import annotations

import math
import random
from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
LOGO_CANDIDATES = [
    ROOT / "images" / "orivo-ad-source.png",
    ROOT / "images" / "orivo-logo.png",
]
OUT_DIR = ROOT / "ads"
OUT_MP4 = OUT_DIR / "orivo-reklama.mp4"

W, H = 1080, 1920
FPS = 30
DURATION = 15.0
N_FRAMES = int(FPS * DURATION)
BG = (7, 14, 28)


def ease_out_cubic(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


def ease_in_out(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return 3 * t * t - 2 * t * t * t


def clamp01(t: float) -> float:
    return max(0.0, min(1.0, t))


def scene_t(t: float, start: float, end: float) -> float:
    if end <= start:
        return 1.0
    return clamp01((t - start) / (end - start))


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    names = [
        "segoeuib.ttf" if bold else "segoeui.ttf",
        "arialbd.ttf" if bold else "arial.ttf",
        "calibrib.ttf" if bold else "calibri.ttf",
        "tahoma.ttf",
    ]
    windir = Path(r"C:\Windows\Fonts")
    for name in names:
        path = windir / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def find_logo() -> Path:
    for p in LOGO_CANDIDATES:
        if p.exists():
            return p
    raise FileNotFoundError("Logo not found")


def rounded_card(img: Image.Image, radius: int) -> Image.Image:
    img = img.convert("RGBA")
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width, img.height), radius=radius, fill=255)
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0))
    out.putalpha(mask)
    return out


def prep_logo(path: Path) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    # Keep the original artwork intact (user asked for an ad from this picture).
    side = min(img.width, img.height)
    left = (img.width - side) // 2
    top = (img.height - side) // 2
    return img.crop((left, top, left + side, top + side))


def make_background(rng: random.Random) -> Image.Image:
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(0, 1, W)[None, :]
    r = 7 + 10 * y + 18 * np.exp(-((x - 0.5) ** 2 + (y - 0.28) ** 2) / 0.18)
    g = 14 + 22 * y + 48 * np.exp(-((x - 0.5) ** 2 + (y - 0.28) ** 2) / 0.16)
    b = 28 + 18 * (1 - y) + 22 * np.exp(-((x - 0.5) ** 2 + (y - 0.28) ** 2) / 0.2)
    img = np.dstack([r, g, b]).clip(0, 255).astype(np.uint8)
    base = Image.fromarray(img, "RGB")
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")
    # Gold ring hint.
    cx, cy = W // 2, int(H * 0.34)
    for i, rad in enumerate((420, 360, 300)):
        a = 18 - i * 4
        draw.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), outline=(212, 175, 55, a), width=2)
    stars = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stars)
    for _ in range(90):
        sx = rng.randint(0, W - 1)
        sy = rng.randint(0, int(H * 0.55))
        s = rng.choice((1, 1, 2))
        a = rng.randint(40, 140)
        sd.ellipse((sx, sy, sx + s, sy + s), fill=(230, 220, 180, a))
    base = base.convert("RGBA")
    base.alpha_composite(overlay)
    base.alpha_composite(stars)
    return base.convert("RGB")


def gold_glow(size: int, color=(212, 175, 55), power: float = 1.0) -> Image.Image:
    g = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    cx = cy = size // 2
    for i in range(size // 2, 0, -8):
        t = i / (size / 2)
        a = int(70 * power * (1 - t) ** 2)
        d.ellipse((cx - i, cy - i, cx + i, cy + i), fill=(*color, a))
    return g.filter(ImageFilter.GaussianBlur(18))


def shine_overlay(w: int, h: int, progress: float) -> Image.Image:
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    band = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(band)
    x = int(-w * 0.4 + progress * w * 1.8)
    for i, a in enumerate((0, 40, 90, 40, 0)):
        d.polygon(
            [
                (x + i * 18, 0),
                (x + 70 + i * 18, 0),
                (x - 40 + i * 18, h),
                (x - 110 + i * 18, h),
            ],
            fill=(255, 245, 210, a),
        )
    layer = Image.alpha_composite(layer, band)
    return layer


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    font: ImageFont.ImageFont,
    fill,
    stroke_fill=None,
) -> None:
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    kw = {"font": font, "fill": fill, "anchor": "lt"}
    if stroke_fill:
        kw["stroke_width"] = 1
        kw["stroke_fill"] = stroke_fill
    draw.text((x, y), text, **kw)


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    rng = random.Random(42)
    bg = make_background(rng)
    logo = prep_logo(find_logo())
    logo_full = logo.resize((W, W), Image.Resampling.LANCZOS)
    card_size = 860
    logo_card = rounded_card(
        logo.resize((card_size, card_size), Image.Resampling.LANCZOS),
        radius=48,
    )

    font_big = load_font(54, bold=True)
    font_mid = load_font(36, bold=True)
    font_small = load_font(28)
    font_tiny = load_font(22)

    particles = [
        {
            "x": rng.uniform(0, W),
            "y": rng.uniform(0, H),
            "sp": rng.uniform(12, 46),
            "sz": rng.choice((2, 2, 3, 4)),
            "ph": rng.uniform(0, math.tau),
        }
        for _ in range(55)
    ]

    glow = gold_glow(900, power=1.15)
    writer = imageio.get_writer(
        str(OUT_MP4),
        fps=FPS,
        codec="libx264",
        quality=8,
        pixelformat="yuv420p",
        macro_block_size=1,
        ffmpeg_params=["-movflags", "+faststart"],
    )

    try:
        for i in range(N_FRAMES):
            t = i / FPS
            frame = bg.copy().convert("RGBA")
            overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            d = ImageDraw.Draw(overlay, "RGBA")

            # Intro fade from black.
            fade_in = ease_out_cubic(scene_t(t, 0.0, 1.1))
            # Particles.
            for p in particles:
                py = (p["y"] - t * p["sp"]) % H
                px = p["x"] + math.sin(t * 0.8 + p["ph"]) * 18
                a = int(90 * fade_in * (0.4 + 0.6 * abs(math.sin(t * 2 + p["ph"]))))
                s = p["sz"]
                d.ellipse((px, py, px + s, py + s), fill=(232, 201, 92, a))

            # Gold sun glow behind mark.
            glow_a = fade_in * (0.55 + 0.45 * math.sin(t * 1.4) * 0.15 + 0.45)
            g = glow.copy()
            g.putalpha(ImageEnhance.Brightness(g.split()[-1]).enhance(glow_a))
            gx = (W - g.width) // 2
            gy = int(H * 0.18) - 40
            overlay.alpha_composite(g, (gx, gy))

            # 0–3.6s: full-bleed Ken Burns of the original picture.
            # 3.6–5.2s: pull back into a rounded brand card.
            full_hold = 1.0 - ease_in_out(scene_t(t, 3.4, 5.1))
            appear = ease_out_cubic(scene_t(t, 0.12, 1.15))
            ken = 1.08 - 0.08 * ease_in_out(scene_t(t, 0.0, 5.0))
            fw, fh = int(W * ken), int(W * ken)
            full = logo_full.resize((fw, fh), Image.Resampling.LANCZOS)
            fx = (W - fw) // 2
            fy = int((H * 0.42 - fh / 2) - 20 * (1 - full_hold))
            if full_hold > 0.02:
                full_a = ImageEnhance.Brightness(full.split()[-1]).enhance(appear * full_hold)
                full_draw = full.copy()
                full_draw.putalpha(full_a)
                overlay.alpha_composite(full_draw, (fx, fy))

            card_a = ease_out_cubic(scene_t(t, 3.6, 5.2))
            pulse = 1.0 + 0.008 * math.sin(t * 1.5)
            lw, lh = int(logo_card.width * pulse), int(logo_card.height * pulse)
            logo_scaled = logo_card.resize((lw, lh), Image.Resampling.LANCZOS)
            lx = (W - lw) // 2
            ly = int(86 + (1 - card_a) * 30)
            if card_a > 0.02:
                sh = Image.new("RGBA", (lw + 60, lh + 60), (0, 0, 0, 0))
                blob = Image.new("RGBA", (lw, lh), (0, 0, 0, int(140 * card_a)))
                blob = blob.filter(ImageFilter.GaussianBlur(22))
                sh.paste(blob, (18, 28), blob)
                overlay.alpha_composite(sh, (lx - 18, ly - 16))
                logo_draw = logo_scaled.copy()
                logo_draw.putalpha(ImageEnhance.Brightness(logo_scaled.split()[-1]).enhance(card_a))
                shine_p = None
                if 5.3 <= t <= 7.2:
                    shine_p = scene_t(t, 5.3, 7.2)
                elif 11.4 <= t <= 13.4:
                    shine_p = scene_t(t, 11.4, 13.4)
                if shine_p is not None:
                    shine = shine_overlay(lw, lh, shine_p)
                    cut = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
                    logo_draw = Image.alpha_composite(
                        logo_draw,
                        Image.composite(shine, cut, logo_draw.split()[-1]),
                    )
                overlay.alpha_composite(logo_draw, (lx, ly))
                gold = (212, 175, 55, int(200 * card_a))
                d.rounded_rectangle((lx, ly, lx + lw, ly + lh), radius=48, outline=gold, width=3)

            copy_a = ease_out_cubic(scene_t(t, 5.0, 6.0))
            if copy_a > 0:
                line_w = int(260 * copy_a)
                cy = ly + lh + 28
                color = (212, 175, 55, int(210 * copy_a))
                d.rectangle((W // 2 - line_w, cy, W // 2 + line_w, cy + 3), fill=color)
                diamond = 8
                d.polygon(
                    [
                        (W // 2, cy - diamond + 1),
                        (W // 2 + diamond, cy + 1),
                        (W // 2, cy + diamond + 1),
                        (W // 2 - diamond, cy + 1),
                    ],
                    fill=(212, 175, 55, int(230 * copy_a)),
                )

            t1 = ease_out_cubic(scene_t(t, 5.6, 6.7))
            t2 = ease_out_cubic(scene_t(t, 7.0, 8.0))
            t3 = ease_out_cubic(scene_t(t, 8.4, 9.4))
            t4 = ease_out_cubic(scene_t(t, 9.8, 10.8))
            t5 = ease_out_cubic(scene_t(t, 11.2, 12.3))

            def rgba(rgb, a):
                return (*rgb, int(255 * a))

            y_copy = ly + lh + 58
            if t1 > 0:
                draw_centered_text(
                    d,
                    "ҲАМААШ БЕҲТАРИН — БАРОИ ШУМО",
                    y_copy,
                    font_mid,
                    rgba((245, 245, 248), t1),
                )
            if t2 > 0:
                draw_centered_text(
                    d,
                    "ВСЁ ЛУЧШЕЕ — ДЛЯ ВАС",
                    y_copy + 56,
                    font_small,
                    rgba((212, 175, 55), t2),
                )
            if t3 > 0:
                draw_centered_text(
                    d,
                    "Бозори рақамии Тоҷикистон",
                    y_copy + 118,
                    font_small,
                    rgba((180, 210, 175), t3),
                )
            if t4 > 0:
                draw_centered_text(
                    d,
                    "Техника  ·  Мода  ·  Хона  ·  Варзиш",
                    y_copy + 172,
                    font_tiny,
                    rgba((210, 214, 220), t4),
                )

            if t5 > 0:
                # CTA pill.
                label = "ORIVO  ·  ХАРИД КУНЕД"
                bbox = d.textbbox((0, 0), label, font=font_big)
                tw = bbox[2] - bbox[0]
                pad_x, pad_y = 46, 22
                bx0 = (W - tw) // 2 - pad_x
                by0 = y_copy + 240
                bx1 = (W + tw) // 2 + pad_x
                by1 = by0 + (bbox[3] - bbox[1]) + pad_y * 2
                pulse_cta = 1.0 + 0.03 * math.sin(t * 6)
                # Expand around center.
                cx, cy = (bx0 + bx1) / 2, (by0 + by1) / 2
                hw = (bx1 - bx0) / 2 * pulse_cta
                hh = (by1 - by0) / 2 * pulse_cta
                rect = [cx - hw, cy - hh, cx + hw, cy + hh]
                d.rounded_rectangle(rect, radius=40, fill=(18, 110, 62, int(235 * t5)))
                d.rounded_rectangle(rect, radius=40, outline=(212, 175, 55, int(220 * t5)), width=3)
                draw_centered_text(d, label, int(cy - (bbox[3] - bbox[1]) / 2 - 2), font_big, rgba((255, 255, 255), t5))

            frame.alpha_composite(overlay)
            rgb = frame.convert("RGB")
            # Global fade in/out.
            fade_out = 1.0 - ease_in_out(scene_t(t, 14.2, 15.0))
            master = fade_in * fade_out
            if master < 0.999:
                black = Image.new("RGB", (W, H), (0, 0, 0))
                rgb = Image.blend(black, rgb, master)
            writer.append_data(np.array(rgb))
            if i % 30 == 0:
                print(f"frame {i}/{N_FRAMES} ({t:.1f}s)")
    finally:
        writer.close()

    print(f"Wrote {OUT_MP4} ({OUT_MP4.stat().st_size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
