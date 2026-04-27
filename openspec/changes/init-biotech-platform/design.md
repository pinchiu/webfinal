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
- `frontend/style.css`: 自定義 CSS，包含 `.block-gradient` 漸層與全域銳利邊角強制設定 (`border-radius: 0 !important`)。
- `frontend/script.js`: **Tailwind CSS 運行時配置 (Runtime Config)**，定義自定義顏色、間距、排版與陰影。

### 2. 色彩規範 (Tailwind Colors)
- **Primary**: `mistral-orange` (#fa520f), `mistral-flame` (#fb6424)
- **Background**: `warm-ivory` (#fffaeb), `cream` (#fff0c2), `surface` (#fff8f6)
- **Accent**: `sunshine-700` (#ffa110), `bright-yellow` (#ffd900)
- **Neutral**: `mistral-black` (#1f1f1f)

### 3. 排版層級 (Tailwind Typography)
- **Display Hero**: `text-display-hero` (82px / LH 1.0 / tracking -2.05px / 900 weight)
- **Section Heading**: `text-section-heading` (56px / LH 0.95 / 900 weight)
- **Card Title**: `text-card-title` (30px / LH 1.20 / 700 weight)
- **Body**: `text-body` (16px / LH 1.50)

### 4. 視覺元件規格
- **Shadows**: `shadow-golden-float` (三層級聯金色陰影，模擬光影漂浮感)。
- **Gradient**: `.block-gradient` (從 Bright Yellow 到 Mistral Orange 的四段式線性漸層)。
- **Borders**: 全域 `border-radius: 0`，強調建築感的銳利線條。

## Technical Decisions

- **後端技術**: 使用 PHP 8.x 處理 API 請求與頁面渲染。
- **前端技術**: 
    - 使用 Tailwind CSS CDN 作為主要樣式框架。
    - 使用 Vanilla JavaScript 處理動態篩選與資料呈現。
- **資料庫**: MySQL，表格名 `companies`。

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
