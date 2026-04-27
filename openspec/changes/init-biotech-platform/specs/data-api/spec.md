## ADDED Requirements

### Requirement: 資料讀取 API
後端必須提供 RESTful API 以供前端獲取資料。

#### Scenario: 獲取公司列表 API
- **WHEN** 發送 `GET /api/companies` 請求時
- **THEN** 後端應回傳包含所有公司資料的 JSON 陣列

### Requirement: 單一公司資料 API
後端必須支援透過 ID 獲取特定公司資料。

#### Scenario: 獲取特定公司 API
- **WHEN** 發送 `GET /api/companies/{id}` 請求時
- **THEN** 後端應回傳該公司的詳細 JSON 資料
