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

### 1. 分支策略 (GitHub Flow)
為了保持開發流暢，專案採用簡化的 GitHub Flow：
*   **`main` (主分支)**：唯一的主要分支，隨時保持穩定、可部署的狀態。**禁止直接 Commit。**
*   **分支命名規範**：
    *   `feature/xxx`：開發新功能 (New feature)
    *   `fix/xxx`：修復錯誤 (Bug fix)
    *   `docs/xxx`：文件更新 (Documentation)
    *   `refactor/xxx`：程式碼重構 (Refactoring, 無功能增減)
    *   `style/xxx`：樣式調整 (CSS, 格式調整)


### 2. 本地開發流程 (Development Flow)

**步驟一：複製專案並切換到主分支**
```bash
git clone https://github.com/pinchiu/webfinal.git
cd webfinal
git checkout main
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
請使用 `類別(範圍): 具體描述` 的格式。
*   `feat(scope): ` - 新增功能。範例：`feat(backend): 實作 PHP 登入 API`
*   `fix(scope): ` - 修復 Bug。範例：`fix(frontend): 修正手機版導覽列無法點擊`
*   `docs: ` - 文件更新。範例：`docs: 更新 README 協作規範`
*   `style: ` - 樣式、格式修改。範例：`style: 調整卡片陰影顏色`
*   `refactor: ` - 程式碼重構。範例：`refactor(api): 優化資料庫查詢邏輯`

### 3. 如何發佈你的修改 (Pull Request, PR)

當你的功能開發完成，準備合併到團隊的 main 分支時：

1.  **推送到 GitHub 遠端：**
    ```bash
    git push origin feature/你的功能名稱
    ```
2.  **建立 Pull Request (PR)：**
    *   到 GitHub 專案頁面，點擊 **"Compare & pull request"**。
    *   設定來源分支為你的 `feature/xxx`，目標分支 (Base) 選擇為 **`main`**。
    *   在 PR 描述中，清楚寫下你完成了哪些功能、解決了什麼問題。
3.  **程式碼審查 (Code Review)：**
    *   請你的協作夥伴來檢查你的程式碼。
    *   如果有需要修改的地方，請在本地修改後再次 `git add` > `git commit` > `git push`，PR 會自動更新。
4.  **合併 (Merge)：**
    *   審查通過後，由夥伴點擊 "Merge pull request"，將你的程式碼合併進 `main` 分支。

### 4. 保持同步與開發循環 (Sync & Workflow)

為了確保你的開發基礎永遠是最新的，請養成以下習慣：

**情境 A：準備開始開發新功能時（保平安三步驟）**
1. **同步主線**：`git checkout main` -> `git pull origin main`
2. **切換分支**：`git checkout -b feature/我的新功能`
3. **開始開發**：此時你的基礎程式碼已包含夥伴的所有成果。

**情境 B：開發到一半，夥伴合併了新東西（中途同步）**
如果你在 `feature/xxx` 寫到一半需要夥伴剛合併的新功能：
1. **暫存進度**：`git add .` -> `git commit -m "feat: 暫存開發進度"`
2. **同步主線**：`git checkout main` -> `git pull origin main`
3. **合併回分支**：`git checkout feature/xxx` -> `git merge main`


```bash
git checkout main
git pull origin main
git branch -d feature/已完成的功能
```

**合併衝突處理 (Conflict)：**
若 `git merge main` 時發生衝突，請手動在編輯器中選擇保留的區塊，儲存後再次 `git add .` 並 `git commit`。


---

## 🚀 環境安裝與執行 (Getting Started)

本專案採用 PHP 後端與 Vanilla HTML/JS 前端，不需繁雜的編譯步驟。

### 前端環境 (Frontend)
前端使用原生 HTML, CSS 與 JavaScript，不依賴 npm。
1. `cd frontend`
2. 直接在瀏覽器中開啟 `index.html`，或使用 VS Code 的 **Live Server** 擴充功能開啟以獲得最佳預覽體驗。

### 後端環境 (Backend)
後端使用 PHP 提供 API 服務。
1. 請確保電腦已安裝 PHP 8.x 環境 (可使用 XAMPP, MAMP 或直接安裝 PHP)。
2. 啟動 PHP 內建伺服器：
   ```bash
   cd backend
   php -S localhost:8000
   ```
3. (後續補充) 匯入 `schema.sql` 與 `seed.sql` 至 MySQL 資料庫，並在 `db.php` 設定連線資訊。
