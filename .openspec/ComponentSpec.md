# UI Component Specification

## 1. 全域樣式 (Global Styles)
- **Font**: Inter (Next.js default) or generic sans-serif.
- **Colors**: ShadCN UI default theme (Zinc/Slate).
- **Dark Mode**: Support enabled (automatic/toggle).

## 2. 佈局 (Layouts)

### `MainLayout` (`src/components/main-layout.tsx`)
- **Description**: 應用程式的主佈局，包含側邊欄的 RWD 邏輯。
- **Props**: `children: React.ReactNode`
- **Behavior**:
    - **Desktop**: 
        - Left Sidebar (Fixed, width: 250px-300px)
        - Right Content (Scrollable, 100% width)
    - **Mobile**:
        - Top Header (Fixed, contains Hamburger Menu & Logo)
        - Content (Scrollable, full width)
        - Sidebar (Sheet/Drawer, triggered by Hamburger)

## 3. 元件 (Components)

### `Sidebar` (`src/components/ui/sidebar.tsx` or `src/components/sidebar-nav.tsx`)
- **Description**: 側邊導覽列。
- **Sections**:
    1.  **Header**: Logo (Avatar), Blog Name, Short Bio.
    2.  **Navigation**: Links to Home, Articles, About, Search (Dialog trigger).
    3.  **Archive**: Nested List (Year -> Month -> Count).
- **Props**:
    - `articles`: `Article[]` (Used to generate archive tree)
    - `isMobile`: `boolean` (Optional, for responsive adjustments)

### `ArticleCard` (`src/components/article-card.tsx`)
- **Description**: 文章列表中的單篇文章預覽卡片。
- **Props**: `article: Article`
- **UI Elements**:
    - `CoverImage` (Round/Square aspect ratio)
    - `Title` (H2/H3)
    - `Excerpt` (Line clamped to 4 lines)
    - `Meta` (Date, Tags)
    - `ReadMoreButton` (Link)
    - **Implementation**: Uses ShadCN `Card`, `Badge`, `Avatar`.

### `SearchDialog` (`src/components/search-dialog.tsx`)
- **Description**: 搜尋文章的彈出視窗。
- **State**:
    - `isOpen`: controlled by trigger.
    - `query`: string (input value).
    - `results`: `Article[]` (filtered list).
- **Behavior**:
    - Real-time filtering of articles based on `query` matching `title` or `description`.

### `MarkdownRenderer` (`src/components/markdown-renderer.tsx`)
- **Description**: 負責將 Markdown 內容渲染為 HTML。
- **Props**: `content: string`
- **Features**:
    - Typography plugin (Tailwind Prose).
    - Code highlighting.
    - Image optimization.

## 4. 頁面 (Pages)

### `AboutPage` (`/about`)
- **Layout**:
    - **Bio Section**: Detailed personal introduction, skills, experience.
    - **Contact**: Social links or contact form.
    - **Sidebar**: Standard right sidebar.

### `HomePage` (`/`)
- **Layout**:
    - **Latest Articles**: Top section, list of newest 6 articles (sorted by `publishedAt`).
    - **Popular Articles**: Bottom section, list of top 4 articles (sorted by `viewCount`).
    - *Note*: HackMD API provides `viewCount`, used for popularity sorting.

### `ArticleListPage` (`/articles`)
- **Layout**: Simple list of `ArticleCard` components (Grid layout).
- **Pagination**: Uses standard Pagination (12 items per page).
- **Implementation**: Uses ShadCN `Pagination`.

### `ArticleDetailPage` (`/articles/[slug]`)
- **Layout**:
    - Title Header (Background image?).
    - Content Body (Prose).
    - Footer (Tags, Share, Navigation to Prev/Next).
