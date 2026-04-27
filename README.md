# 404 台灣生技與生物資訊人力資源平台 (Taiwan Biotech & Bioinformatics HR Platform)

## 📖 專案簡介

「404 生技與生資人力資源網站」是一個專為台灣生物科技與生物資訊產業打造的企業與求職資訊平台。
本專案旨在彙整台灣基因體、新藥研發、CDMO、細胞治療與疫苗等領域的公司資訊，並提供求職者直覺的介面，透過地點、薪資等條件進行篩選與排序，快速找到理想的職缺與公司資訊。

此為團隊協作專案，包含前端網頁介面開發與後端資料庫建置。

---

## 📁 專案架構 (Project Structure)

本專案採用前後端分離架構，目錄配置如下：

```text
webfinal/
│
├── frontend/          # 前端程式碼 (網頁介面、UI/UX)
│   └── (前端框架相關檔案將建置於此)
│
├── backend/           # 後端程式碼 (API 伺服器、資料庫連線)
│   └── (後端語言與框架相關檔案將建置於此)
│
├── final.md           # 專案需求與原始公司資料清單
├── README.md          # 專案開發說明與協作規範 (本文件)
└── .gitkeep           # 保留空資料夾的 Git 標記
```

### 開發需求分配
*   **前端團隊 (`frontend/`)**：負責建立總覽列表頁 (Index) 與公司詳細頁 (Company Profile)，並實作依城市、薪資進行**篩選 (Filter)** 與**排序 (Sorting)** 的功能。
*   **後端團隊 (`backend/`)**：負責建立 `companies` 資料表，設計 API 供前端串接。需儲存公司名稱、地址 (解析城市)、產品、聯絡方式、財務與薪資資訊。
*   **資料建置**：根據 `final.md` 的名單，持續補齊缺失的企業與薪資資訊。

---

## 🤝 團隊協作指南 (GitHub Collaboration Workflow)

為了確保多人協作時程式碼的穩定性與整潔，本專案將採用以下 Git 協作流程。

### 1. 分支策略 (Branching Strategy)
專案主要分為以下幾種分支：
*   **`main` (主分支)**：隨時保持穩定、可部署 (Production-ready) 的狀態。**不要直接 Commit 到此分支。**
*   **`dev` (開發分支)**：主要開發的分支。所有新功能測試完畢後會先合併到這裡。
*   **`feature/<功能名稱>`**：開發新功能時，從 `dev` 分支切換出來。例如：`feature/frontend-login` 或 `feature/backend-api`。
*   **`fix/<錯誤修復>`**：修復 Bug 時使用。例如：`fix/company-filter-bug`。

### 2. 本地開發流程 (Development Flow)

**步驟一：複製專案並切換到開發分支**
```bash
git clone https://github.com/pinchiu/webfinal.git
cd webfinal
git checkout dev
```

**步驟二：建立你的專屬功能分支並開始開發**
```bash
git checkout -b feature/你的功能名稱
# 例如：git checkout -b feature/create-company-table
```

**步驟三：開發與提交程式碼 (Commit)**
開發過程中，請確保 Commit 訊息清晰易懂。
```bash
git add .
git commit -m "feat(backend): 建立 companies 資料表及關聯"
```

**Commit 訊息規範 (Conventional Commits)**:
*   `feat: ` - 新增功能 (Feature)
*   `fix: ` - 修復 Bug (Bug Fix)
*   `docs: ` - 文件更新 (Documentation)
*   `style: ` - 程式碼格式修改 (不影響運作的排版等)
*   `refactor: ` - 程式碼重構 (Refactoring)
*   `test: ` - 新增或修改測試 (Testing)

### 3. 如何發佈你的修改 (Pull Request, PR)

當你的功能開發完成，準備合併到團隊的 `dev` 分支時：

1.  **推送到 GitHub 遠端：**
    ```bash
    git push origin feature/你的功能名稱
    ```
2.  **建立 Pull Request (PR)：**
    *   到 GitHub 專案頁面，點擊 **"Compare & pull request"**。
    *   設定來源分支為你的 `feature/xxx`，目標分支 (Base) 選擇為 **`dev`**。(請注意：絕對不要直接發 PR 給 `main`！)
    *   在 PR 描述中，清楚寫下你完成了哪些功能、解決了什麼問題。
3.  **程式碼審查 (Code Review)：**
    *   請至少一位團隊成員 (Reviewer) 來檢查你的程式碼。
    *   如果有需要修改的地方，請在本地修改後再次 `git add` > `git commit` > `git push`，PR 會自動更新。
4.  **合併 (Merge)：**
    *   審查通過後，由負責人點擊 "Merge pull request"，將你的程式碼合併進 `dev` 分支。

### 4. 保持本地端程式碼同步

在開發過程中，其他成員可能已經合併了新的程式碼到 `dev` 分支。請務必常常同步你的分支，避免日後產生衝突 (Conflict)。
```bash
git checkout dev
git pull origin dev           # 把遠端最新開發進度拉下來
git checkout feature/你的功能 # 切回你自己的分支
git merge dev                 # 將最新的 dev 合併進你的分支
```

---

## 🚀 環境安裝與執行 (Getting Started)

*(待補充：前端與後端的環境建置指令，例如 npm install, python app.py 等，請各團隊在開發後補上。)*

### 前端環境
1. `cd frontend`
2. `(等待填寫：例如 npm install)`
3. `(等待填寫：例如 npm run dev)`

### 後端環境
1. `cd backend`
2. `(等待填寫：例如 pip install -r requirements.txt)`
3. `(等待填寫：例如 uvicorn main:app --reload)`
