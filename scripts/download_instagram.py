import json
import os
import urllib.request
import ssl

ctx = ssl._create_unverified_context()

os.makedirs("public/images/instagram", exist_ok=True)

with open("scratch_instagram_posts.json") as f:
    posts = json.load(f)

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

downloaded = []
for idx, p in enumerate(posts[:12], 1):
    img_url = p.get("image_url")
    if not img_url:
        continue
    dest_path = f"public/images/instagram/post_{idx}.jpg"
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = resp.read()
            with open(dest_path, "wb") as f_out:
                f_out.write(data)
            print(f"Downloaded {dest_path} ({len(data)} bytes)")
            p["local_image"] = f"/images/instagram/post_{idx}.jpg"
            downloaded.append(p)
    except Exception as e:
        print(f"Error downloading {idx}: {e}")

with open("scratch_instagram_posts.json", "w") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Finished downloading {len(downloaded)} images.")
