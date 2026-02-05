# 開發規範與指南 (Development Guide)

本文件定義專案的開發流程、編碼規範與環境要求，旨在確保團隊協作的一致性與品質。

## 1. 開發環境 (Environment)
- **Runtime**: Node.js v22.22.0+
- **Package Manager**: NPM v10.9.4+
- **Editor**: VS Code (建議安裝 ESLint, Prettier, Tailwind CSS Intellisense 套件)

## 2. Git 工作流 (Git Workflow)
本專案採用簡化的 Feature Branch Workflow。

### Branching Strategy
- `main`: 主分支，隨時保持可部署狀態 (Deployable)。**禁止直接 Commit 到 main**。
- `feature/<name>`: 功能開發分支 (e.g., `feature/sidebar-ui`, `feature/fetch-api`)。
- `fix/<name>`: Bug 修復分支。
- `docs/<name>`: 文件撰寫分支。

### Commit Convention
請遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：
- `feat`: 新增功能 (Features)
- `fix`: 修復 Bug (Bug Fixes)
- `docs`: 僅修改文件 (Documentation)
- `style`: 程式碼風格調整 (不影響邏輯)
- `refactor`: 重構 (既非新增功能也非修復 Bug)
- `chore`: 建置過程或輔助工具的變動 (e.g., 修改 .gitignore)

**Example**:
```bash
git commit -m "feat(sidebar): add responsive mobile menu"
```

## 3. 程式碼規範 (Coding Style)
- **TypeScript**: 強型別 (Strict Mode)，避免使用 `any`。
- **Naming**:
  - Components: PascalCase (e.g., `ArticleCard.tsx`)
  - Utilities/Functions: camelCase (e.g., `formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RESULTS`)
- **Linting**: 專案已配置 ESLint 與 Prettier，請開啟「存檔自動格式化」(Format On Save)。
- **Tailwind**: 盡量使用 Utility Classes，避免寫自定義 CSS。複雜樣式可使用 `cn()` (clsx + tailwind-merge) 組合。

## 4. 專案目錄結構 (Project Structure)
```
/
├── .openspec/                  # 專案規格文件
│   ├── Spec.md                 # 產品總論與需求大綱
│   ├── DataSpec.md             # 資料結構與 API 規格
│   ├── ComponentSpec.md        # UI 元件與頁面規格
│   └── DevGuide.md             # 開發規範與環境指南
├── src/
│   ├── app/                    # Next.js App Router 頁面與佈局
│   │   ├── page.tsx            # 首頁 (最新與熱門文章)
│   │   ├── layout.tsx          # 全域根佈局 (字體)
│   │   ├── globals.css         # 全域 CSS
│   │   ├── about/              # 關於我頁面
│   │   │   └── page.tsx
│   │   └── articles/           # 文章相關路由
│   │       ├── page.tsx        # 所有文章列表
│   │       └── [slug]/         # 文章詳情頁 (動態路由)
│   │           └── page.tsx
│   ├── components/             # 共用 React 元件
│   │   ├── article-card.tsx    # 文章卡片組件 (包含 Read More 連結)
│   │   ├── logo-block.tsx      # 側邊欄 Logo 區塊
│   │   ├── main-layout.tsx     # 主佈局 (導覽列與側邊欄邏輯)
│   │   ├── search-dialog.tsx   # 文章搜尋對話框
│   │   ├── sidebar-nav.tsx     # 側邊欄導覽選單
│   │   └── ui/                 # ShadCN UI 底層元件 (原子組件)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ... (其他 UI 組件)
│   ├── hooks/                  # 自定義 React Hooks
│   │   └── use-mobile.tsx      # 偵測行動裝置狀態
│   ├── lib/                    # 工具函式與資料獲取
│   │   ├── data.ts             # 靜態文章資料與獲取邏輯
│   │   └── markdown.ts         # Markdown 處理邏輯
└── ...config files (tailwind.config.ts, next.config.mjs, etc.)
```

## 5. 設計規範 (Design System)
- **Typography**: Inter (Google Fonts)
- **Colors**: 遵循 `tailwind.config.ts` 中的 ShadCN UI 變數 (CSS Variables)。
- **Dark Mode**: 支援系統切換，實作於 `next-themes`。
