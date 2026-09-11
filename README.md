# Alphatech Automated QA Portal • Minne SIT & E2E Test Suite

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://vercel.com)
[![Test Suites](https://img.shields.io/badge/Test%20Suites-4%2F4%20PASSED-success)](index.html)
[![Pass Rate](https://img.shields.io/badge/Pass%20Rate-100%25-brightgreen)](index.html)
[![Release Version](https://img.shields.io/badge/Release-v0.4.0%20Omnichannel-blue)](BAO-CAO-KIEM-THU-OMNICHANNEL-VA-AI-CHATBOT.html)

Kho lưu trữ và cổng hiển thị trực tuyến toàn bộ hồ sơ kiểm thử hệ thống (SIT), kịch bản nghiệm thu toàn trình (E2E), cẩm nang vận hành thực chiến và bằng chứng ảnh chụp màn hình phân giải cao của giải pháp **Minne AI Hub & Odoo 19 ERP Integration**.

---

## 🌐 Danh Mục Báo Cáo & Kịch Bản Nghiệm Thu Trực Tuyến

Khi triển khai lên Vercel, toàn bộ các báo cáo dưới đây có thể xem trực tiếp qua trình duyệt:

| STT | Phân Hệ / Tài Liệu | File Truy Cập Trực Tiếp | Kết Quả / Trạng Thái | Mô Tả Tóm Tắt |
|:---:|:---|:---|:---:|:---|
| 🏠 | **Cổng QA Hub Tập Trung** | [`index.html`](index.html) | **4/4 Suites (100%)** | Dashboard trung tâm liên kết toàn bộ 4 phân hệ và các sổ tay vận hành |
| ⚡ | **Omnichannel Ingestion & AI Chatbot (v0.4.0)** | [`BAO-CAO-KIEM-THU-OMNICHANNEL-VA-AI-CHATBOT.html`](BAO-CAO-KIEM-THU-OMNICHANNEL-VA-AI-CHATBOT.html) | **16/16 Passed (100%)** | Chatbot Widget <20KB, Meta FB/Lead Ads, Chống trùng Customer 360, Handoff & Unified Inbox UI |
| 🔄 | **Odoo 19 ↔ Minne AI Hub E2E Integration** | [`odoo_minne_e2e_report.html`](odoo_minne_e2e_report.html) | **9/9 Passed (100%)** | Kiểm thử 2 chiều: Webhook async, Callback Chatter, Sales Copilot, RAG Tri thức |
| 🛍️ | **Odoo Storefront & SalesKit** | [`saleskit_test_report.html`](saleskit_test_report.html) | **7/7 Passed (100%)** | Kiểm thử độc lập Storefront: CRM, Giỏ hàng VAT 15%, Tra cứu bảo hành điện tử |
| 🧠 | **Minne AI Hub Nghiệm Thu Tính Năng v0.3.3** | [`BAO-CAO-KIEM-THU-NGHIEM-THU-MINNE-V0.3.3.html`](BAO-CAO-KIEM-THU-NGHIEM-THU-MINNE-V0.3.3.html) | **11/11 Passed (100%)** | Phân quyền 3 cấp, Excel SĐT VN, SLA Board, Knowledge Graph 60FPS, Multi-Tenant SaaS |
| 📖 | **Sổ Tay Vận Hành Bán Hàng 10 Ca Thực Chiến** | [`SO-TAY-VAN-HANH-THUC-CHIEN-ODOO-MINNE.html`](SO-TAY-VAN-HANH-THUC-CHIEN-ODOO-MINNE.html) | **10/10 Ca Sẵn Sàng** | Mô phỏng 1 ngày bán hàng thật: Từ Marketing nạp Catalogue đến Khách tra cứu bảo hành 24 tháng |
| 📈 | **Kế Hoạch Kinh Doanh & Go-To-Market (GTM)** | [`KE-HOACH-KINH-DOANH-VA-GTM-ODOO-MINNE.html`](KE-HOACH-KINH-DOANH-VA-GTM-ODOO-MINNE.html) | **Chiến Lược** | Định vị sản phẩm, ma trận gói giá Starter/Pro/Enterprise, dự phóng tài chính 12 tháng |
| 🗺️ | **Kế Hoạch Nâng Cấp Omnichannel & Chatbot** | [`KE-HOACH-NANG-CAP-OMNICHANNEL-VA-AI-CHATBOT.html`](KE-HOACH-NANG-CAP-OMNICHANNEL-VA-AI-CHATBOT.html) | **Đã Triển Khai** | WBS 4 Sprint chi tiết, sơ đồ phân luồng Gateway và ma trận năng lực kỹ thuật |
| 📋 | **Bộ Kịch Bản Chi Tiết Use Cases v0.3.3** | [`BO-USE-CASE-TEST-MINNE-V0.3.3.html`](BO-USE-CASE-TEST-MINNE-V0.3.3.html) | **11 Use Cases** | Đặc tả từng ca kiểm thử, dữ liệu đầu vào và tiêu chí pass/fail |
| 🤖 | **Demo Storefront Nhúng AI Chatbot Widget** | [`static/widget_demo.html`](static/widget_demo.html) | **Live Demo** | Môi trường thử nghiệm trực tiếp bóng chat nổi và form bắt lead inline |

---

## 📂 Cấu Trúc Thư Mục Kho Lưu Trữ

```text
Minne_SIT-test/
├── index.html                                        # Trang chủ QA Portal (Master QA Hub)
├── BAO-CAO-KIEM-THU-OMNICHANNEL-VA-AI-CHATBOT.html   # Báo cáo SIT Omnichannel & Chatbot (v0.4.0)
├── odoo_minne_e2e_report.html                        # Báo cáo E2E 2 chiều Odoo 19 ↔ Minne
├── saleskit_test_report.html                         # Báo cáo SalesKit & Storefront Odoo
├── BAO-CAO-KIEM-THU-NGHIEM-THU-MINNE-V0.3.3.html     # Báo cáo nghiệm thu chức năng v0.3.3
├── SO-TAY-VAN-HANH-THUC-CHIEN-ODOO-MINNE.html        # Sổ tay tự test 10 ca thực tế
├── KE-HOACH-KINH-DOANH-VA-GTM-ODOO-MINNE.html        # Kế hoạch thương mại hóa & GTM
├── KE-HOACH-NANG-CAP-OMNICHANNEL-VA-AI-CHATBOT.html  # Kế hoạch 4 Sprint kỹ thuật
├── BO-USE-CASE-TEST-MINNE-V0.3.3.html                # Đặc tả 11 Use Cases kỹ thuật
├── odoo_minne_e2e_usecases.md                        # Đặc tả luồng 2 chiều Odoo-Minne
├── test_execution_summary.json                       # Tóm tắt kết quả kiểm thử JSON
├── vercel.json                                       # Cấu hình định tuyến & CORS trên Vercel
├── README.md                                         # Tài liệu hướng dẫn
├── static/                                           # Thư mục chứa widget & storefront demo
│   ├── widget.js                                     # Widget JS đóng gói siêu nhẹ (<20KB)
│   ├── widget.css                                    # Widget CSS phong cách hiện đại
│   └── widget_demo.html                              # Trang demo nhúng widget
├── 01_minne_hub_v0.3.3/screenshots/                  # 36 ảnh bằng chứng Minne Hub v0.3.3
├── 02_odoo_saleskit/screenshots/                     # 12 ảnh bằng chứng Odoo SalesKit
├── 03_odoo_minne_e2e/screenshots/                    # 9 ảnh bằng chứng Odoo ↔ Minne E2E
├── 04_omnichannel_chatbot/screenshots/               # 5 ảnh bằng chứng Omnichannel & Chatbot E2E
└── screenshots/                                      # Kho ảnh bằng chứng tổng hợp
```

---

## 🚀 Hướng Dẫn Triển Khai Lên Vercel (1-Click Deploy)

1. Đăng nhập [Vercel Dashboard](https://vercel.com).
2. Bấm **Add New...** &rarr; chọn **Project**.
3. Kết nối với GitHub và chọn repository: `AlexT182/Minne_SIT-test`.
4. Thiết lập cấu hình:
   - **Framework Preset**: Chọn `Other`
   - **Root Directory**: Để mặc định `./`
   - **Build and Output Settings**: Giữ trống (Static HTML)
5. Bấm **Deploy**. Trong vòng ~15 giây, website báo cáo nghiệm thu sẽ sẵn sàng trực tuyến tại tên miền miễn phí của Vercel (ví dụ: `https://minne-sit-test.vercel.app`)!

---

## 🔗 Liên Kết Hệ Thống Sản Xuất Đang Hoạt Động (Live Staging)

- **Minne AI Sales Hub**: [`https://minne.alphatech.ai.vn`](https://minne.alphatech.ai.vn)
- **Odoo Storefront & CRM**: [`https://saletemplate.alphatech.ai.vn`](https://saletemplate.alphatech.ai.vn)
- **Cổng Tra Cứu Bảo Hành 24 Tháng**: [`https://saletemplate.alphatech.ai.vn/tra-cuu`](https://saletemplate.alphatech.ai.vn/tra-cuu)
