# OG Meta Tag Automation Script

This guide provides a Python script to automatically inject "smart" Open Graph (OG) meta tags into your static HTML files.

It uses a prioritized logic to find the best description and image for each page, ensuring specific content is highlighted while generic pages fallback to brand defaults.

## Logic Overview

The script determines `og:description` in this order:
1.  **Manual Override**: Checks `DESCRIPTION_OVERRIDES` for specific pages (e.g., `index.html`).
2.  **Service Intro**: Looks for `<p class="service-intro">` (ideal for service detail pages).
3.  **Meta Description**: Looks for existing `<meta name="description">`.
4.  **First Paragraph**: Falls back to the first content paragraph (e.g., `.content-right__desc`).
5.  **Cleanups**: Auto-removes extra whitespace and newlines.

## Usage

1.  a `update_og_tags.py` file in your project root.
2.  Install dependencies: `pip install beautifulsoup4`
3.  Run: `python3 update_og_tags.py`

## Script Template (`update_og_tags.py`)

```python
import os
import re
from bs4 import BeautifulSoup

# --- Configuration ---
PROJECT_ROOT = '.'  # Current directory
DEFAULT_OG_IMAGE = './assets/images/og-image.jpg' # Fallback image
BASE_URL = 'https://yourwebsite.com' # Replace with your domain

# Specific descriptions for generic pages
DESCRIPTION_OVERRIDES = {
    'index.html': "Your Brand - Main Tagline and Slogan here.",
    'contact.html': "Contact us for more information.",
    # Add more specific pages here
}

# Specific images for generic pages
OG_IMAGE_OVERRIDES = {
    'index.html': './assets/images/og-image.jpg',
    # 'about.html': './assets/images/about-banner.jpg',
}

def get_html_files(root_dir):
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        if '.git' in root or '.venv' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def set_meta_tag(soup, property_name, content):
    if not content: return
    tag = soup.find('meta', property=property_name)
    if tag:
        tag['content'] = content
    else:
        new_tag = soup.new_tag('meta', property=property_name, content=content)
        if soup.head:
            soup.head.append(new_tag)
            soup.head.append(soup.new_string('\n'))

def determine_og_image(filename, soup):
    # 1. Override
    if filename in OG_IMAGE_OVERRIDES:
        return OG_IMAGE_OVERRIDES[filename]
        
    # 2. Smart Detection (e.g., service-specific images)
    # Example: if filename is 'service-name.html', look for 'service-name-1.jpg'
    # Adjust this logic based on your asset naming convention
    if filename.startswith('dich-vu-'):
        slug = filename.replace('dich-vu-', '').replace('.html', '')
        candidate = f"./assets/images/services/{slug}/{slug}-1.jpg"
        if os.path.exists(candidate):
            return candidate

    # 3. First Content Image
    # Adjust class name to match your template's main image class
    img = soup.find('img', class_='content-right__img')
    if img and img.get('src'):
        return img['src']
        
    # 4. Fallback
    return DEFAULT_OG_IMAGE

def process_file(file_path):
    filename = os.path.basename(file_path)
    print(f"Processing: {filename}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    soup = BeautifulSoup(content, 'html.parser')
    if not soup.head: return

    # --- Title Extraction ---
    title = None
    if soup.title: title = soup.title.string.strip()
    if not title:
        h1 = soup.find('h1')
        if h1: title = h1.get_text().strip()
    
    # Normalize Title
    if title: title = " ".join(title.split())

    # --- Description Extraction (The Smart Part) ---
    description = None
    
    # 1. Manual Override
    if filename in DESCRIPTION_OVERRIDES:
        description = DESCRIPTION_OVERRIDES[filename]
        
    # 2. Priority Class (e.g. .service-intro)
    if not description:
        p_intro = soup.find('p', class_='service-intro')
        if p_intro:
            description = p_intro.get_text().strip()
            
    # 3. Meta Description
    if not description:
        meta = soup.find('meta', attrs={'name': 'description'})
        if meta: description = meta.get('content')
        
    # 4. Fallback Paragraph
    if not description:
        # Find first paragraph inside main content area
        # Adjust selector '.content-right__desc' to your layout
        p = soup.find('p', class_='content-right__desc') 
        if p: description = p.get_text().strip()
        
    # Validation & Cleanup
    if not description: description = "Default description if nothing found."
    if len(description) > 200: description = description[:197] + "..."
    description = " ".join(description.split()) # Remove newlines/extra spaces

    # --- Apply Tags ---
    image = determine_og_image(filename, soup)
    url = f"{BASE_URL}/{filename}" if filename != 'index.html' else BASE_URL + "/"
    
    set_meta_tag(soup, 'og:title', title)
    set_meta_tag(soup, 'og:description', description)
    set_meta_tag(soup, 'og:image', image)
    set_meta_tag(soup, 'og:url', url)
    set_meta_tag(soup, 'og:type', 'website')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    files = get_html_files(PROJECT_ROOT)
    for file in files:
        process_file(file)
```
