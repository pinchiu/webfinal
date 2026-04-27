## Context

本專案處於啟動階段。視覺風格全面採用 **Mistral AI 啟發的設計系統 (Mistral-inspired Design System)**。
目前已將原型拆分為 `index.html`, `style.css`, 與 `script.js`，作為開發基礎。

## Goals / Non-Goals

**Goals:**
- 初始化前後端開發環境（PHP/SQL/HTML/CSS/JS）。
- 實作 Mistral 視覺風格：暖色系配色、大型粗獷排版 (82px Display)、銳利幾何形狀 (0px Border Radius)、金色陰影。
- 整合 `final.md` 資料至 MySQL 資料庫。
- 實作具備動態篩選功能的生物科技公司目錄。

## Design System Implementation

### 1. 核心檔案結構
- `frontend/index.html`: 語義化 HTML5 結構，整合 Google Fonts (Work Sans) 與 Material Symbols。
- `frontend/style.css`: 自定義 CSS 系統，包含色彩變數、排版系統與元件樣式。
- `frontend/app.js`: 前端邏輯核心，處理資料抓取、篩選與動態渲染。

### 2. 色彩規範 (CSS Variables)
定義於 `:root`：
- `--primary`: `#fa520f` (Mistral Orange)
- `--secondary`: `#ffa110` (Sunshine 700)
- `--background`: `#fffaeb` (Warm Ivory)
- `--surface`: `#fff0c2` (Cream)
- `--text-main`: `#1f1f1f` (Mistral Black)

### 3. 排版層級 (CSS Classes)
- **Hero Title**: `.hero-title` (82px / LH 1.0 / tracking -2px / 900 weight)
- **Card Title**: `.card-title` (30px / 700 weight)
- **Section Heading**: 自定義內聯樣式或特定區塊 Class (56px)

### 4. 視覺元件規格
- **Shadows**: `shadow-golden-float` (三層級聯金色陰影，模擬光影漂浮感)。
- **Gradient**: `.block-gradient` (從 Bright Yellow 到 Mistral Orange 的四段式線性漸層)。
- **Borders**: 全域 `border-radius: 0`，強調建築感的銳利線條。

## Technical Decisions

- **後端技術**: 使用 PHP 8.x 處理 API 請求。
- **前端技術**: 
    - 使用 **Vanilla CSS (原生 CSS)** 作為主要樣式框架，不使用 Tailwind。
    - 使用 Vanilla JavaScript 處理動態篩選與資料呈現。
- **資料庫**: MySQL，表格名 `companies`。

### 5. 資料整合與異步加載

為了提升系統的可維護性與動態性，前端已實作以下機制：
- **資料非同步化**：移除前端硬編碼的公司資料，改由 `loadData()` 函式透過 Fetch API 處理。
- **API 對接預留**：統一預設請求路徑為 `../backend/api/get_companies.php`，確保前後端分離開發。
- **錯誤處理機制**：實作容錯邏輯，若後端 API 尚未建立或連線失敗，網頁將顯示友善提示而非失效，提升使用者體驗。
- **初始化流程**：網頁載入時優先執行 `loadData()`，確保資料獲取成功後才觸發畫面的初次渲染與事件監聽設定。

## 資料結構 (Schema)

| 欄位 | 類型 | 說明 |
| :--- | :--- | :--- |
| id | INT AI PK | 唯一識別碼 |
| name | VARCHAR | 公司名稱 |
| category | VARCHAR | 產業類別 (如：Next-Gen Sequencing) |
| location | VARCHAR | 地點 (Taipei, Hsinchu 等) |
| description | TEXT | 公司簡介 |
| salary_benchmark | INT | 平均薪資基準 (用於排序) |
| icon_type | VARCHAR | Material Icon 名稱 |
| contact_info | JSON | 包含電話、信箱、網站的物件 |
