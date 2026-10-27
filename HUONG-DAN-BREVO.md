# HƯỚNG DẪN LÀM EMAIL MARKETING BẰNG BREVO

> Đề bài (mục 5): *"Email Marketing: Xem email quảng cáo sản phẩm hoặc chiến dịch có backlink về website và fanpage (ví dụ Mailchimp) gửi cho danh sách mail 10 người."*
> → Làm trên **Brevo** (thay Mailchimp). Brevo miễn phí **300 email/ngày**, không giới hạn số liên hệ, không cần thẻ.

## Bộ file đã chuẩn bị sẵn

| File | Dùng để làm gì |
|---|---|
| `email-marketing/brevo-email.html` | Nội dung email hoàn chỉnh — **dán thẳng** vào Brevo. Đã có backlink về website + fanpage, 3 sản phẩm thật, giá thật, ảnh thật |
| `email-marketing/danh-sach-10-email.csv` | Danh sách 10 email để import vào Brevo |
| `HUONG-DAN-BREVO.md` | File này |

Link trong email (đây chính là "backlink" đề bài yêu cầu):

- Website: `https://levuduy010307-star.github.io/pd12682-phone-store/`
- Trang sản phẩm: `.../sp-iphone-16-pro-max-256gb.html`, `.../sp-galaxy-s25-ultra-256gb.html`, `.../sp-xiaomi-15-ultra-512gb.html`
- Fanpage: `https://www.facebook.com/profile.php?id=61595509697092`

Tất cả link đều gắn UTM `?utm_source=brevo&utm_medium=email&utm_campaign=tuan-le-iphone` để sau này vào Google Analytics biết khách đến từ email.

---

## BƯỚC 1 — Tạo tài khoản Brevo (3 phút)

1. Vào **https://www.brevo.com** → bấm **Sign up free**.
2. Điền email **thật của bạn** (dùng Gmail cũng được), mật khẩu, họ tên.
3. Brevo gửi 1 mail kích hoạt → mở hộp thư, bấm **Activate my account**.
4. Khi Brevo hỏi "What do you want to do first?" → chọn **Send marketing emails** / **Email marketing**.
5. Bỏ qua bước điền thông tin công ty nếu nó cho phép **Skip** (điền cũng được: tên công ty `PD12682 Store`, website link GitHub Pages ở trên, ngành `Retail`).

> Lưu ý: gói Free có dòng chữ "Sent with Brevo" ở cuối mail. Không ảnh hưởng điểm, thậm chí chứng minh được là gửi bằng Brevo thật.

---

## BƯỚC 2 — Xác thực email người gửi (bắt buộc, 2 phút)

Brevo **không cho gửi** nếu email người gửi chưa xác thực.

1. Menu trái, kéo xuống dưới → **Settings** (biểu tượng bánh răng) → **Senders & IP** → tab **Senders**.
2. Bấm **Add a sender**.
3. Điền:
   - **Sender's name**: `PD12682 Store`
   - **Sender's email**: email của bạn (nên trùng email đăng ký)
4. Bấm **Add this sender** → Brevo hiện **6 ô mã số** và gửi 1 mail xác nhận.
5. Mở mail đó, lấy mã 6 số, nhập vào → trạng thái đổi thành **Verified** (dấu tích xanh).

> Nếu định gửi từ `hotro@pd12682.com` thì phải sở hữu domain đó. Chưa có domain thì cứ dùng Gmail — vẫn gửi được, chỉ là tỉ lệ vào Spam cao hơn một chút.

---

## BƯỚC 3 — Tạo danh sách 10 email và import (3 phút)

### 3.1. Tạo list

1. Menu trái → **Contacts** → **Lists**.
2. Bấm **Create a list** (hoặc **+ New list**).
3. Đặt tên: `PD12682 - Khach hang nhan tin` → **Create**.

### 3.2. Import 10 email

1. Vẫn ở **Contacts** → bấm **Import contacts** (góc phải).
2. Chọn **Upload a file** → **CSV** → kéo file `email-marketing/danh-sach-10-email.csv` vào.
3. Brevo hiện bảng map cột:
   - `EMAIL` → **Email** (tự map)
   - `FIRSTNAME` → **First name**
   - `LASTNAME` → **Last name**
   - `PHONE` → **Phone number** (nếu không có thì bỏ qua)
4. Ở bước chọn list → tích **PD12682 - Khach hang nhan tin**.
5. Bấm **Import** → chờ vài giây → báo **10 contacts imported**.

> ⚠️ File CSV trong bộ này là email mẫu. **Nên thay bằng 10 email thật** (của bạn + bạn bè, người đồng ý nhận). Gửi vào địa chỉ không tồn tại sẽ bị **hard bounce**, Brevo trừ uy tín tài khoản và có thể khoá gửi.
> Cách thay nhanh: mở file CSV bằng Notepad/Excel, sửa cột `EMAIL`, lưu lại rồi import.

Kiểm tra: **Contacts → Lists → PD12682…** phải thấy **10**.

---

## BƯỚC 4 — Tạo chiến dịch (campaign)

1. Menu trái → **Campaigns** → **Email** → bấm **Create an email campaign** (hoặc **New campaign**).
2. Màn hình **Recipients**:
   - **Campaign name**: `Tuan le Flagship - 10 khach hang`
   - **Choose recipients** → chọn list **PD12682 - Khach hang nhan tin** (hiện `10`)
   - Bấm **Next**.
3. Màn hình **Content**:
   - **Subject**: `Tuần lễ Flagship giảm đến 3 triệu — chỉ 5 ngày`
   - **Preview text** (preheader): `iPhone 16 Pro Max, Galaxy S25 Ultra, Xiaomi 15 Ultra. Trả góp 0%, giao 2h.`
   - **From**: `PD12682 Store` — `<email đã xác thực ở Bước 2>`
   - **Reply to**: để trống (mặc định = From)
4. Bấm **Design email** → cửa sổ chọn cách soạn:
   - Nếu có nút **Import HTML** / **Code your own** → chọn luôn.
   - Nếu vào trình kéo–thả: tìm nút **`</>`** hoặc menu **⋯ → Edit HTML code** ở thanh trên cùng, bấm vào, **xoá sạch nội dung mẫu**.

---

## BƯỚC 5 — Dán nội dung email

1. Mở file `email-marketing/brevo-email.html` bằng **Notepad** (chuột phải → Open with → Notepad) → `Ctrl+A` → `Ctrl+C`.
2. Quay lại ô HTML của Brevo → `Ctrl+A` → `Ctrl+V` để dán đè.
3. Bấm **Save** (hoặc **Save & Quit** / **Done**).
4. Brevo quay về màn hình soạn → bấm **Preview** để xem trước, và **Send a test email** gửi thử về Gmail của bạn.

### Kiểm tra trước khi gửi thật

- [ ] Tiêu đề hiện đúng tiếng Việt có dấu
- [ ] 3 ảnh sản phẩm hiện ra
- [ ] Bấm nút **"Xem chi tiết"** → mở đúng trang `sp-...html` trên GitHub Pages
- [ ] Bấm **"Vào website PD12682"** → mở trang chủ
- [ ] Bấm **"Thích Fanpage PD12682"** → mở đúng fanpage
- [ ] Trên điện thoại: chữ không bị tràn, nút bấm được

---

## BƯỚC 6 — Gửi

1. Bấm **Send now** (hoặc **Next** → **Send**).
2. Brevo hỏi xác nhận: gửi cho **10 người**, chọn **Send**.
3. Trạng thái campaign chuyển **Sent** (gửi xong trong ~1 phút).
4. Vào hộp thư của 10 địa chỉ đó, mở mail và **bấm vào các nút link** (quan trọng: có bấm mới có số liệu "Clicked" để chụp ảnh).

---

## BƯỚC 7 — Lấy báo cáo làm bằng chứng (phần ăn điểm)

**Campaigns → Email → bấm vào campaign vừa gửi → tab Statistics / Report**

Bạn sẽ thấy bảng:

| Chỉ số | Ý nghĩa |
|---|---|
| Sent | 10 |
| Delivered | số mail vào được hộp thư |
| Opened | số người mở (cần bật ảnh) |
| **Clicked** | **số người bấm backlink — đây là bằng chứng quan trọng nhất** |
| Bounces | mail lỗi |

Bấm tiếp **Click activity** / **Top clicked links** → Brevo liệt kê **từng link đã bị bấm**:
`sp-iphone-16-pro-max-256gb.html`, `products.html`, `facebook.com/profile.php?id=…`
→ Ảnh chụp màn hình này chứng minh **có backlink về website và fanpage**, không cần giải thích nhiều.

### 4 ảnh nên chụp nộp bài

1. **Contacts → Lists** → list có **10 contacts**.
2. **Campaign report**: Sent 10 / Delivered / Opened / Clicked.
3. **Click activity**: danh sách link website + fanpage được bấm.
4. **Mail thật trong hộp thư** (chụp trên điện thoại) — thấy tiêu đề, ảnh sản phẩm và 2 nút backlink.

---

## Lỗi thường gặp & cách sửa

| Hiện tượng | Nguyên nhân | Cách sửa |
|---|---|---|
| `You must verify your sender` | Chưa xác thực email gửi | Làm lại Bước 2, nhập đúng mã 6 số |
| Mail vào **Spam / Quảng cáo** | Gửi từ Gmail, tài khoản mới, chưa ai tương tác | Vào Spam bấm **Not spam**, reply lại 1 câu; lần sau sẽ vào Inbox |
| Ảnh không hiện | Gmail chặn ảnh của người gửi lạ | Bấm **Display images below**; hoặc gửi từ domain đã xác thực |
| Dán HTML mà Brevo báo lỗi | Còn sót thẻ của mẫu cũ | Trong ô HTML bấm `Ctrl+A` rồi `Delete` **trước khi** dán |
| `Opened = 0` dù đã mở mail | Chưa tải ảnh nên pixel không chạy | Không sao — dùng số **Clicked** để chứng minh |
| Báo `daily quota reached` | Gói Free 300 mail/ngày | Chờ sang ngày (reset 0h theo giờ Brevo) |
| Không thấy nút `</>` | Brevo đổi giao diện theo tài khoản | Chọn **Import HTML** ở bước chọn template, hoặc menu **⋯ → Edit HTML code** |

---

## Nếu giảng viên hỏi thêm (chuẩn bị sẵn)

**1. Tại sao dùng Brevo thay Mailchimp?**
Mailchimp free chỉ 500 mail/tháng và bắt buộc có domain/website xác thực ở một số tính năng; Brevo free 300 mail/**ngày** (≈9.000/tháng), không giới hạn contact, có CRM + automation miễn phí.

**2. Làm sao biết email hiệu quả?**
Ba lớp: **Delivered** (vào được hộp thư) → **Opened** (pixel ảnh) → **Clicked** (link tracking). Ngoài ra UTM trên link giúp Google Analytics ghi nhận phiên truy cập từ `utm_source=brevo`.

**3. Đây có phải spam không?**
Không, vì: (a) chỉ gửi cho người đã đăng ký/đồng ý, (b) có link **hủy nhận tin** (Brevo tự chèn khi bật *Add unsubscribe link* trong phần Settings của campaign), (c) có địa chỉ + hotline của shop trong footer.

**4. Muốn tự động hoá thì sao?**
**Automations → Create a workflow → Welcome email**: khi có người mới vào list thì tự gửi mail chào + mã giảm giá sau 1 ngày. Đây là phần nâng cao, không bắt buộc cho mục 5.

**5. Có thể gửi lại cho 10 người đó vào tuần sau không?**
Được — tạo campaign mới, chọn lại cùng list, đổi Subject. Brevo tự loại những người đã unsubscribe.

---

## Thứ tự làm gọn nhất (≈15 phút)

```
B1 tạo tài khoản  →  B2 verify sender  →  B3 tạo list + import 10 email
→  B4 tạo campaign (subject/sender/recipients)  →  B5 dán HTML
→  B6 gửi test → gửi thật  →  B7 bấm link trong hộp thư → chụp 4 ảnh báo cáo
```

Nếu sản phẩm/giá trong `db.json` thay đổi, chạy lại `python build/brevo_email.py` để sinh lại `brevo-email.html` với dữ liệu mới, rồi dán lại vào Brevo.
