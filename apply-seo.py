"""Ghi file seo-export.json (tải từ admin-seo.html) vào dự án.

Cách dùng:
    python apply-seo.py seo-export.json

Script sẽ:
  1. Ghi data/seo.json        (cấu hình SEO hệ thống)
  2. Ghi data/facebook.json   (cấu hình Facebook)
  3. Cập nhật trường "seo" của từng sản phẩm / bài viết trong db.json
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, "data")


def read_json(path, default=None):
    if not os.path.exists(path):
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def write_json(path, obj):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")


def main():
    if len(sys.argv) < 2:
        print("Thiếu tên file. Ví dụ: python apply-seo.py seo-export.json")
        return 1

    src = sys.argv[1]
    if not os.path.isabs(src):
        src = os.path.join(ROOT, src)
    if not os.path.exists(src):
        print("Không tìm thấy file:", src)
        return 1

    payload = read_json(src)

    # 1 + 2: hai collection cấu hình
    for key, name in (("seo", "seo.json"), ("facebook", "facebook.json")):
        if isinstance(payload.get(key), dict) and payload[key]:
            write_json(os.path.join(DATA, name), payload[key])
            print("  ✓ data/" + name, "→", len(payload[key]), "khoá")

    # 3: seo của từng sản phẩm / bài viết trong db.json
    db_path = os.path.join(ROOT, "db.json")
    db = read_json(db_path)
    if db:
        changed = {"products": 0, "posts": 0}
        for bucket, field in (("products", "products"), ("posts", "posts")):
            incoming = payload.get(field) or []
            index = {str(x.get("id")): x.get("seo") for x in incoming if x.get("seo")}
            for item in db.get(bucket, []):
                seo = index.get(str(item.get("id")))
                if seo:
                    item["seo"] = seo
                    changed[bucket] += 1
        write_json(db_path, db)
        print("  ✓ db.json →", changed["products"], "sản phẩm,", changed["posts"], "bài viết")

    print("\nXong. Chạy lại json-server (hoặc commit + push) để website nhận cấu hình mới.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
