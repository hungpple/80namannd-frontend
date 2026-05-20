# Đặc tả thiết kế frontend: Chatbot AI tuyển sinh Khoa Marketing DUE

## 1. Mục tiêu

Xây dựng một frontend tương tự project hiện tại, nhưng chuyển chủ đề sang hệ thống **Chatbot AI tuyển sinh cho Khoa Marketing, Trường Đại học Kinh tế - Đại học Đà Nẵng (DUE)**.

Frontend cần giữ tinh thần của project mẫu:

- Sử dụng Next.js App Router, TypeScript, TailwindCSS.
- Có `Navbar` và `Footer` dùng chung toàn site.
- Trang chủ có hero slideshow toàn màn hình giống project hiện tại.
- Có khu vực giới thiệu/điều hướng đến Chatbot AI.
- Trang Chatbot AI dùng giao diện chat tương tự `components/ChatbotUI.tsx` hiện tại.
- Giao diện responsive tốt trên mobile, tablet, desktop.

Điểm khác biệt quan trọng:

- Màu chủ đạo chuyển từ đỏ sang cam thương hiệu Khoa Marketing DUE: `#ee6224`.
- Website chỉ có 3 trang chính:
  - Trang chủ: `/`
  - Giới thiệu: `/gioi-thieu`
  - Chatbot AI: `/chatbot-ai`
- Nội dung, nhãn điều hướng, metadata, footer và chatbot phải xoay quanh tuyển sinh Khoa Marketing DUE.

## 2. Công nghệ và cấu trúc đề xuất

Giữ stack giống project mẫu:

- Next.js App Router.
- React + TypeScript.
- TailwindCSS.
- `next/image`, `next/link`, `next/navigation`.
- Nếu chatbot render Markdown thì giữ `react-markdown` và `remark-gfm`.

Cấu trúc file đề xuất:

```txt
app/
  layout.tsx
  page.tsx
  gioi-thieu/
    page.tsx
  chatbot-ai/
    page.tsx
  api/
    chatbot-ai/
      route.ts
  globals.css
components/
  Navbar.tsx
  Footer.tsx
  HeroSection.tsx
  ChatbotSection.tsx
  ChatbotUI.tsx
  SectionHeader.tsx
lib/
  content.ts
public/
  images/
    logo-due.png
    logo-marketing.png
    favicon.png
    hero/
      hero-1.jpg
      hero-2.jpg
      hero-3.jpg
      hero-4.jpg
    chatbot-ui.jpg
```

Nếu chưa có logo/hình ảnh chính thức, dùng placeholder có tên file rõ ràng và để comment ngắn trong code để thay bằng asset thật.

## 3. Bộ nhận diện giao diện

### 3.1. Màu sắc

Màu chủ đạo:

- Primary orange: `#ee6224`

Màu phụ đề xuất:

- Primary dark: `#9f3512`
- Primary deeper: `#6f240d`
- Primary light: `#fff4ed`
- Primary soft: `#ffdfcf`
- Accent gold: `#f6b73c`
- Text strong: `#18181b`
- Text muted: `#52525b`
- Background warm: `#fffaf7`

Yêu cầu khi code:

- Không dùng lại các class đỏ như `bg-red-800`, `text-red-950`, `border-red-100`.
- Với màu thương hiệu `#ee6224`, ưu tiên Tailwind arbitrary value:
  - `bg-[#ee6224]`
  - `text-[#ee6224]`
  - `border-[#ee6224]`
  - `focus:ring-[#ee6224]/20`
- Có thể dùng các màu cam nhạt mặc định của Tailwind cho nền phụ, nhưng màu nhận diện chính phải là `#ee6224`.

### 3.2. Typography

Giữ tinh thần hiện tại:

- Font sans: `Be Vietnam Pro`, `Noto Sans`, `Segoe UI`, Arial.
- Font heading: `Noto Serif`, `Be Vietnam Pro`, serif.
- Heading lớn dùng font serif để tạo cảm giác trang trọng.
- Nội dung UI/chat dùng sans-serif để dễ đọc.

Trong `app/globals.css`:

- Giữ cấu hình font tương tự project mẫu.
- Cập nhật `::selection` sang nền cam nhạt, chữ cam đậm.
- Nếu đang có class nền đặc thù như `dong-son-bg`, đổi thành class mới phù hợp hơn, ví dụ `marketing-orange-bg`.

### 3.3. Phong cách thiết kế

Giao diện nên hiện đại, học thuật, thân thiện với thí sinh:

- Nền sáng, nhiều khoảng thở.
- Bo góc vừa phải, khoảng `rounded-md` hoặc `rounded-lg`.
- Shadow nhẹ.
- Header rõ ràng, không quá nhiều menu.
- Chatbot là điểm nhấn chính, tránh tạo quá nhiều section phụ.
- Không dùng palette quá đỏ, quá tối, hoặc quá nhiều gradient.
- Màu cam đóng vai trò nhận diện, không phủ toàn bộ màn hình quá nặng.

### 3.4. Dark mode và light mode toàn site

Frontend cần có chức năng chuyển đổi giữa **Light mode** và **Dark mode** cho toàn bộ UI, không chỉ riêng chatbot.

Yêu cầu:

- Thêm nút toggle theme ở `Navbar`, ưu tiên dạng icon button nhỏ gọn.
- Toggle phải hoạt động trên cả 3 trang: `/`, `/gioi-thieu`, `/chatbot-ai`.
- Trạng thái theme cần được lưu vào `localStorage`, ví dụ key `marketing-due-theme`.
- Khi người dùng chưa chọn theme, mặc định theo `prefers-color-scheme` của hệ điều hành.
- Khi reload trang, theme đã chọn phải được khôi phục.
- Có thể tự triển khai bằng React Context/Provider thay vì thêm thư viện:
  - Tạo `components/ThemeProvider.tsx`.
  - Provider gắn class `dark` hoặc `light` vào `document.documentElement`.
  - `Navbar` dùng hook theme để đổi trạng thái.
- Nếu dùng Tailwind dark mode, cấu hình theo class strategy và dùng các class `dark:*`.

Gợi ý token màu:

- Light background: `#fffaf7`
- Light surface: `#ffffff`
- Light text: `#18181b`
- Light muted text: `#52525b`
- Dark background: `#120b08`
- Dark surface: `#1f1510`
- Dark elevated surface: `#2a1b14`
- Dark text: `#fff7ed`
- Dark muted text: `#fed7aa`
- Primary vẫn là `#ee6224` ở cả hai theme.

Yêu cầu thiết kế dark mode:

- Không chỉ đảo màu cơ học; cần đảm bảo cảm giác hiện đại, dễ đọc, tương phản tốt.
- Nền tối nên dùng nâu đen/cam đen ấm thay vì đen tuyệt đối.
- Border trong dark mode dùng cam nhạt có opacity thấp, ví dụ `border-[#ee6224]/20`.
- Shadow trong dark mode nhẹ, ưu tiên border/glow cam mờ thay vì shadow đen nặng.
- Hero overlay, chatbot panel, card giới thiệu và footer đều phải có trạng thái dark tương ứng.
- Không để logo, ảnh, text hoặc input bị chìm khi đổi theme.

## 4. Điều hướng và layout chung

### 4.1. Navbar

Tạo `components/Navbar.tsx` dựa trên Navbar hiện tại nhưng rút gọn menu.

Menu chính:

- `Trang chủ` -> `/`
- `Giới thiệu` -> `/gioi-thieu`
- `Chatbot AI` -> `/chatbot-ai`

Có thể thêm link ngoài nếu cần:

- `DUE` -> `https://due.udn.vn`

Yêu cầu:

- Trên trang chủ, navbar fixed ở đầu trang, nền trong suốt khi chưa scroll, chuyển sang nền trắng mờ khi scroll.
- Trên trang con, navbar sticky với nền cam `#ee6224` hoặc cam đậm.
- Active nav item rõ ràng.
- Mobile có nút menu hamburger.
- Có nút toggle Light/Dark mode đặt ở cụm action bên phải, cạnh hamburger trên mobile.
- Nút toggle cần có `aria-label` thay đổi theo trạng thái, ví dụ `Chuyển sang dark mode` hoặc `Chuyển sang light mode`.
- Logo gồm biểu tượng DUE/Khoa Marketing nếu có; nếu chưa có, dùng text logo:
  - Dòng nhỏ: `DUE`
  - Dòng chính: `Khoa Marketing`
  - Dòng phụ: `Chatbot AI tuyển sinh`

### 4.2. Footer

Tạo `components/Footer.tsx` theo Footer hiện tại nhưng thay nội dung.

Nội dung footer:

- Tên hệ thống: `Chatbot AI tuyển sinh Khoa Marketing DUE`
- Mô tả: `Kênh hỗ trợ thí sinh tra cứu thông tin tuyển sinh, chương trình đào tạo và cơ hội học tập tại Khoa Marketing, Trường Đại học Kinh tế - Đại học Đà Nẵng.`
- Điều hướng: Trang chủ, Giới thiệu, Chatbot AI.
- Liên hệ:
  - `Khoa Marketing - Trường Đại học Kinh tế, Đại học Đà Nẵng`
  - `71 Ngũ Hành Sơn, phường Mỹ An, quận Ngũ Hành Sơn, TP. Đà Nẵng`
  - Email placeholder: `marketing@due.edu.vn`
  - Website placeholder: `due.udn.vn`
- Copyright:
  - `© 2026 Khoa Marketing - Trường Đại học Kinh tế, Đại học Đà Nẵng.`

Nền footer:

- Cam đậm hoặc gradient nhẹ từ `#ee6224` sang `#9f3512`.
- Text trắng, link hover màu cam nhạt/vàng nhạt.

## 5. Trang chủ `/`

Trang chủ chỉ gồm:

1. Header dùng chung.
2. Hero section trình chiếu ảnh.
3. Section Chatbot AI.
4. Footer dùng chung.

Không thêm các section lịch sử/thành tựu như project mẫu.

### 5.1. Hero section

Tạo `components/HeroSection.tsx` dựa theo hero hiện tại.

Chức năng:

- Slideshow tự động chuyển ảnh sau mỗi 5 giây.
- Có dot indicator ở gần đáy hero.
- Click dot để đổi ảnh.
- Ảnh dùng `next/image` với `fill`, `object-cover`.
- Hero chiếm gần toàn viewport: `h-[100svh] min-h-[560px]`.

Asset đề xuất:

```ts
const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
];
```

Nội dung overlay:

- Eyebrow: `Khoa Marketing DUE`
- H1: `Chatbot AI tuyển sinh`
- Subtitle: `Hỗ trợ thí sinh tìm hiểu ngành học, phương thức xét tuyển, học phí, học bổng và cơ hội nghề nghiệp tại Khoa Marketing.`
- CTA chính: `Trò chuyện ngay` -> `/chatbot-ai`
- CTA phụ: `Tìm hiểu hệ thống` -> `/gioi-thieu`

Thiết kế:

- Không đặt hero text trong card dày.
- Dùng overlay sáng hoặc cam trong suốt để chữ rõ trên ảnh.
- H1 nổi bật, màu cam đậm hoặc trắng tùy nền ảnh.
- CTA chính nền `#ee6224`, hover cam đậm.
- CTA phụ viền cam hoặc nền trắng mờ.
- Ở cuối hero có shape wave hoặc dải chuyển nhẹ sang section tiếp theo, tương tự project mẫu nhưng dùng cam thay đỏ.

### 5.2. Section Chatbot AI trên trang chủ

Tạo `components/ChatbotSection.tsx`.

Mục tiêu:

- Giới thiệu ngắn chatbot.
- Cho người dùng thấy giao diện chatbot hoặc một preview tương tác nhẹ.
- Có nút vào trang chatbot chính.

Bố cục desktop:

- Grid 2 cột:
  - Cột trái: nội dung giới thiệu.
  - Cột phải: ảnh preview hoặc khung mini chatbot.
- `max-w-7xl`, padding tương tự project hiện tại.

Nội dung cột trái:

- Eyebrow: `Chatbot AI tuyển sinh`
- Title: `Hỏi nhanh về tuyển sinh Khoa Marketing DUE`
- Description: `Trợ lý AI giúp thí sinh tra cứu thông tin tuyển sinh, ngành học, chương trình đào tạo, học phí, học bổng, hoạt động sinh viên và định hướng nghề nghiệp.`
- Danh sách 3 điểm nổi bật:
  - `Tra cứu nhanh thông tin tuyển sinh`
  - `Gợi ý câu hỏi theo nhu cầu của thí sinh`
  - `Câu trả lời thân thiện, dễ hiểu, có thể tích hợp nguồn tham khảo`
- CTA: `Mở Chatbot AI` -> `/chatbot-ai`

Cột phải:

- Nếu có ảnh `/images/chatbot-ui.jpg`, dùng ảnh như project hiện tại.
- Nếu muốn sinh động hơn, dựng một mock chat nhỏ với 2-3 bubble:
  - Bot: `Xin chào, bạn muốn tìm hiểu ngành Marketing, Digital Marketing hay Truyền thông Marketing?`
  - User: `Em muốn biết phương thức xét tuyển năm nay.`
  - Bot: `Bạn có thể hỏi về điểm chuẩn, tổ hợp xét tuyển, học phí hoặc học bổng.`

Thiết kế:

- Nền section: trắng hoặc `#fff4ed`.
- Border, ring, shadow dùng cam nhạt.
- Không dùng đỏ.

## 6. Trang Giới thiệu `/gioi-thieu`

Tạo `app/gioi-thieu/page.tsx`.

Mục tiêu:

- Giới thiệu sơ bộ về mục đích và chức năng của Chatbot AI tuyển sinh Khoa Marketing DUE.
- Nội dung đủ trang trọng nhưng không quá dài.

Metadata:

```ts
export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu mục đích và chức năng của Chatbot AI tuyển sinh Khoa Marketing, Trường Đại học Kinh tế - Đại học Đà Nẵng.",
};
```

Bố cục đề xuất:

1. Page hero nhỏ:
   - Nền cam nhạt hoặc cam đậm.
   - Eyebrow: `Giới thiệu`
   - H1: `Chatbot AI tuyển sinh Khoa Marketing DUE`
   - Description: `Không gian hỗ trợ thí sinh tìm kiếm thông tin tuyển sinh một cách nhanh chóng, thân thiện và có định hướng.`

2. Section mục đích:
   - Title: `Mục đích xây dựng`
   - Nội dung:
     - Chatbot được xây dựng để hỗ trợ thí sinh, phụ huynh và người quan tâm tiếp cận thông tin tuyển sinh của Khoa Marketing DUE.
     - Hệ thống giúp giảm thời gian tra cứu, gợi ý câu hỏi thường gặp và tạo trải nghiệm tư vấn trực tuyến thuận tiện.

3. Section chức năng chính:
   Dùng grid 3 hoặc 4 card, mỗi card có icon đơn giản hoặc ký hiệu.

   Card 1:
   - Title: `Thông tin tuyển sinh`
   - Text: `Hỗ trợ hỏi đáp về phương thức xét tuyển, tổ hợp môn, chỉ tiêu, mốc thời gian và hồ sơ cần chuẩn bị.`

   Card 2:
   - Title: `Ngành học và chương trình đào tạo`
   - Text: `Giới thiệu các định hướng học tập, học phần tiêu biểu, kỹ năng sinh viên được trang bị và trải nghiệm học tập tại Khoa Marketing.`

   Card 3:
   - Title: `Học phí, học bổng và hỗ trợ sinh viên`
   - Text: `Cung cấp thông tin tham khảo về chi phí học tập, chính sách học bổng, hoạt động hỗ trợ và môi trường sinh viên.`

   Card 4:
   - Title: `Cơ hội nghề nghiệp`
   - Text: `Gợi ý các vị trí nghề nghiệp liên quan đến marketing, truyền thông, thương hiệu, nghiên cứu thị trường và kinh doanh số.`

4. Section CTA cuối trang:
   - Title: `Sẵn sàng đặt câu hỏi?`
   - Description: `Mở Chatbot AI để được hỗ trợ tra cứu thông tin tuyển sinh Khoa Marketing DUE.`
   - Button: `Trò chuyện với Chatbot AI` -> `/chatbot-ai`

Thiết kế:

- Page nền `#fffaf7`.
- Card trắng, border cam nhạt.
- Heading màu cam đậm.
- Button nền `#ee6224`.

## 7. Trang Chatbot AI `/chatbot-ai`

Tạo `app/chatbot-ai/page.tsx`.

Trang này là trang chính của chatbot, dùng `components/ChatbotUI.tsx`.

Metadata:

```ts
export const metadata: Metadata = {
  title: "Chatbot AI",
  description:
    "Chatbot AI hỗ trợ tư vấn và tra cứu thông tin tuyển sinh Khoa Marketing, Trường Đại học Kinh tế - Đại học Đà Nẵng.",
};
```

Bố cục:

- Nền cam rất nhạt `#fff4ed` hoặc `#fffaf7`.
- Section căn giữa, tối thiểu cao gần viewport:
  - `min-h-[calc(100svh-104px)]`
  - padding `px-4 py-8`.
- Container `max-w-[1180px]`.
- Bên trong render `<ChatbotUI />`.

## 8. Chatbot UI

Tạo hoặc chỉnh `components/ChatbotUI.tsx` dựa theo component hiện tại.

Chatbot UI cần có cảm giác **năng động, hiện đại, thân thiện với thí sinh**, không quá hành chính hoặc khô cứng. Đây là điểm nhấn chính của toàn bộ frontend.

Yêu cầu tổng quan:

- Bố cục chat rõ ràng, hiện đại, có chiều sâu nhẹ bằng border, surface và shadow.
- Bubble chat có bo góc mềm vừa phải, spacing thoáng, typography dễ đọc.
- Có các chip câu hỏi gợi ý ở trạng thái ban đầu.
- Khi bot đang xử lý, hiển thị tiến trình sinh động thay vì chỉ loading text.
- Có typing animation khi câu trả lời xuất hiện.
- Có trạng thái hover/focus rõ ràng cho input, button gửi, chip gợi ý và toggle nguồn.
- Tránh giao diện tĩnh, nặng màu, hoặc giống form nhập liệu đơn giản.
- Tất cả trạng thái của Chatbot UI phải hỗ trợ cả Light mode và Dark mode.

### 8.1. Nội dung ban đầu

Tin nhắn chào:

```txt
Xin chào. Tôi là Chatbot AI tuyển sinh Khoa Marketing DUE. Bạn có thể hỏi tôi về ngành học, phương thức xét tuyển, học phí, học bổng, hoạt động sinh viên và cơ hội nghề nghiệp.
```

Quick questions trong `lib/content.ts`:

```ts
export const quickQuestions = [
  "Khoa Marketing DUE đào tạo những ngành hoặc chuyên ngành nào?",
  "Phương thức xét tuyển vào Khoa Marketing gồm những gì?",
  "Học phí và học bổng của sinh viên Khoa Marketing như thế nào?",
  "Sinh viên Marketing DUE có cơ hội nghề nghiệp nào sau khi tốt nghiệp?",
];
```

### 8.2. Header chat

Header chat:

- Eyebrow: `Trợ lý AI tuyển sinh`
- Title: `Tư vấn tuyển sinh Khoa Marketing DUE`
- Nền: `#ee6224` hoặc gradient từ `#ee6224` sang `#9f3512`.

### 8.3. Giao diện tin nhắn

Giữ logic tương tự project hiện tại:

- Bubble user căn phải, nền `#ee6224`, chữ trắng.
- Bubble bot căn trái, nền trắng ở light mode và nền tối ấm ở dark mode, border cam nhạt.
- Render markdown cho câu trả lời bot.
- Có trạng thái xử lý gồm 3 bước:
  - `Tìm kiếm thông tin`
  - `Phân tích câu hỏi`
  - `Soạn câu trả lời`
- Có typing animation.
- Input textarea gửi bằng Enter, Shift+Enter xuống dòng.
- Button gửi:
  - Text: `Gửi`
  - Nền `#ee6224`
  - Disabled khi đang xử lý hoặc input rỗng.

Gợi ý thiết kế hiện đại:

- Chat shell light mode:
  - Nền ngoài: `#fff4ed`
  - Khung chat: `bg-white`, `border-[#ee6224]/15`, shadow nhẹ.
  - Message area: `bg-[#fffaf7]`.
- Chat shell dark mode:
  - Nền ngoài: `#120b08`
  - Khung chat: `bg-[#1f1510]`, `border-[#ee6224]/20`.
  - Message area: `bg-[#160f0b]`.
- Header chat:
  - Light mode: gradient `#ee6224` -> `#9f3512`.
  - Dark mode: nền `#2a1b14` với border dưới `#ee6224` opacity thấp, vẫn giữ accent cam.
- Input:
  - Light mode: nền trắng, border cam nhạt, focus ring cam.
  - Dark mode: nền `#2a1b14`, chữ sáng, placeholder cam nhạt opacity thấp.
- Quick question chips:
  - Dạng button nhỏ, dễ bấm, hover đổi border/nền cam nhạt.
  - Dark mode dùng nền tối nâng nhẹ và viền cam mờ.
- Processing progress:
  - Dùng 3 step dạng pill/line nhỏ.
  - Step hiện tại có dot/pulse cam.
  - Step đã xong có trạng thái tích cực rõ ràng, không cần màu xanh quá chói.

### 8.4. Panel nguồn tham khảo

Nếu backend có trả nguồn:

- Giữ panel nguồn bên phải như project hiện tại.
- Đổi nhãn thành `Nguồn`.
- Card nguồn dùng border cam nhạt.

Nếu chưa có backend RAG:

- Vẫn giữ UI panel nhưng cho phép hiển thị rỗng.
- API route có thể trả câu trả lời mẫu hoặc nối với backend sau.

### 8.5. Dark mode trong Chatbot UI

Chatbot UI phải phản ứng đầy đủ với theme toàn site.

Yêu cầu cụ thể:

- Không tạo toggle riêng trong chatbot nếu Navbar đã có toggle toàn site.
- Chatbot đọc theme từ provider/global class và đổi màu bằng `dark:*` hoặc CSS variables.
- Các phần cần có dark mode:
  - Chat shell.
  - Header chat.
  - Message area.
  - Bot bubble.
  - User bubble.
  - Quick question chips.
  - Processing progress.
  - Markdown content như table, code, blockquote.
  - Input textarea.
  - Send button.
  - Reference side panel.
- Markdown trong dark mode cần dễ đọc:
  - `strong` dùng cam nhạt hoặc trắng.
  - `code` inline dùng nền tối nâng nhẹ, chữ cam nhạt.
  - Table có border tối ấm, header có nền cam rất mờ.
  - Blockquote có border cam và nền cam tối trong suốt.
- Panel nguồn ở dark mode:
  - Nền `#1f1510`.
  - Card nguồn nền `#2a1b14`.
  - Text chính sáng, text phụ cam nhạt.
  - Toggle tab `Nguồn` vẫn nổi bật bằng `#ee6224`.

## 9. API chatbot

Nếu giữ endpoint nội bộ:

- Route: `app/api/chatbot-ai/route.ts`
- Method: `POST`
- Body:

```ts
{
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}
```

Response:

```ts
{
  answer: string;
  sources?: Array<{
    id: string;
    document: string;
    chunkIndex: number;
    snippet: string;
    score: number;
  }>;
  warning?: string;
}
```

Nếu chưa có backend thật, route có thể trả fallback thân thiện:

```txt
Hiện hệ thống đang chờ kết nối dữ liệu tuyển sinh chính thức. Bạn có thể cấu hình backend/RAG để Chatbot AI trả lời chính xác hơn.
```

Không hard-code thông tin tuyển sinh chi tiết nếu chưa có nguồn chính thức.

## 10. Nội dung dùng chung trong `lib/content.ts`

Tạo dữ liệu điều hướng:

```ts
export const navItems = [
  { label: "Trang chủ", href: "/", external: false },
  { label: "Giới thiệu", href: "/gioi-thieu", external: false },
  { label: "Chatbot AI", href: "/chatbot-ai", external: false },
  { label: "DUE", href: "https://due.udn.vn", external: true },
] as const;
```

Tạo quick questions như ở mục 8.1.

Có thể tạo thêm `aboutFeatureCards` cho trang giới thiệu.

## 11. Metadata và tiếng Việt

Trong `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: {
    default: "Chatbot AI tuyển sinh Khoa Marketing DUE",
    template: "%s | Marketing DUE",
  },
  description:
    "Website Chatbot AI hỗ trợ tư vấn tuyển sinh cho Khoa Marketing, Trường Đại học Kinh tế - Đại học Đà Nẵng.",
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
  },
};
```

Yêu cầu:

- HTML lang là `vi`.
- Tất cả text tiếng Việt phải hiển thị đúng UTF-8, không bị lỗi mã hóa.
- Không để lại nội dung cũ về An ninh nhân dân, Bộ Công an, 80 năm ANND.

## 12. Responsive và accessibility

Yêu cầu kiểm tra:

- Mobile dưới 640px:
  - Navbar không vỡ dòng.
  - Menu mobile hoạt động.
  - Hero text không tràn.
  - Chat input không bị che.
  - Chat bubbles không vượt quá chiều ngang màn hình.
- Tablet:
  - Hero và chatbot section giữ khoảng cách hợp lý.
  - Grid tự chuyển từ 1 cột sang 2 cột khi đủ rộng.
- Desktop:
  - Navbar hiển thị đầy đủ.
  - Chatbot page căn giữa đẹp.
  - Panel nguồn không che nội dung chính quá mức.

Accessibility:

- Button có `aria-label` khi chỉ dùng icon.
- Link đang active có `aria-current="page"`.
- Chat area có `aria-live="polite"`.
- Input có placeholder rõ ràng.
- Độ tương phản chữ/nền phải đủ đọc.
- Ảnh hero có alt rỗng nếu chỉ trang trí; ảnh logo/preview phải có alt mô tả.

## 13. Checklist triển khai cho Codex

Khi thực hiện, làm theo thứ tự:

1. Đọc cấu trúc project hiện tại để nắm style component.
2. Cập nhật `lib/content.ts` cho menu, quick questions và nội dung mới.
3. Tạo `ThemeProvider` và cơ chế toggle Light/Dark mode toàn site.
4. Cập nhật `app/layout.tsx` metadata, bọc provider và giữ Navbar/Footer dùng chung.
5. Refactor `Navbar.tsx` sang thương hiệu Marketing DUE, màu cam `#ee6224`, có nút toggle theme.
6. Refactor `Footer.tsx` sang nội dung Khoa Marketing DUE, hỗ trợ dark mode.
7. Tạo/cập nhật `HeroSection.tsx` cho slideshow trang chủ, hỗ trợ overlay theo theme.
8. Tạo `ChatbotSection.tsx` cho section thứ hai của trang chủ.
9. Cập nhật `app/page.tsx` chỉ gồm `HeroSection` và `ChatbotSection`.
10. Tạo `app/gioi-thieu/page.tsx`.
11. Cập nhật `app/chatbot-ai/page.tsx`.
12. Refactor `ChatbotUI.tsx` sang nội dung tuyển sinh Marketing DUE, màu cam, giao diện năng động hiện đại và hỗ trợ dark mode đầy đủ.
13. Cập nhật `globals.css` để bỏ màu/chủ đề cũ không còn phù hợp, thêm token/theme class nếu cần.
14. Chạy lint/build nếu có thể:
    - `npm run lint`
    - `npm run build`
15. Khởi động dev server để kiểm tra giao diện:
    - `npm run dev`

## 14. Tiêu chí hoàn thành

Frontend được xem là hoàn thành khi:

- Có đúng 3 trang chính: `/`, `/gioi-thieu`, `/chatbot-ai`.
- Trang chủ chỉ có hero slideshow và section Chatbot AI ngoài header/footer.
- Màu nhận diện chính là `#ee6224`.
- Có toggle Light/Dark mode toàn site, lưu lựa chọn theme và áp dụng ổn định sau khi reload.
- Chatbot UI có giao diện năng động, hiện đại, có quick questions, processing progress, typing animation và hỗ trợ dark mode đầy đủ.
- Không còn nội dung/ảnh/logo/màu sắc gắn với project ANND cũ, trừ khi chỉ là placeholder chưa thay.
- Chatbot UI hoạt động ở mức frontend: nhập câu hỏi, gửi request, hiển thị trạng thái xử lý, hiển thị câu trả lời hoặc fallback.
- Giao diện responsive, không vỡ layout trên mobile.
- Text tiếng Việt hiển thị đúng.
- Code giữ phong cách component hóa, dễ bảo trì, không tạo refactor ngoài phạm vi.
