import os
import re
from bs4 import BeautifulSoup

PROJECT_ROOT = '/Users/vu/project/tyd-html'
DEFAULT_OG_IMAGE = './assets/images/og-image.jpg'
BASE_URL = 'https://tamydung.com'

# Explicit mapping if auto-detection fails or isn't preferred
OG_IMAGE_OVERRIDES = {
    'index.html': './assets/images/og-image.jpg',
    'lien-he.html': './assets/images/og-image.jpg',
    'hoat-dong.html': './assets/images/og-image.jpg',
    'blog.html': './assets/images/og-image.jpg',
}

DESCRIPTION_OVERRIDES = {
    'index.html': "Tâm Y Dung là giải pháp, là trung tâm chăm sóc sức khoẻ và sắc đẹp dựa trên nền tảng của y học và tâm thức. Chăm sóc cho con người Tâm, Trí, Thân, Nhan.",
    'lien-he.html': "Liên hệ với Tâm Y Dung để được tư vấn và chăm sóc sức khỏe, sắc đẹp toàn diện.",
    'hoat-dong.html': "Các hoạt động nổi bật của Tâm Y Dung.",
    'blog.html': "Chia sẻ kiến thức về sức khỏe và sắc đẹp từ Tâm Y Dung.",
}

def get_html_files(root_dir):
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        if '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def get_meta_content(soup, property_name):
    tag = soup.find('meta', property=property_name)
    return tag['content'] if tag else None

def set_meta_tag(soup, property_name, content):
    if not content:
        return
        
    tag = soup.find('meta', property=property_name)
    if tag:
        tag['content'] = content
    else:
        # Create new tag
        new_tag = soup.new_tag('meta')
        new_tag['property'] = property_name
        new_tag['content'] = content
        
        # Insert before </head>
        head = soup.head
        if head:
            head.append(new_tag)
            # Add newline for prettiness
            head.append(soup.new_string('\n'))

def determine_og_image(filename, soup, rel_path):
    # 1. Check override
    if filename in OG_IMAGE_OVERRIDES:
        return OG_IMAGE_OVERRIDES[filename]
        
    # 2. If service page (dich-vu-xyz.html), try to find assets/images/services/xyz/xyz-1.jpg
    if filename.startswith('dich-vu-'):
        service_slug = filename.replace('dich-vu-', '').replace('.html', '')
        
        # Check for [slug]-1.jpg
        # Path on disk
        candidate_1 = f"assets/images/services/{service_slug}/{service_slug}-1.jpg"
        if os.path.exists(os.path.join(PROJECT_ROOT, candidate_1)):
            return f"./{candidate_1}"
            
        # Check for [slug].jpg (rare but possible?)
    
    # 3. Find first content image in the HTML
    # Look for content-right__img class which seems common in this template
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
    
    if not soup.head:
        print(f"Skipping {filename}: No <head> tag")
        return

    # --- Title ---
    # Try <title>, then <h1>, then filename
    title = None
    if soup.title and soup.title.string:
        title = soup.title.string.strip()
    
    if not title:
        h1 = soup.find('h1')
        if h1:
            title = h1.get_text().strip()
            
    if not title:
        title = "Tâm Y Dung"
    else:
        # append brand if not present (simple check)
        if "Tâm Y Dung" not in title:
            title = f"{title} - Tâm Y Dung"

    # --- Description ---
    description = None
    
    # 0. Override
    if filename in DESCRIPTION_OVERRIDES:
        description = DESCRIPTION_OVERRIDES[filename]
    
    # 1. Priority: service-intro class (Service Pages)
    if not description:
        p_intro = soup.find('p', class_='service-intro')
        if p_intro:
            description = p_intro.get_text().strip()

    # 2. Meta description
    if not description:
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            description = meta_desc['content']
    
    # 3. Content right desc (Service Details)
    
    # If no meta desc, find first paragraph in content
    if not description:
        # Common content containers? 
        # .introduce-title, .content-right__desc, etc.
        # Just grabbing first P generally might get nav stuff.
        # Let's try .content-right__desc for service pages
        p = soup.find('p', class_='content-right__desc')
        if p:
            description = p.get_text().strip()
            
    if not description:
        # Fallback to any p
        paragraphs = soup.find_all('p')
        for p in paragraphs:
            text = p.get_text().strip()
            if len(text) > 20: # skip empty logic
                description = text
                break
                
    if not description:
        description = "Chăm sóc sức khỏe & sắc đẹp - Tâm Y Dung"
        
    # Truncate description
    if len(description) > 200:
        description = description[:197] + "..."
        
    # Clean up whitespace (newlines, extra spaces)
    description = " ".join(description.split())
    if title:
        title = " ".join(title.split())

    # --- Image ---
    image = determine_og_image(filename, soup, file_path)
    
    # --- URL ---
    url = f"{BASE_URL}/{filename}"
    if filename == 'index.html':
        url = BASE_URL + "/"

    # --- Set Tags ---
    set_meta_tag(soup, 'og:title', title)
    set_meta_tag(soup, 'og:description', description)
    set_meta_tag(soup, 'og:image', image)
    set_meta_tag(soup, 'og:url', url)
    set_meta_tag(soup, 'og:type', 'website')
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main():
    files = get_html_files(PROJECT_ROOT)
    for file in files:
        # Rely on ignorecase fix or simple logic
        if 'og-image-tyd.html' in file:
            continue 
        process_file(file)

if __name__ == "__main__":
    main()
