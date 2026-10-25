PD12682 PHONE STORE — HTML/CSS/JS + db.json
CÀI ĐẶT:
1. Cài Node.js LTS: https://nodejs.org/
2. Mở thư mục pd12682 trong VS Code.
3. Terminal chạy: npm install -g json-server
4. Chạy: json-server --watch db.json --port 3000
5. Giữ Terminal mở. Mở index.html bằng extension Live Server trong VS Code.

TÀI KHOẢN DEMO:
Admin: admin@pd12682.com / admin123
Khách hàng: user@gmail.com / 123456

Có trang chủ, tìm kiếm, lọc hãng, sắp xếp giá, chi tiết sản phẩm, đăng ký/đăng nhập/đăng xuất,
giỏ hàng, thanh toán COD lưu đơn vào db.json, quản trị thêm/sửa/xóa sản phẩm, thêm/xóa tài khoản,
quản lý trạng thái đơn hàng. Dùng cho học tập; json-server không phải backend bảo mật cho website thật.
Nếu ảnh ngoài lỗi, website tự hiển thị ảnh thay thế.

QUẢN TRỊ (admin.html):
- Thêm sản phẩm: điền form bên trái → "Lưu sản phẩm" → ghi thẳng vào db.json (POST /products).
- Sửa sản phẩm: bấm "Sửa" ở danh sách → form tự điền → sửa → "Lưu sản phẩm" (PATCH /products/:id).
- Xóa sản phẩm: bấm "Xóa" (DELETE /products/:id).
- Thêm tài khoản: mục "Thêm tài khoản" → nhập họ tên, email, mật khẩu (≥6 ký tự), chọn vai trò
  (Khách hàng / Quản trị) → "Thêm tài khoản" (POST /users). Email trùng sẽ bị chặn.
- Xóa tài khoản: nút "Xóa" trong danh sách (không xóa được tài khoản Quản trị).

LƯU Ý: chỉ chạy MỘT json-server ở cổng 3000. Nếu báo EADDRINUSE nghĩa là cổng đang bị
một project khác chiếm — tắt server cũ (Ctrl+C) rồi chạy lại.
