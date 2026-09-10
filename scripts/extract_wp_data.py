import xml.etree.ElementTree as ET
import json
import re
import os

XML_PATH = 'skolyoga.WordPress.2026-09-09.xml'
OUTPUT_DIR = 'src/data'

os.makedirs(OUTPUT_DIR, exist_ok=True)

tree = ET.parse(XML_PATH)
root = tree.getroot()
channel = root.find('channel')

ns = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'excerpt': 'http://purl.org/rss/1.0/modules/excerpt/',
    'dc': 'http://purl.org/dc/elements/1.1/'
}

def clean_fusion_shortcodes(text):
    if not text:
        return ''
    # Remove fusion shortcodes like [fusion_builder_container ...] ... [/fusion_builder_container]
    # But preserve inner text content
    cleaned = re.sub(r'\[\/?fusion_[^\]]*\]', '', text)
    cleaned = re.sub(r'\[\/?stillin_[^\]]*\]', '', cleaned)
    cleaned = re.sub(r'\[vc_[^\]]*\]', '', cleaned)
    return cleaned.strip()

def extract_youtube_id(url):
    if not url:
        return None
    # match embed/ID, v=ID, youtu.be/ID
    m = re.search(r'(?:embed\/|v=|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})', url)
    return m.group(1) if m else None

videos = []
pages = []
events = []

for item in channel.findall('item'):
    pt_elem = item.find('wp:post_type', ns)
    status_elem = item.find('wp:status', ns)
    
    pt = pt_elem.text if pt_elem is not None else None
    status = status_elem.text if status_elem is not None else None
    
    if status != 'publish':
        continue
        
    title = item.find('title').text or ''
    post_name = item.find('wp:post_name', ns).text if item.find('wp:post_name', ns) is not None else ''
    post_id = item.find('wp:post_id', ns).text if item.find('wp:post_id', ns) is not None else ''
    link = item.find('link').text if item.find('link') is not None else ''
    content_raw = item.find('content:encoded', ns).text or ''
    
    # Extract metadata
    meta = {}
    for pm in item.findall('wp:postmeta', ns):
        k = pm.find('wp:meta_key', ns).text
        v = pm.find('wp:meta_value', ns).text
        if k:
            meta[k] = v or ''
            
    # Extract categories and tags
    taxonomies = {}
    for cat in item.findall('category'):
        domain = cat.get('domain', 'category')
        val = cat.text
        if domain not in taxonomies:
            taxonomies[domain] = []
        if val and val not in taxonomies[domain]:
            taxonomies[domain].append(val)
            
    if pt == 'video':
        raw_video_url = meta.get('video_id', '')
        yt_id = extract_youtube_id(raw_video_url)
        play_time = meta.get('video_play_time', '')
        time_tag = taxonomies.get('play_time_tag', [meta.get('video_time_tag', '')])[0] if taxonomies.get('play_time_tag') else meta.get('video_time_tag', '')
        
        category = taxonomies.get('video_category', ['Allmänt'])[0] if taxonomies.get('video_category') else 'Allmänt'
        levels = taxonomies.get('level_tag', [])
        tweaks = taxonomies.get('tweak_tag', [])
        is_protected = meta.get('protected_video', '0') == '1'
        
        try:
            views = int(meta.get('avada_post_views_count', '0'))
        except ValueError:
            views = 0
            
        videos.append({
            'id': post_id,
            'title': title,
            'slug': post_name or f'video-{post_id}',
            'link': link,
            'description': clean_fusion_shortcodes(content_raw),
            'video_url': raw_video_url,
            'youtube_id': yt_id,
            'thumbnail_url': f'https://img.youtube.com/vi/{yt_id}/hqdefault.jpg' if yt_id else None,
            'duration_formatted': play_time,
            'duration_tag': time_tag.replace('-min', ' min') if time_tag else '3 min',
            'category': category,
            'level_tags': levels,
            'tweak_tags': tweaks,
            'is_protected': is_protected,
            'views_count': views
        })
        
    elif pt == 'page':
        pages.append({
            'id': post_id,
            'title': title,
            'slug': post_name or f'page-{post_id}',
            'link': link,
            'content_clean': clean_fusion_shortcodes(content_raw),
            'content_raw': content_raw
        })
        
    elif pt == 'event':
        events.append({
            'id': post_id,
            'title': title,
            'slug': post_name or f'event-{post_id}',
            'link': link,
            'content': clean_fusion_shortcodes(content_raw)
        })

print(f"Extracted {len(videos)} videos")
print(f"Extracted {len(pages)} pages")
print(f"Extracted {len(events)} events")

with open(os.path.join(OUTPUT_DIR, 'exercises.json'), 'w', encoding='utf-8') as f:
    json.dump(videos, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUTPUT_DIR, 'pages.json'), 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUTPUT_DIR, 'events.json'), 'w', encoding='utf-8') as f:
    json.dump(events, f, ensure_ascii=False, indent=2)

print("Saved cleanly to src/data/")
