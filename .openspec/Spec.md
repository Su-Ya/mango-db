# Spec
根據 `Spec.md` 文件，來創建前端工程師的部落格。
請先列出計畫跟步驟，
審核通過再真實建立專案環境、檔案、程式碼。


**想法：**
- 用 HackMD（基於 Markdown 語法的線上即時協作筆記與文件平台）當部落格後台編輯器
    - HackMD 公開文章列表 api = https://hackmd.io/api/@mangosu/overview
- 建立 myBlog 前端專案，實作前台部落格
    - 用 OpenSpec 作為 Spec 架構
        - https://github.com/Fission-AI/OpenSpec
    - 用 Next.js 作為前端框架
    - 用 Markdown 渲染引擎，將 HackMD 取得的文章編譯
- 部署到 github pages
- **請讀參考程式碼：**
    - 別人做的類似專案
        - https://github.com/Yukaii/daily-oops
    - post hackmd 文章
        - https://github.com/Yukaii/daily-oops/blob/main/lib/post.ts
    - markdown-it-plugins
        - https://github.com/Yukaii/daily-oops/blob/main/lib/markdown-it-plugins/callout.js
- 請讀參考資料：
    - https://yukai.dev/blog/2021/05/16/hackmd-as-cms-blog-feat-next-js
    - https://medium.com/starbugs/%E7%94%A8-hackmd-%E8%88%87-github-action-%E6%89%93%E9%80%A0%E4%BD%A0%E7%9A%84%E9%9D%9C%E6%85%8B%E7%B6%B2%E7%AB%99-%E7%B7%9A%E4%B8%8A%E6%96%87%E7%AB%A0%E7%B7%A8%E8%BC%AF%E5%B9%B3%E5%8F%B0-1d9b1a663e18
    
**技術棧：**
- OpenSpec
- Next.js
- Markdown 渲染引擎
- ...請補充我不知道的

**blog url：**
- https://myblog.com/home
- https://myblog.com/articles
- https://myblog.com/articles/{article_slug}
    - article_slug=`yyyymmdd-文章標題`，將標題轉為 kebab-case
    - 範例：article title = `CSS Grid vs. Flexbox`
          article date = `May 1, 2024`
          article url = `/articles/20240501-css-grid-vs-flexbox`
- https://myblog.com/about

**blog layout：**
- RWD（桌機、手機）
- 桌機版面：左右排版，右邊固定 sidebar，左邊根據 url 顯示對應頁面
- 手機版面：上下排版，置頂固定漢堡選單可收合，下方根據 url 顯示對應頁面

**blog pages（桌機版面）：**
- home
    - 左邊上下排版，上面是最新文章卡片，下面是熱門文章卡片
    - 右邊固定 sidebar
- articles
    - 左邊上下排版，所有文章卡片
    - 右邊固定 sidebar
- articles/{article_slug}
    - 左邊上下排版，單則文章內容
    - 右邊固定 sidebar
- about
    - 左邊上下排版，個人簡介
    - 右邊固定 sidebar

**blog UI：**
- sidebar
    - 上下排版，依序有三個區塊
    - 區塊一：logo＋部落格名稱＋簡介
        - logo 為圖片，圖片為圓框
    - 區塊二：navitem:1.home、2.articles、3.about、4.search articles
    - 區塊三：文章列表
        - 分父子層，可收合
        - 父層顯示年份＋該年份的文章總數
        - 子層顯示月份＋該月份的文章總數
- article card
    - card body
        - 上下排版，依序是
        - 文章的封面圖片
        - 文章的 title
        - 文章的內容文字，四行，其餘省略
        - read more
    - card footer
        - 同行左右排版，依序是文章的日期、標籤

**blog features：**
- home page：
    - 點擊文章卡片的 [read more]，切換 url 到 articles/{article_slug}，顯示對應的單則文章頁面
    - 點擊整張文章卡片，切換 url 到 articles/{article_slug}，顯示對應的單則文章頁面
- sidebar：
    - 點擊 logo/部落格名稱/簡介，切換 url 到 /home，顯示對應頁面
    - 點擊 navitem:articles，切換 url 到 /articles，顯示對應頁面
    - 點擊 navitem:about，切換 url 到 /about，顯示對應頁面
    - 點擊 navitem:search articles，跳出彈跳視窗
        - 輸入框輸入文字，可依輸入文字模糊搜尋文章標題或文章內容，過濾出符合條件的文章集合

**Next.js 目錄結構**
```
...
├── src
│   ├── app                     # Next.js App Router 頁面與佈局
│   │   ├── page.tsx            # 首頁 (最新與熱門文章)
│   │   ├── layout.tsx          # 全域根佈局 (字體)
│   │   ├── globals.css         # 全域 CSS
│   │   ├── about               # 關於我頁面
│   │   │   └── page.tsx
│   │   └── articles            # 文章相關路由
│   │       ├── page.tsx        # 所有文章列表
│   │       └── [slug]          # 文章詳情頁 (動態路由)
│   │           └── page.tsx
│   ├── components              # 共用 React 元件
│   │   ├── article-card.tsx    # 文章卡片組件 (包含 Read More 連結)
│   │   ├── logo-block.tsx      # 側邊欄 Logo 區塊
│   │   ├── main-layout.tsx     # 主佈局 (導覽列與側邊欄邏輯)
│   │   ├── search-dialog.tsx   # 文章搜尋對話框
│   │   ├── sidebar-nav.tsx     # 側邊欄導覽選單
│   │   └── ui                  # ShadCN UI 底層元件 (原子組件)
│   │       ├── accordion.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       ├── sidebar.tsx     # 核心側邊欄邏輯
│   │       └── ... (其他 UI 組件)
│   ├── hooks                   # 自定義 React Hooks
│   │   └── use-mobile.tsx      # 偵測行動裝置狀態
│   ├── lib                     # 工具函式與資料獲取
│   │   ├── data.ts             # 靜態文章資料與獲取邏輯
│   │   └── markdown.ts     # Markdown 處理邏輯
...
```

**設計圖參考（from firebase studio: blog-a）：**
home
![image](https://hackmd.io/_uploads/Sk6h2zRI-g.png)

about
![image](https://hackmd.io/_uploads/H1zK5fCLbx.png)

articles
![image](https://hackmd.io/_uploads/rk0mcGRL-g.png)

articles/{article_slug}
![image](https://hackmd.io/_uploads/SJNH9zALWl.png)

search articles
![image](https://hackmd.io/_uploads/BJ6aqMRUWg.png)

sidebar mobile
![image](https://hackmd.io/_uploads/ByPl5z08Wl.png)
![image](https://hackmd.io/_uploads/rkEbqGC8Zl.png)
