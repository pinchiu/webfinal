## Why

建立一個專為台灣生物科技與生物資訊產業量身打造的人力資源平台，解決目前求職者難以快速根據地點、薪資與產業細分（如基因體、新藥研發）篩選目標公司的問題。目前資料散落在 `final.md`，需要轉化為可互動的 Web 應用程式。

## What Changes

初始化專案的前後端基礎架構，並實作基於 `final.md` 資料的初步公司列表與詳細頁面。
- 建立後端資料庫與 API 以管理公司資料。
- 建立前端介面，包含篩選、排序與響應式佈局。

## Capabilities

### New Capabilities
- `company-listing`: 提供所有生技公司的總覽列表，支援依據城市與薪資進行篩選與排序。
- `company-profile`: 為每家公司提供獨立的詳細頁面，展示產品資訊與財務/人資數據。
- `data-api`: 提供後端 REST API，支援前端獲取及檢索公司資料。

### Modified Capabilities
- 無

## Impact

- 影響範圍：新建 `frontend/` (存放 HTML/CSS/JS) 與 `backend/` (存放 PHP 邏輯) 專案目錄。
- 外部依賴：PHP 環境 (如 XAMPP, WAMP, 或本地 PHP/MySQL 伺服器)。
- 資料來源：將 `final.md` 的表格資料轉化為 SQL 語法並匯入資料庫。
