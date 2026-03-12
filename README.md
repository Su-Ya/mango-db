# mangoDB Blog

Hi，這裡是 **mangoDB Blog** (https://su-ya.github.io/mango-db)。

Blog 技術組合是 Next.js + HackMD，
嘗試實驗 AI + Spec-Driven Dev (SDD) 的開發流程。

**開發流程**
```mermaid
flowchart TD
    A[人類定義 Spec.md] -.-> DocsPhase

    subgraph DocsPhase ["階段一：定義規格文件"]
        direction TB
        B(AI 生成/修改<br/>規格細項文件) --> C{人類審核文件<br/>是否完善？}
        C -->|不 OK 給回饋| B
        C -->|OK| D(AI 產生 Git Commit)
        D --> E{人類審核<br/>Commit 訊息}
        E -->|不 OK 給回饋| D
    end

    E -.->|OK 進入開發| CodePhase

    subgraph CodePhase ["階段二：開發"]
        direction TB
        L(AI 依文件實作程式碼) --> M{人類測試除錯<br/>運作是否正常？}
        M -->|不 OK 給回饋| L
        M -->|OK| N{人類審核是否需<br/>重構 / 優化程式碼？}
        N -->|是，給回饋| Refactor[AI 依回饋進行重構]
        Refactor --> M
        N -->|否| O(AI 產生 Git Commit)
        O --> P{人類審核<br/>Commit 訊息}
        P -->|不 OK 給回饋| O
    end
    
    P -->|OK| Q([完成開發])

    classDef human fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef ai fill:#d1fae5,stroke:#10b981,stroke-width:2px
    classDef verify fill:#fee2e2,stroke:#ef4444,stroke-width:2px

    class A,I human
    class B,D,F,H,J,L,O,Refactor ai
    class C,E,G,M,N,P verify
```

1. 定義原始文件 (Spec)：由人在 `.openspec/Spec.md` 中列出網站的核心需求、功能規劃與預期技術組合。

2. 展開技術文件 (Docs)：AI 基於 `Spec.md`，進一步生成細項文件：`.openspec/DevGuide.md`, `DataSpec.md`, `ComponentSpec.md`, `Tasks.md`。由人逐一審核詳確保文件設計完善。

    詳細規格文件在 `.openspec/` 目錄下：
    ├── .openspec/                  # 專案規格文件
    │   ├── Spec.md                 # 原始文件
    │   ├── DataSpec.md             # 文章資料結構與 HackMD API
    │   ├── ComponentSpec.md        # UI 元件與 Page 頁面規格
    │   ├── DevGuide.md             # 開發部署 Workflow 與環境指南
    │   ├── DevLog.md               # 開發日誌與決策備忘錄
    │   └── Tasks.md                # 專案任務與進度追蹤
    註：DevLog.md 是開發階段產生的

3. 實作程式碼 (Code)：AI 依據詳細文件來建立專案環境、實作功能元件並生成 Git Commits。由人來 Code Revie、測試除錯，與 AI 討論架構重構與踩雷解法。

想知道詳細效果跟踩雷請看 Blog 系列文【用 AI 加速開發：20 天打造輕量版 Blog】。