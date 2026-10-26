# PD12682 — Website bán điện thoại

Website bán điện thoại di động viết bằng HTML/CSS/JavaScript thuần, dữ liệu lưu trong `db.json`
qua `json-server`. Bài tập môn WEB2053.

🔗 **Xem online: https://levuduy010307-star.github.io/pd12682-phone-store/**

---

## Chức năng

- **Trang chủ** — banner hero, 25 sản phẩm (5 hãng × 5 mẫu), lọc theo **5 danh mục**, lọc theo hãng, sắp xếp theo giá
- **Tìm kiếm** — theo tên sản phẩm
- **Chi tiết sản phẩm** — ảnh, cấu hình, giá, số lượng còn
- **Giỏ hàng** — thêm/xóa/sửa số lượng, lưu bằng `localStorage`
- **Đặt hàng** — ghi đơn vào `db.json` (cần chạy server)
- **Đăng nhập / Đăng ký** — kiểm tra email trùng, lưu vào `db.json` (cần chạy server)
- **Trang quản trị** (`admin.html`) — thêm tài khoản, thêm/sửa/xóa sản phẩm (cần chạy server)

## Công nghệ

| Thành phần | Dùng gì |
|---|---|
| Giao diện | HTML5, CSS3 thuần (không framework) |
| Logic | JavaScript ES6+, `fetch` |
| Dữ liệu | `json-server` đọc/ghi `db.json` |
| Ảnh | Ảnh thật từ Unsplash + ảnh dự phòng nội bộ `img/fallback.png` |

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
cart.html         Giỏ hàng
checkout.html     Đặt hàng
thankyou.html     Cảm ơn sau khi đặt
login.html        Đăng nhập
register.html     Đăng ký
admin.html        Quản trị
app.js            Toàn bộ logic
style.css         Toàn bộ giao diện
db.json           Dữ liệu gốc (products / users / orders)
data/products.json  Bản chụp tĩnh để chạy trên GitHub Pages
img/fallback.png  Ảnh thay thế khi ảnh lỗi
```

## Ghi chú về GitHub Pages

Pages chỉ chạy file tĩnh nên **không có** `json-server`. `app.js` tự dự phòng: gọi API thất bại
thì đọc `data/products.json`. Vì vậy trên Pages xem/lọc/tìm/giỏ hàng vẫn chạy, còn đăng nhập,
đặt hàng và trang quản trị thì không. Chi tiết: [HUONG-DAN-GITHUB.md](HUONG-DAN-GITHUB.md).
