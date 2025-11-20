#!/usr/bin/env python3
"""
Simple script to create placeholder icons for the Chrome extension.
Requires PIL/Pillow: pip install pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Error: PIL/Pillow is not installed.")
    print("Install it with: pip install pillow")
    exit(1)

# Pinterest red color
PINTEREST_RED = (230, 0, 35)

def create_icon(size, filename):
    # Create a new image with Pinterest red background
    img = Image.new('RGB', (size, size), color=PINTEREST_RED)
    draw = ImageDraw.Draw(img)

    # Draw a white "P" in the center
    try:
        # Try to use a nice font
        font_size = size // 2
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fall back to default font
        font = ImageFont.load_default()

    # Draw the letter "P"
    text = "P"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size - text_width) // 2, (size - text_height) // 2 - bbox[1])
    draw.text(position, text, fill='white', font=font)

    # Save the image
    img.save(filename)
    print(f"Created {filename}")

if __name__ == '__main__':
    create_icon(16, 'icon16.png')
    create_icon(48, 'icon48.png')
    create_icon(128, 'icon128.png')
    print("\nIcons created successfully!")
