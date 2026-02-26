# UI Component Specification

## 1. 全域樣式 (Global Styles)
- 字體: Inter (Google Fonts)。在 src/app/layout.tsx 中 import 設定。
- 顏色: 使用 [ShadCN UI 的主題色變數](https://ui.shadcn.com/docs/theming) (CSS Variables)，`:root` (亮色) 與 `.dark` (深色)，設定檔位於 `src/app/globals.css` 中。
- 元件庫配置: 專案根目錄的 `components.json` 為 ShadCN UI 的核心設定檔，定義原生的樣式基底 (Style)、基礎顏色變數 (Base Color)，以及透過 CLI 安裝 UI 元件時的預設路徑 (Alias)。

## 2. 佈局 (Layouts)

### `MainLayout` (`src/components/main-layout.tsx`)
- 說明 (Description): 控制 Sidebar, Mobile Header, Page RWD
- 屬性 (Props): `children: React.ReactNode`
- 行為 (Behavior):
    - **桌面版 (Desktop，寬度 >= 768px)**: 
        - 左側側邊欄 (固定不捲動，寬度: 250px-300px)
        - 右側內容區 (可捲動，寬度 100%)
    - **手機版 (Mobile，寬度 < 768px)**:
        - 頂部導覽列 (固定不捲動，包含漢堡選單與 Logo)
        - 內容區 (可捲動，全寬度)
        - 側邊欄 (由漢堡選單觸發的抽屜拉出式選單)

## 3. 元件 (Components)

### `SidebarNav` (`src/components/sidebar-nav.tsx`)
- 說明 (Description): 側邊導覽列。
- 屬性 (Props):
    - `articles`: `Article[]` (用於產生封存文章樹狀結構)
    - `isMobile`: `boolean` (選填，用於響應式版面調整)
- 區塊 (Sections):
    1.  **頭部 (Header)**: Logo (頭像), 部落格名稱, 簡短介紹。
    2.  **導覽 (Navigation)**: 連結至首頁 (Home), 文章列表 (Articles), 關於 (About), 搜尋文章。
    3.  **封存 (Archive)**: 巢狀收合列表，結構為：年份 > 月份 > 文章標題連結(數量)。

### `ArticleCard` (`src/components/article-card.tsx`)
- 說明 (Description): 單篇文章預覽卡片。
- 屬性 (Props): `article: Article`
- 整體包裹 (Wrapper): 最外層使用 `<Link>` 提供整張卡片的可點擊區域與導航。
- 區塊 (Sections):
    - `CardHeader`:
        - 發布日期 (Date): 使用 `Calendar` icon (`lucide-react`)。
        - 觀看次數 (ViewCount): 若 `viewCount > 0` 則顯示 `Eye` icon 與次數。
    - `CardContent`:
        - `CardTitle` (標題): 限制顯示最多 2 行 (`line-clamp-2`)，Hover 時變色。
        - `CardDescription` (摘要): 顯示文章的 `description`，限制顯示最多 3 行 (`line-clamp-3`)。
    - `CardFooter`:
        - Tags (標籤): 遍歷 `article.tags`，使用 `Badge` 元件呈現。

### `SearchDialog` (`src/components/search-dialog.tsx`)
- 說明 (Description): 搜尋文章的彈出視窗 (Command Dialog)。
- 狀態 (State):
    - `open`: 控制彈窗開關 (可由觸發按鈕或快速鍵切換)。
    - `displayQuery`: 使用者輸入顯示的關鍵字 (即時呈現)。
    - `searchQuery` & `debouncedQuery`: 處理注音選字與 300ms 防抖動 (Debounce) 後的最終關鍵字。
    - `filteredArticles`: 透過 `useMemo` 緩存過濾後的文章列表。
- 行為 (Behavior):
    - 快速鍵 `⌘` + `K` (或 `Ctrl` + `K`) 可全域觸發搜尋對話框。
    - 支援注音/拼音輸入法 (IME)：選字過程中暫停搜尋，選字完成才觸發過濾。
    - 根據 `debouncedQuery` 使用 `fuzzyMatch` (模糊比對) 過濾文章標題 (`title`)。

### `MarkdownRenderer` (`src/lib/markdown-renderer.tsx`)
- 說明 (Description): 將 Markdown 語法解析並渲染成有樣式的 HTML。
- 屬性 (Props): 
    - `content: string` (Markdown 內容字串)
    - `className?: string` (額外的樣式類別)
- 功能 (Features):
    - 基礎解析: 使用 `markdown-it` 作為核心引擎，支援換行 (`breaks`) 與連結自動轉換 (`linkify`)。
    - 標題錨點: 結合 `markdown-it-anchor` 自動為標題生成可點擊的錨點連結。
    - 樣式渲染: 外層套用 Tailwind Typography (`prose`, `prose-slate`, `dark:prose-invert`) 提供最佳閱讀體驗，並針對圖片加入圓角與陰影 (`prose-img:rounded-xl`)。
    - HackMD 語法解析: 載入自定義 `HackmdParser`，支援 `highlight` (高亮) 與 `callout` (資訊區塊)。

## 4. 頁面 (Pages)

### `HomePage` (`src/app/page.tsx`)
- 版面配置 (Layout):
    - 最新文章 (Latest Articles): 頂部區塊，列出最新的 6 篇文章（依 `publishedAt` 發布時間排序），右上方有「View All」按鈕。
    - 熱門文章 (Popular Reads): 底部區塊，列出觀看數 (`viewCount`) 最高的 4 篇文章。

### `AboutPage` (`src/app/about/page.tsx`)
- 版面配置 (Layout):
    - 頂部標題: 顯示 "About Me" (`h1`)。
    - 簡介卡片 (`Card`):
        - 頭部 (`CardHeader`): 
            - 大頭貼: 使用 `Avatar` 元件，帶有橘色邊框。
            - 聯絡方式: Email 與 GitHub 連結的按鈕 (`Button variant="outline"`)。
        - 內文 (`CardContent`): 自我介紹。

### `ArticleListPage` (`src/app/articles/page.tsx`, `article-list-client.tsx`)
- 職責分離 (Architecture):
    - **Server Component** (`page.tsx`): 負責抓取所有文章、依發布時間排序，並剝去龐大的 Markdown 內文僅傳遞預覽資料 (`previews`) 給 Client Component。
    - **Client Component** (`article-list-client.tsx`): 接收資料，透過 React Hook 處理分頁狀態與 URL SearchParams (`?page=x`)。
- 版面配置 (Layout):
    - 文章列表: 顯示 `ArticleCard` 陣列（響應式 Grid 網格排版）。
    - 分頁器 (Pagination): 位於底部，每頁固定顯示 12 篇文章，使用 ShadCN 的 `Pagination` 元件實作。
    - 載入狀態: 外層包覆 `<Suspense>` 處理非同步延遲載入。

### `ArticleDetailPage` (`src/app/articles/[slug]/page.tsx`)
- 版面配置 (Layout):
    - 標題區塊 (`header`):
        - 中繼資訊: 發布日期 (Calendar icon) 與觀看次數 (Eye icon)。
        - 標題: `h1`，大型粗體文字。
        - 標籤列: 顯示文章 Tags，使用 `Badge` 元件。
    - 內文區塊 (`main`):
        - 渲染器: 將原始的 `article.content` 傳入 `MarkdownRenderer` 元件進行渲染。
    - 頁尾區塊 (`footer`): 底部留白邊界。
