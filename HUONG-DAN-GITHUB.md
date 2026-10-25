# WEB ĐÃ ĐƯỢC ĐẨY LÊN GITHUB ✅

| | |
|---|---|
| **Repo** | https://github.com/levuduy010307-star/pd12682-phone-store |
| **Link web chạy online** | **https://levuduy010307-star.github.io/pd12682-phone-store/** |
| **Nhánh** | `main` |
| **GitHub Pages** | Đã bật — source `main` / `/ (root)` |

Link online dán được vào bài nộp, báo cáo, Facebook. Không cần làm gì thêm.

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

> Muốn bản online **đầy đủ chức năng** (đăng nhập, đặt hàng, quản trị) thì phải deploy lên nơi
> chạy được Node.js (Render, Railway, Vercel…) — nói mình biết nếu cần hướng dẫn.

---

## CẬP NHẬT SAU NÀY

Mỗi khi sửa code, mở Git Bash tại thư mục này và chạy:

```bash
git add -A
git commit -m "mô tả thay đổi"
git push
```

Pages tự build lại sau ~1 phút. Máy này đã lưu sẵn đăng nhập GitHub (Git Credential Manager)
nên `git push` sẽ **không hỏi mật khẩu** nữa.

> Nếu đã đổi sản phẩm trong `db.json` mà muốn trang Pages cập nhật theo, nhớ xuất lại file tĩnh:
> copy mảng `products` trong `db.json` sang `data/products.json`.

---

## PHÒNG KHI CẦN LÀM LẠI TỪ ĐẦU

```bash
git remote add origin https://github.com/levuduy010307-star/pd12682-phone-store.git
git push -u origin main
```

Bật Pages: repo → **Settings** → **Pages** → Source `Deploy from a branch` → Branch `main`, thư mục `/ (root)` → **Save**.

> Nếu push từ máy khác mà Git hỏi password: **không phải** mật khẩu GitHub, mà là
> **Personal Access Token** (https://github.com/settings/tokens → Generate new token (classic) → tick quyền `repo`).
