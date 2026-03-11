# mangoDB Blog

Hi，這裡是 **mangoDB Blog** (https://su-ya.github.io/mango-db)。

Blog 技術組合是 Next.js + HackMD，
嘗試實驗 AI + Spec-Driven Dev (SDD) 的開發流程。

**開發流程**
```mermaid
flowchart TD
    A[人類定義原始文件 Spec.md] -->| AI 讀 Spec.md | B(AI 生成細項文件<br/>.openspec/DevGuide,<br/>DataSpec,<br/> ComponentSpec,<br/> Tasks,<br/> DevLog)
    B --> C{人類逐一審核<br/>文件是否完善？}
    C -->|ok| D(AI 依文件做 git commit)
    C -->|不 ok| E[人類列出改善項目、想法、明確修改文字]
    E --> | AI 讀取 | F(AI 修改文件)
    F --> C
    
    D --> G{人類審核 commit message 跟 commit 檔案<br/>是否無誤？}
    G -->|ok| H(AI 完成文件 commit)
    G -->|不 ok| I[人類列出改善項目、想法、明確文字]
    I --> | AI 讀取 | J(AI 修改 commit)
    J --> G
    
    H --> L(AI 依文件實作專案程式碼)
    L --> M{人類審核與除錯<br/>程式是否運作正確？}
    M -->|ok| N(AI 依文件做 git commit)
    M -->|不 ok| O[人類列出改善項目、想法、明確文字]
    O --> | AI 讀取 | P(AI 修改程式碼)
    P --> M
    
    N --> Q{人類審核 commit message 跟 commit 檔案<br/>是否無誤？}
    Q -->|ok| R(AI 完成程式 commit)
    Q -->|不 ok| S[人類列出改善項目、想法、明確文字]
    S --> | AI 讀取 | T(AI 修改 commit)
    T --> Q
    R --> U([完成開發])
    
    classDef human fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef ai fill:#d1fae5,stroke:#10b981,stroke-width:2px
    classDef verify fill:#fee2e2,stroke:#ef4444,stroke-width:2px

    class A,E,I,O,S human
    class B,D,F,H,J,L,N,P,R,T ai
    class C,G,M,Q verify
```

1. 定義產品規格 (Spec)：由人在 `.openspec/Spec.md` 中列出網站的核心需求、功能規劃與預期技術組合。

2. 展開技術文件 (Docs)：AI 基於 Spec.md，進一步生成詳細文件 `.openspec/DevGuide.md`, `DataSpec.md`, `ComponentSpec.md`, `Tasks.md`。由人逐一審核詳細文件，確保架構設計完善。

    詳細規格文件在 `.openspec/` 目錄下：
    ├── .openspec/                  # 專案規格文件
    │   ├── Spec.md                 # 原始文件
    │   ├── DataSpec.md             # 文章資料結構與 HackMD API
    │   ├── ComponentSpec.md        # UI 元件與 Page 頁面規格
    │   ├── DevGuide.md             # 開發部署 Workflow 與環境指南
    │   ├── DevLog.md               # 開發日誌與決策備忘錄
    │   └── Tasks.md                # 專案任務與進度追蹤

3. 實作程式碼 (Code)：AI 依據詳細文件來建立專案環境、實作功能元件並生成 Git Commits。由人來 Code Revie、測試除錯，與 AI 討論架構重構與踩坑解法。

想知道詳細效果跟踩雷請看 Blog 系列文【用 AI 加速開發：20 天打造輕量版 Blog】。