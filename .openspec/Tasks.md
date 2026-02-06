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
    - [/] 開發主版面配置 (Main Layout) 和側邊欄 (Sidebar)
        - [x] **SidebarNav** (`src/components/sidebar-nav.tsx`)
            - 實作 ShadCN Sidebar 結構
            - 整合 Logo, Navigation Menu, Search Trigger
            - 實作「年份 > 月份」的巢狀文章列表
        - [x] **MainLayout** (`src/components/main-layout.tsx`)
            - 整合 SidebarProvider 與 SidebarTrigger (Mobile)
            - 設定 RWD 斷點行為
        - [x] **Root Layout** (`src/app/layout.tsx`)
            - 套用 MainLayout wrap 整個應用
    - [ ] 實作首頁 (Home Page)
    - [ ] 實作文章列表頁 (Article List Page)
    - [ ] 實作文章詳情頁與 Markdown 渲染 (Article Detail Page)
    - [ ] 實作關於我頁面 (About Page)
    - [ ] 實作搜尋功能 (Search Functionality)

- [ ] 部署 (Deployment)
    - [ ] 驗證建置與匯出
    - [ ] 部署至 GitHub Pages
