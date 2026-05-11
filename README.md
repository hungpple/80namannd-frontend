# 80namannd-frontend

Frontend Next.js cho website kỷ niệm 80 năm Ngày truyền thống lực lượng An ninh nhân dân Việt Nam. Repository này chỉ chứa giao diện website, dữ liệu hiển thị tĩnh và UI chatbot.

Phần RAG, FAISS, DOCX, embedding và Ollama/Qwen nằm ở repository backend riêng `80namannd-chatbot-backend`. Frontend gọi backend qua REST API, mặc định thông qua proxy route `/api/chatbot-ai`.

## Yêu cầu

- Node.js 20+.
- Backend chatbot đang chạy và có HTTPS URL khi deploy production.

## Cài đặt local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Cấu hình backend API

Tạo `.env.local` từ `.env.example`:

```bash
CHATBOT_API_BASE_URL=http://localhost:8000
```

Khi deploy Vercel, đặt biến:

```bash
CHATBOT_API_BASE_URL=https://your-backend-domain.com
CHATBOT_PROXY_TIMEOUT_MS=900000
```

Browser luôn gọi `/api/chatbot-ai`; route này chỉ forward request sang backend `/api/chat` và trả response về client. Không đặt URL Ollama, FAISS hay model ở frontend.

`CHATBOT_PROXY_TIMEOUT_MS` là thời gian proxy chờ backend. Khi chạy backend local với LLM local và ưu tiên chất lượng câu trả lời, có thể đặt 600000-900000 ms tương đương 10-15 phút. Khi deploy Vercel, lưu ý giới hạn thời gian chạy của plan Vercel; nếu request LLM dài hơn giới hạn platform, cần deploy backend/proxy ở môi trường cho phép request dài hơn.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy Vercel

1. Push repository này lên GitHub.
2. Import project trong Vercel.
3. Thêm environment variable `CHATBOT_API_BASE_URL`.
4. Deploy lại project sau khi backend tunnel/domain thay đổi.

## Test chatbot UI

1. Chạy backend tại `http://localhost:8000`.
2. Frontend `.env.local` đặt `CHATBOT_API_BASE_URL=http://localhost:8000`.
3. Chạy `npm run dev`.
4. Mở `/chatbot-ai`.
5. Gửi câu hỏi và kiểm tra backend log ở terminal backend.

## Public frontend, backend local

Nếu backend chạy trên máy local và frontend deploy public:

```bash
cloudflared tunnel --url http://localhost:8000
```

hoặc:

```bash
ngrok http 8000
```

Lấy HTTPS tunnel URL, ví dụ `https://abc-123.trycloudflare.com`, rồi đặt trên Vercel:

```bash
CHATBOT_API_BASE_URL=https://abc-123.trycloudflare.com
```

Redeploy frontend và test lại `/chatbot-ai`.

## Lưu ý kiến trúc

- Repository này không chứa `lib/rag/`, `resources/`, `.rag-index/`, Python FAISS service hoặc logic gọi Ollama.
- Không expose model gốc hoặc endpoint nội bộ cho client.
- Lỗi trả về UI được làm thân thiện, không hiển thị stack trace, path local, Ollama URL, FAISS URL hoặc tên model.
