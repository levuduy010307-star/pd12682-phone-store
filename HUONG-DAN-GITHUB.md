# ĐƯA WEB LÊN GITHUB (và bật GitHub Pages)

Repo đã được tạo sẵn trong thư mục này: có `.git`, nhánh `main`, commit đầu tiên `5e5bf37`.
Bạn chỉ cần **tạo repo trên GitHub** rồi chạy 2 lệnh bên dưới.

---

## BƯỚC 1 — Tạo repo trống trên GitHub

1. Vào https://github.com/new
2. **Repository name:** `pd12682-phone-store`
3. Chọn **Public** (bắt buộc nếu muốn dùng GitHub Pages miễn phí)
4. **KHÔNG** tick "Add a README file", "Add .gitignore", "Choose a license" (để repo trống)
5. Bấm **Create repository**

---

## BƯỚC 2 — Đẩy code lên

Mở Terminal / Git Bash **tại thư mục này** và chạy (thay `TEN-GITHUB` bằng username của bạn):

```bash
git remote add origin https://github.com/TEN-GITHUB/pd12682-phone-store.git
git push -u origin main
```

Lần đầu push, GitHub sẽ hỏi đăng nhập:

- **Username:** username GitHub của bạn
- **Password:** **KHÔNG phải** mật khẩu GitHub — mà là **Personal Access Token**

### Tạo token (nếu chưa có)

1. https://github.com/settings/tokens → **Generate new token (classic)**
2. Note: `pd12682`, Expiration: 30 days
3. Tick quyền **`repo`** (toàn bộ ô con của nó)
4. **Generate token** → copy chuỗi `ghp_...` (chỉ hiện 1 lần)
5. Khi Git hỏi password → dán chuỗi đó vào

> Cách khác gọn hơn: cài **GitHub Desktop** → File → Add local repository → chọn thư mục này
> → Publish repository. Không cần token.

---

## BƯỚC 3 — Bật GitHub Pages (để có link web chạy được)

1. Vào repo → **Settings** → **Pages** (menu trái)
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` — thư mục `/ (root)` → **Save**
4. Đợi 1–2 phút, tải lại trang Pages → có link:

```
https://TEN-GITHUB.github.io/pd12682-phone-store/
```

Link này dán được vào bài nộp, Facebook, báo cáo.

---

## ĐIỀU GÌ CHẠY ĐƯỢC TRÊN PAGES, ĐIỀU GÌ KHÔNG

GitHub Pages chỉ chạy **file tĩnh** — không chạy được `json-server` (Node.js).

| Chức năng | Trên GitHub Pages | Khi chạy local có json-server |
|---|---|---|
| Xem 25 sản phẩm, lọc hãng, sắp xếp giá | ✅ Có | ✅ Có |
| Tìm kiếm | ✅ Có | ✅ Có |
| Xem chi tiết sản phẩm | ✅ Có | ✅ Có |
| Thêm vào giỏ (lưu localStorage) | ✅ Có | ✅ Có |
| Đăng nhập / Đăng ký | ❌ Không | ✅ Có |
| Đặt hàng (ghi vào db.json) | ❌ Không | ✅ Có |
| Trang quản trị thêm/sửa/xóa | ❌ Không | ✅ Có |

**Giải thích:** để trang vẫn xem được sản phẩm khi không có API, `app.js` đã có cơ chế dự phòng —
nếu gọi `http://localhost:3000` thất bại, nó đọc `data/products.json` (bản chụp tĩnh của 25 sản phẩm).
Vì vậy trang chủ trên Pages **không bị lỗi**, chỉ là không đăng nhập/đặt hàng được.

> Nếu cần bản online **đầy đủ chức năng** (đăng nhập, đặt hàng, quản trị) thì phải deploy lên nơi
> chạy được Node.js (Render, Railway, Vercel…) — nói mình biết nếu cần hướng dẫn.

---

## CẬP NHẬT SAU NÀY

Mỗi khi sửa code:

```bash
git add -A
git commit -m "mô tả thay đổi"
git push
```

Pages tự build lại sau ~1 phút.

> Nếu đã đổi sản phẩm trong `db.json` mà muốn trang Pages cập nhật theo, nhớ xuất lại file tĩnh:
> copy mảng `products` trong `db.json` sang `data/products.json`.
