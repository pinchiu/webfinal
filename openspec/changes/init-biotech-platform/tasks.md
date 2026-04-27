## 1. 資料庫建置 (Database Setup)

- [ ] 1.1 撰寫 `backend/schema.sql`：建立 `companies` 資料表，包含 `design.md` 定義的欄位
- [ ] 1.2 撰寫 `backend/seed.sql`：將 `final.md` 的資料轉化為 SQL INSERT 語法
- [ ] 1.3 建立 `backend/db.php`：使用 PDO 或 MySQLi 實作基礎連線類別

## 2. API 開發 (Backend API)

- [ ] 2.1 實作 `backend/api/get_companies.php`：
    - 支援 `search` 關鍵字篩選
    - 支援 `location` 多選篩選
    - 支援 `salary_sort` (ASC/DESC)
    - 輸出 JSON 格式
- [ ] 2.2 實作 `backend/api/get_company.php?id=X`：輸出單一公司詳情

## 3. 前端動態化 (Frontend Dynamism)

- [ ] 3.1 在 `frontend/index.html` 中移除靜態測試卡片
- [ ] 3.2 在 `frontend/script.js` 實作 `fetchCompanies()`：
    - 使用 Fetch API 呼叫 PHP 後端
    - 使用 Template Literals 動態渲染 Mistral 風格的公司卡片
- [ ] 3.3 實作篩選器事件監聽 (Event Listeners)：當使用者點擊 Location 或 Apply Filters 時重新抓取資料

## 4. 頁面整合與優化 (Optimization)

- [ ] 4.1 實作響應式導覽列切換
- [ ] 4.2 確保 `shadow-golden-float` 在不同背景下的呈現效果
- [ ] 4.3 增加載入中狀態 (Loading Skeleton)
