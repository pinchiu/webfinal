## Why

建立一個專為台灣生物科技與生物資訊產業量身打造的人力資源平台。除了功能性的篩選與資訊整合外，本專案將引入 **Mistral AI 風格的視覺設計**，以極具歐式自信的暖金配色與強大排版，打造出具備專業感、權威感且令人印象深刻的「建築級」招募平台。

## What Changes

初始化專案的前後端基礎架構，並導入 Mistral Inspired 設計系統。
- 建立後端 PHP/SQL 環境以管理公司資料。
- 實作以暖色調 (Ivory/Amber/Orange) 為主、全銳利邊角、巨大字體的高質感前端介面。
- 實作基於地點與薪資的動態篩選與排序。

## Capabilities

### New Capabilities
- `mistral-ui-system`: 實作包含 82px 標題、金色陰影與暖奶油背景的視覺系統。
- `company-listing`: 提供支援篩選與排序的高質感公司列表。
- `company-profile`: 獨立的公司詳情頁面，展示完整產品與財務資訊。
- `data-api`: 基於 PHP 的資料連線與 JSON 輸出介面。

### Modified Capabilities
- 無

## Impact

- 影響範圍：新建 `frontend/` 與 `backend/` 專案目錄，包含自定義 CSS 變數系統。
- 外部依賴：PHP 運行環境。
- 資料來源：將 `final.md` 的表格資料轉化為 SQL 語法並匯入資料庫。
