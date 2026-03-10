# 開發規範與指南 (Development Guide)

## 1. 開發環境 (Environment)
- Runtime: Node.js v22.22.0+
- Package Manager: NPM v10.9.4+
- OpenSpec: v1.1.1 (Verify with `npx openspec --version`)

## 2. Git 工作流 (Git Workflow)
### Branch
- `main`: 主分支，也是部署分支 (Deployable)。

### Commit 分類
遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：
- `feat`: 新增功能 (Features)
- `fix`: 修復 Bug (Bug Fixes)
- `docs`: 僅修改文件 (Documentation)
- `style`: 程式碼風格調整 (不影響邏輯)
- `refactor`: 重構 (既非新增功能也非修復 Bug)
- `chore`: 建置過程或輔助工具的變動 (e.g., 修改 .gitignore)
-  `ci`: 部署到 github page (e.g., 修改 .deploy.yml / next.config.ts)

範例 (單行訊息):
```bash
git commit -m "feat(sidebar): add responsive mobile menu"
```

**Long Commit Message (多行訊息)**:
若訊息內容較長，建議透過檔案進行提交，避免 Shell 換行問題：

1. 建立訊息檔：寫入 `.git_commit_msg`
2. 執行指令：`git commit -F .git_commit_msg && rm .git_commit_msg`
  - **注意**！不可使用指令 `git add .`，避免把訊息檔加入 commit

> **指令詳解**：
> - `git commit -F <file>`: `-F` 代表 File，讓 Git 直接讀取檔案內容作為提交訊息，適合處理多行文字或特殊符號。
> - `&&`: 邏輯 AND，確保 **Commit 成功後** 才會執行刪除指令。若提交失敗，檔案會保留以便修正。
> - `rm <file>`: 刪除暫存的訊息檔，保持目錄整潔。

### Push & Deploy
部署方法一 (local git push origin main):
1. 從本地推上遠端 main 分支

部署方法二 (use Repo Actions):
1. 進入 GitHub Repo。
2. 點選上方的 Actions 頁籤。
3. 在左側選單點選 `Deploy Next.js site to Pages` (也就是 deploy.yml 的腳本名稱)。
4. 畫面上方會出現一個藍色的橫條，右邊有一顆 Run workflow 的按鈕，點擊後啟動抓取最新文章並部署。

## 3. 程式碼規範 (Coding Style)
- TypeScript: 強型別 (Strict Mode)，避免使用 `any`。
- Naming:
  - Components: PascalCase (e.g., `ArticleCard.tsx`)
  - Utilities/Functions: camelCase (e.g., `formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RESULTS`)
- Linting: 專案已配置 ESLint 與 Prettier，請開啟「存檔自動格式化」(Format On Save)。
- Tailwind: 盡量使用 Utility Classes，避免寫自定義 CSS。複雜樣式可使用 `cn()` (clsx + tailwind-merge) 組合。

## 4. 專案目錄結構 (Project Structure)
```
/
├── .github/
│   └── workflows/              # GitHub Actions 工作流程
│       └── deploy.yml          # GitHub Page 部署設定
├── .openspec/                  # 專案規格文件
│   ├── Spec.md                 # 原始文件
│   ├── DataSpec.md             # 文章資料結構與 HackMD API
│   ├── ComponentSpec.md        # UI 元件與 Page 頁面規格
│   ├── DevGuide.md             # 開發部署 Workflow 與環境指南
│   ├── DevLog.md               # 開發日誌與決策備忘錄
│   └── Tasks.md                # 專案任務與進度追蹤
├── public/                     # 靜態資源資料夾 (如: 圖片)
│   └── sign_logo.png           # sidebar, Mobile Header, About me 的 Logo
├── src/
│   ├── app/                    # Next.js App Router 頁面與佈局
│   │   ├── icon.png            # 網站 Favicon
│   │   ├── page.tsx            # 首頁 (最新與熱門文章)
│   │   ├── layout.tsx          # 全域根佈局 (字體)
│   │   ├── globals.css         # 全域 CSS
│   │   ├── about/              # 關於我頁面
│   │   │   └── page.tsx
│   │   └── articles/           # 文章相關路由
│   │       ├── page.tsx        # 所有文章列表 (Server Component 負責抓資料)
│   │       ├── article-list-client.tsx # 文章列表分頁邏輯 (Client Component)
│   │       └── [slug]/         # 文章詳情頁 (動態路由)
│   │           ├── layout.tsx
│   │           └── page.tsx
│   ├── components/             # 共用 React 元件
│   │   ├── article-card.tsx    # 文章卡片元件
│   │   ├── main-layout.tsx     # 主佈局 (Sidebar, Mobile Header, Page RWD)
│   │   ├── mode-toggle.tsx     # 主題色模式切換按鈕
│   │   ├── search-dialog.tsx   # 文章搜尋對話框
│   │   ├── sidebar-nav.tsx     # 側邊欄導覽選單
│   │   ├── theme-provider.tsx  # 主題色提供者
│   │   └── ui/                 # ShadCN UI 底層元件 (原子元件)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ... (其他 UI 元件)
│   ├── hooks/                  # 自定義 React Hooks
│   │   ├── use-debounce.ts     # 延遲輸入防抖動 Hook
│   │   └── use-mobile.tsx      # 偵測行動裝置狀態
│   ├── lib/                    # 工具函式與資料獲取
│   │   ├── data.ts             # 靜態文章資料與獲取邏輯
│   │   ├── markdown-renderer.tsx # Markdown 渲染元件
│   │   └── hackmd-parser/      # HackMD 語法解析器
│   │       ├── styles.css      # 所支援的語法樣式
│   │       ├── index.ts        # 統一匯出點
│   │       ├── hackmd-highlight.ts
│   │       └── hackmd-callout.ts
│   ├── components.json         # ShadCN UI 的核心設定檔
│   ├── next.config.ts          # Next.js 的核心設定檔
│   ├── postcss.config.js       # PostCSS 的核心設定檔
└── ...config files
```