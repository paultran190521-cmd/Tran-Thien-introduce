# Hướng dẫn kết nối Form với Google Sheets

Để form trên website tự động lưu dữ liệu khách hàng vào Google Sheets, bạn cần thiết lập Google Apps Script (GAS) như sau:

## Bước 1: Tạo Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com) và tạo một bảng tính mới.
2. Đặt tên các cột ở hàng đầu tiên (Hàng 1) lần lượt là:
   - Cột A: `Thời gian`
   - Cột B: `Họ và tên`
   - Cột C: `Email`
   - Cột D: `Số điện thoại`
   - Cột E: `Dịch vụ`
   - Cột F: `Lời nhắn`

## Bước 2: Thêm Apps Script
1. Trên thanh menu của Google Sheets, chọn **Tiện ích mở rộng (Extensions)** > **Apps Script**.
2. Xóa đoạn code mặc định và dán đoạn code sau vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Lấy dữ liệu từ form (FormData)
    var name = e.parameter.name || "";
    var email = e.parameter.email || "";
    var phone = e.parameter.phone || "";
    var service = e.parameter.service || "";
    var message = e.parameter.message || "";
    var timestamp = new Date();

    // Thêm một hàng mới vào Sheet
    sheet.appendRow([timestamp, name, email, phone, service, message]);

    // Trả về phản hồi thành công
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Bước 3: Triển khai (Deploy)
1. Nhấn nút **Triển khai (Deploy)** màu xanh ở góc trên bên phải > Chọn **Triển khai mới (New deployment)**.
2. Nhấn vào biểu tượng bánh răng cạnh dòng "Chọn loại" (Select type) > Chọn **Ứng dụng web (Web app)**.
3. Cấu hình như sau:
   - Mô tả: `Form Website`
   - Chạy dưới dạng (Execute as): **Tôi (Me)**
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai (Anyone)**
4. Nhấn **Triển khai (Deploy)**.
5. Google sẽ yêu cầu cấp quyền (Authorize access). Bạn hãy đăng nhập tài khoản Google, chọn **Nâng cao (Advanced)** > **Đi tới dự án (Go to project)** và cho phép.
6. Sau khi hoàn tất, bạn sẽ nhận được một **URL Ứng dụng web (Web app URL)**. Hãy copy URL này.

## Bước 4: Cập nhật vào Website
1. Mở file `.env.example` (hoặc tạo file `.env` nếu chạy ở máy cá nhân) trong mã nguồn website.
2. Thêm dòng sau và dán URL bạn vừa copy vào:
```env
VITE_GAS_URL="DÁN_URL_CỦA_BẠN_VÀO_ĐÂY"
```
3. Lưu lại và khởi động lại server. Form của bạn đã sẵn sàng lưu dữ liệu vào Google Sheets!
