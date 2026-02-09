# 任務列表

- [/] 專案建置 (Project Setup)
    - [x] 初始化 Next.js 專案
    - [x] 設定 Tailwind CSS 和 ShadCN UI
    - [x] 建立初始目錄結構

- [x] 規格驅動開發 (Spec-Driven Development)
    - [x] 建立 OpenSpec 結構 (.openspec/Spec.md)
    - [x] 定義資料結構與 API 規格
    - [x] 設計 UI 元件規格

- [ ] 核心功能實作 (Core Implementation - Specs Ready)
    - [x] 實作 HackMD 資料獲取 (API/Mock)
    - [x] 開發主版面配置 (Main Layout) 和側邊欄 (Sidebar)
    - [x] 實作首頁 (Home Page)
    - [x] 實作文章列表頁 (Article List Page)
        - [x] **Pagination UI**
        - [x] **Article List Page** (`src/app/articles/page.tsx`)
    - [x] 實作文章詳情頁與 Markdown 渲染 (Article Detail Page)
        - [x] 安裝 `markdown-it` 與相關套件
        - [x] 實作 `MarkdownRenderer` 元件
        - [x] 實作 Article Detail Page (`src/app/articles/[slug]/page.tsx`)
        - [x] 支援 HackMD 語法解析與渲染
            - [x] **HackMD Callouts** (使用 `markdown-it-container` 實作 :::info, :::success 等)
            - [x] **Highlights** (使用 `markPlugin` 實作 ==highlight==)
            - [x] **Anchors** (使用 `markdown-it-anchor` 實作標題錨點)
            - [x] **Styling** (更新 `globals.css` 支援 callouts 與 mark 樣式)
    - [/] 實作關於我頁面 (About Page)
    - [ ] 實作搜尋功能 (Search Functionality)

- [ ] 部署 (Deployment)
    - [ ] 驗證建置與匯出
    - [ ] 部署至 GitHub Pages
