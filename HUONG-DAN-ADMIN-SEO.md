# HƯỚNG DẪN PHẦN ADMIN — 4 mục cấu hình SEO & Facebook

Trang cần mở: **`admin-seo.html`**

- Bản online: https://levuduy010307-star.github.io/pd12682-phone-store/admin-seo.html
- Từ trang quản trị: vào `admin.html` → bấm **SEO & Facebook** trên thanh menu
- Mở thẳng từng tab bằng đường dẫn: `admin-seo.html#sp`, `#bv`, `#ht`, `#fb`

Trang có **4 tab**, đúng 4 gạch đầu dòng của đề bài:

| Đề bài | Tab trên web | Đường dẫn nhanh |
|---|---|---|
| Mở cấu hình SEO của sản phẩm | **SEO sản phẩm** | `admin-seo.html#sp` |
| Mở cấu hình SEO của bài viết | **SEO bài viết** | `admin-seo.html#bv` |
| Mở Tối ưu SEO của hệ thống | **Tối ưu SEO hệ thống** | `admin-seo.html#ht` |
| Mở cấu hình các chức năng của Facebook phần hệ thống | **Cấu hình Facebook** | `admin-seo.html#fb` |

---

## 1. Cấu hình SEO của sản phẩm — tab "SEO sản phẩm"

Bố cục 2 cột: bên trái là danh sách **41 sản phẩm**, bên phải là form cấu hình của sản phẩm đang chọn.

Mỗi sản phẩm có 6 trường:

| Trường | Ý nghĩa |
|---|---|
| Tiêu đề SEO | Thẻ `<title>`, nên ≤ 60 ký tự. Có bộ đếm đổi màu khi vượt |
| Meta description | Đoạn mô tả Google hiển thị, 120–160 ký tự |
| Từ khoá (keywords) | Các cụm từ khoá, cách nhau bằng dấu phẩy |
| Slug | Đường dẫn thân thiện, tự bỏ dấu tiếng Việt |
| Ảnh chia sẻ OG | Ảnh hiện khi dán link lên Facebook/Zalo |
| noindex | Tick để chặn Google lập chỉ mục trang đó |

Dưới form có **2 khung xem trước chạy realtime**:
- **Kết quả tìm kiếm Google** — tiêu đề xanh, đường dẫn xám, mô tả đen, đúng như Google hiển thị
- **Chia sẻ lên Facebook** — thẻ ảnh + tiêu đề + mô tả khi dán link vào bài đăng

**Thao tác để chấm điểm:**
1. Bấm một sản phẩm ở cột trái → form đổ dữ liệu, preview cập nhật
2. Sửa ô Tiêu đề → preview đổi ngay, bộ đếm nhảy theo
3. Bấm **Tạo tự động** → hệ thống sinh tiêu đề / mô tả / keywords / slug từ dữ liệu thật của sản phẩm
4. Bấm **Lưu cấu hình**

Nhãn ở cột trái cho biết mức độ tối ưu: **Đạt** (xanh) / **Cần chỉnh** (vàng) / **Thiếu** (đỏ).
Hiện tại **41/41 sản phẩm Đạt** — con số này hiện trên tab.

## 2. Cấu hình SEO của bài viết — tab "SEO bài viết"

Giao diện giống hệt tab 1 nhưng dữ liệu là **6 bài viết**. Hiện **6/6 bài Đạt**.

Khác biệt đáng chú ý: bài viết có thêm trường **Slug** để thay `post.html?id=3` bằng
`bai-viet/chon-dien-thoai-theo-ngan-sach` — đây là điểm cộng khi chấm SEO.

## 3. Tối ưu SEO của hệ thống — tab "Tối ưu SEO hệ thống"

Cấu hình dùng chung cho toàn website, chia 4 nhóm:

- **Thông tin website**: tên site, mẫu tiêu đề (`%s` = tên trang), tiêu đề trang chủ, meta description, keywords
- **Lập chỉ mục & chia sẻ**: canonical base, ảnh OG mặc định, og:locale, robots, twitter card, bật/tắt sitemap
- **Đo lường & xác minh**: Google Analytics (G-…), mã Search Console
- **Thông tin tổ chức (JSON-LD)**: tên, điện thoại, email, địa chỉ — dùng cho schema `Organization`

Cột phải có 3 khối:
- **Điểm SEO hệ thống**: thang 100, chấm theo 8 tiêu chí, mỗi tiêu chí ghi rõ được bao nhiêu điểm và đạt/chưa đạt. Hiện **100/100**
- **Tệp đang phục vụ**: `robots.txt` (OK) và `sitemap.xml` (**50 URL**)
- **Xem trước thẻ meta**: đúng những dòng `<title>`, `<meta name="description">`, `og:*`, `canonical` sẽ được nhúng

Sửa bất kỳ ô nào → điểm và bảng meta cập nhật ngay. Bấm **Lưu cấu hình** để ghi.

## 4. Cấu hình chức năng Facebook — tab "Cấu hình Facebook"

- **Fanpage**: tên page, Page ID, đường dẫn page, tên Messenger, App ID
- **Chức năng nhúng vào website** — 4 công tắc bật/tắt:
  - Bong bóng nhắn tin (nút "Nhắn page" nổi góc phải)
  - Nút chia sẻ Facebook (trang sản phẩm + cuối bài viết)
  - Khung bình luận (comment bằng tài khoản Facebook)
  - Facebook Pixel (đo lường chuyển đổi)
- **Pixel & xác minh tên miền**: Pixel ID, mã `facebook-domain-verification`, nội dung khi chia sẻ

Cột phải:
- **Thẻ meta sẽ được nhúng** — `fb:app_id`, `facebook-domain-verification`, mã `fbq('init', …)`
- **Xem trước trên website** — bong bóng / nút chia sẻ / nút bình luận mờ đi khi tắt công tắc
- **Liên kết nhanh** — fanpage, Events Manager, Debugger kiểm tra thẻ OG

Bật/tắt công tắc → khối xem trước đổi ngay. Bấm **Lưu cấu hình** để ghi.

---

## Lưu ý khi chấm: hai chế độ lưu

Góc trên bên phải có chấm trạng thái:

| Trạng thái | Nghĩa là | Lưu thế nào |
|---|---|---|
| 🟢 **Đã kết nối json-server** | Đang mở qua `json-server --port 3000` | Bấm Lưu là ghi thẳng vào `db.json`, tải lại trang thấy ngay |
| 🟡 **Bản tĩnh — lưu tạm** | Đang mở bản GitHub Pages (không có backend) | Bấm Lưu thì lưu nháp trong trình duyệt; muốn ghi thật thì **Xuất JSON** rồi chạy lệnh bên dưới |

Quy trình ghi thật khi ở bản tĩnh:

```bash
# 1. Bấm nút "Xuất JSON" trên trang → tải về seo-export.json
# 2. Đặt file vào thư mục dự án rồi chạy:
python apply-seo.py seo-export.json
# 3. Commit + push
git add db.json data/*.json && git commit -m "cap nhat cau hinh SEO" && git push
```

> Khi demo trước lớp, nếu chạy bằng `json-server` thì mọi thao tác lưu đều thật và thấy được trong `db.json`.
> Nếu chỉ mở link GitHub Pages thì nên nói rõ: "bản online là static nên phần lưu em làm qua file JSON" —
> đây là điểm trừ nhỏ nhưng trung thực, và bảng điểm SEO vẫn tính đúng vì nó đọc dữ liệu thật.

---

## Kịch bản demo 2 phút

1. Mở `admin.html` → bấm **SEO & Facebook** trên menu
2. Tab 1: chọn "iPhone 16 Pro Max 256GB" → chỉ vào preview Google + Facebook → sửa tiêu đề cho thấy preview đổi → bấm **Tạo tự động** → **Lưu**
3. Tab 2: chuyển sang, chọn 1 bài viết → chỉ vào trường Slug
4. Tab 3: chỉ vào **100/100** và 8 tiêu chí, chỉ `sitemap.xml 50 URL`
5. Tab 4: bật/tắt công tắc "Khung bình luận" → khối xem trước đổi → **Lưu**

---

## Danh sách file liên quan

| File | Vai trò |
|---|---|
| `admin-seo.html` | Giao diện 4 tab |
| `admin-seo.js` | Toàn bộ logic: tải dữ liệu, tính điểm, xem trước, lưu, xuất JSON |
| `apply-seo.py` | Ghi `seo-export.json` vào `data/seo.json`, `data/facebook.json`, `db.json` |
| `data/seo.json` | 18 khoá cấu hình SEO hệ thống |
| `data/facebook.json` | 13 khoá cấu hình Facebook |
| `style.css` | Khối CSS `/* ===== ADMIN SEO & FACEBOOK ===== */` ở cuối file |
