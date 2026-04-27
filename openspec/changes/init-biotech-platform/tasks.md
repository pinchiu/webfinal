## 1. 資料庫建置 (Database Setup)

- [ ] 1.1 設計 MySQL 資料庫 schema (schema.sql)，包含 `companies` 資料表
- [ ] 1.2 撰寫資料匯入腳本 (PHP 或 SQL)，將 `final.md` 資料轉為 SQL INSERT 語句
- [ ] 1.3 建立 `db_connect.php` 處理資料庫連線

## 2. 後端開發 (Backend Development)

- [ ] 2.1 建立 `api_get_companies.php`：讀取資料庫並輸出為 JSON
- [ ] 2.2 建立 `api_get_company_detail.php`：根據 ID 獲取特定公司詳細資料
- [ ] 2.3 確保 PHP API 支援篩選與排序參數

## 3. 前端開發 (Frontend Development)

- [ ] 3.1 建立 `index.html`：基礎網頁結構
- [ ] 3.2 建立 `style.css`：定義網頁視覺風格與響應式佈局
- [ ] 3.3 建立 `app.js`：
    - [ ] 使用 `fetch()` 呼叫 PHP API 獲取資料
    - [ ] 實作動態渲染列表 (DOM Manipulation)
    - [ ] 實作篩選與排序的互動邏輯
- [ ] 3.4 建立 `details.html`：顯示單一公司詳細資訊的頁面

## 4. 整合與測試 (Integration & Testing)

- [ ] 4.1 驗證前端能正確透過 PHP 抓取 SQL 資料庫內容
- [ ] 4.2 測試在不同瀏覽器與裝置下的相容性
