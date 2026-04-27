## Context

本專案處於啟動階段。目前已有一份 `final.md` 包含初步的公司名單與開發需求。我們需要將其轉化為一個功能性的前後端 Web 應用程式。

## Goals / Non-Goals

**Goals:**
- 初始化前後端開發環境。
- 設計並實作 `companies` 資料庫 schema，完整涵蓋 `final.md` 中的所有欄位。
- 實作後端 API 以提供 CRUD 功能（首階段以 Read 為主）。
- 實作前端列表頁，包含基於地點與薪資的篩選與排序邏輯。
- 實作前端詳細頁。

**Non-Goals:**
- 用戶登入與權限管理（首階段為公開資訊平台）。
- 自動化即時股價抓取（首階段為手動/靜態資料）。
- 資料庫後台管理介面。

## Decisions

- **後端技術**: 使用 PHP。理由：傳統且穩定，適合處理伺服器端邏輯與 SQL 資料庫互動。
- **前端技術**: 使用原生 HTML5, CSS3, 與 JavaScript (Vanilla JS)。理由：符合開發者要求的傳統網站架構。
- **資料庫**: 使用 SQL 資料庫 (MySQL/MariaDB)。
- **資料結構**: 
    - `id`: Primary Key
    - `name`: 公司名稱
    - `category`: 產業類別 (基因體, 新藥研發等)
    - `address`: 完整地址
    - `city`: 從地址解析出的城市（用於篩選）
    - `products`: 產品服務
    - `contact_phone`: 聯絡電話
    - `contact_email`: 聯絡信箱
    - `contact_web`: 官方網站
    - `capital`: 資本額
    - `gross_margin`: 毛利
    - `profit`: 利潤
    - `stock_price`: 股價
    - `salary`: 薪資資訊

## Risks / Trade-offs

- **資料一致性**: 從 `final.md` 手動轉換資料到資料庫可能會有遺漏或格式不一。
- **SQLite 限制**: 隨者團隊擴大或資料量增加，未來可能需要遷移至 PostgreSQL。
