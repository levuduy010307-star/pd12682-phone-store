# PD12682 — Website bán điện thoại

Website bán điện thoại di động viết bằng HTML/CSS/JavaScript thuần, dữ liệu lưu trong `db.json`
qua `json-server`. Bài tập môn WEB2053.

🔗 **Xem online: https://levuduy010307-star.github.io/pd12682-phone-store/**

---

## Chức năng

- **Trang chủ** — banner hero, **sidebar danh mục 2 cấp** (nhóm → danh mục con) bên trái, 41 sản phẩm,
  lọc theo danh mục / nhóm / hãng, sắp xếp theo giá, nút "Xem thêm" (12 sản phẩm mỗi lượt),
  khối "Bài viết & tư vấn" lấy 3 bài mới nhất
- **Tìm kiếm** — theo tên sản phẩm
- **Bài viết** (`blog.html`) — lọc theo danh mục bài viết (Tư vấn / Đánh giá / Bảo hành),
  thẻ bài viết có ảnh bìa, ngày đăng, mô tả ngắn, nút "Đọc tiếp"
- **Chi tiết bài viết** (`post.html?id=...`) — nội dung dài, khối sản phẩm liên quan trong bài,
  nút chia sẻ Facebook / Zalo / copy link, 3 bài cùng chủ đề
- **Chi tiết sản phẩm** — breadcrumb, ảnh lớn có nhãn giảm giá, khối giá (giá gốc gạch + số tiền tiết kiệm),
  chọn số lượng, nút Thêm vào giỏ / Mua ngay, bảng thông số & chính sách, 4 sản phẩm cùng danh mục
- **Giỏ hàng** — thêm/xóa/sửa số lượng, lưu bằng `localStorage`
- **Đặt hàng** — ghi đơn vào `db.json` (cần chạy server)
- **Đăng nhập / Đăng ký** — kiểm tra email trùng, lưu vào `db.json` (cần chạy server)
- **Trang quản trị** (`admin.html`) — thêm tài khoản, thêm/sửa/xóa sản phẩm (cần chạy server)
- **Liên hệ & phản hồi** — footer mọi trang có hotline, email, link fanpage; nút nổi "Nhắn page" /
  "Gọi shop" ở góc phải (tự ẩn khi cuộn tới footer để không che nội dung)
- **SEO** — mỗi sản phẩm và mỗi bài viết có bộ thẻ SEO riêng (`seo.title`, `seo.description`,
  `seo.keywords`, `seo.slug`, `seo.ogImage`, `seo.noindex`). `app.js` tự sinh `<title>`,
  meta description, Open Graph, canonical và JSON-LD Organization từ `seo` + `facebook` trong `db.json`
- **Facebook** — cấu hình Page ID, Messenger, App ID, Pixel ID, domain verification trong `db.json`
  (bật Pixel bằng `enablePixel: true`)

## Công nghệ

| Thành phần | Dùng gì |
|---|---|
| Giao diện | HTML5, CSS3 thuần (không framework) |
| Logic | JavaScript ES6+, `fetch` |
| Dữ liệu | `json-server` đọc/ghi `db.json` |
| Ảnh | Ảnh thật từ Unsplash + ảnh dự phòng nội bộ `img/fallback.png` |

## Dữ liệu (`db.json`)

| Collection | Nội dung |
|---|---|
| `products` | 41 sản phẩm — mỗi sản phẩm có `category` trỏ tới tên danh mục và object `seo` riêng |
| `categories` | 10 danh mục, 2 cấp: `group` (nhóm cha) + `name` (danh mục con), `slug`, `order`, `groupOrder` |
| `posts` | 6 bài viết: `title`, `slug`, `category`, `excerpt`, `content` (HTML), `publishedAt`, `seo` |
| `seo` | Cấu hình SEO hệ thống: `siteName`, `homeTitle`, `titleTemplate`, `description`, `keywords`, `canonicalBase`, `ogImage`, `robots`, `googleAnalytics` |
| `facebook` | Cấu hình Facebook: `pageId`, `pageUrl`, `messengerUsername`, `appId`, `pixelId`, `enablePixel`, `enableShareButton` |
| `users` | Tài khoản khách hàng và quản trị |
| `orders` | Đơn hàng |

Muốn **thêm danh mục mới**: thêm một object vào `categories` trong `db.json`, đặt `group` (nhóm cha)
và `groupOrder` để xếp đúng vị trí, rồi thêm cùng object đó vào `data/categories.json` để bản online
cũng thấy. Sidebar ở trang chủ và dropdown trong trang quản trị tự đọc từ đây — **không cần sửa code**.

Cây danh mục hiện tại:

| Nhóm | Danh mục con |
|---|---|
| Điện thoại | Flagship · Cận cao cấp · Tầm trung · Phổ thông · Giá rẻ |
| Âm thanh | Tai nghe · Loa |
| Phụ kiện | Củ sạc · Dây sạc |
| Đồng hồ | Đồng hồ thông minh |

## Chạy trên máy

```bash
npm install
npm start
```

Mở http://localhost:3000

> Cần chạy **2 tiến trình**: `json-server` (API, cổng 3000) và một static server cho file HTML.
> Nếu cổng 3000 đã bị chiếm, đổi cổng trong `package.json` và trong biến `API` ở đầu `app.js`.

## Cấu trúc

```
index.html        Trang chủ
product.html      Chi tiết sản phẩm (?id=...)
blog.html         Danh sách bài viết
post.html         Chi tiết bài viết (?id=...)
cart.html         Giỏ hàng
checkout.html     Đặt hàng
thankyou.html     Cảm ơn sau khi đặt
login.html        Đăng nhập
register.html     Đăng ký
admin.html        Quản trị
app.js            Toàn bộ logic
style.css         Toàn bộ giao diện
db.json           Dữ liệu gốc (products / categories / posts / seo / facebook / users / orders)
data/*.json       Bản chụp tĩnh để chạy trên GitHub Pages
robots.txt        Cho công cụ tìm kiếm
sitemap.xml       Sơ đồ site (34 URL: trang chủ, blog, 6 bài viết, 26 sản phẩm)
img/fallback.png  Ảnh thay thế khi ảnh lỗi
BAI-DANG-FANPAGE.md    6 bài đăng fanpage
BAI-VIET-BACKLINK.md   3 bài đăng Blogger/WordPress kèm backlink
```

> Sau khi sửa `db.json`, chạy lại script xuất bản tĩnh để `data/*.json` khớp với bản online.

## Lỗi thường gặp

**Thêm sản phẩm mà không thấy lưu**

1. Kiểm tra `json-server` có đang chạy không: mở http://localhost:3000/products, phải thấy JSON.
   Nếu không thấy → chạy `npm start` (hoặc `npx json-server --watch db.json --port 3000`).
2. Nếu đang mở **bản GitHub Pages** (`levuduy010307-star.github.io/pd12682-phone-store/`) thì
   **không lưu được** — Pages chỉ chạy file tĩnh, không có server để ghi `db.json`.
   Muốn thêm/sửa sản phẩm phải chạy local.
3. Thêm bằng local xong, muốn **bản online** cũng thấy sản phẩm mới thì phải xuất lại
   `data/products.json` (chép mảng `products` từ `db.json` sang).

**Ô "URL hình ảnh"** — dán link ảnh `https://...`, hoặc để trống thì dùng `img/fallback.png`.

## Ghi chú về GitHub Pages

Pages chỉ chạy file tĩnh nên **không có** `json-server`. `app.js` tự dự phòng: gọi API thất bại
thì đọc `data/products.json`. Vì vậy trên Pages xem/lọc/tìm/giỏ hàng vẫn chạy, còn đăng nhập,
đặt hàng và trang quản trị thì không. Chi tiết: [HUONG-DAN-GITHUB.md](HUONG-DAN-GITHUB.md).
