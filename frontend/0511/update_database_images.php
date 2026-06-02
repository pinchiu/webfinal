<?php
/**
 * 404 Biotech - 資料庫圖片欄位同步更新指令檔
 * 
 * 此腳本將連線至 SQL Server 資料庫：
 * 1. 檢查並新增 `image` 欄位（若不存在）。
 * 2. 批量將各生技公司的正確圖片路徑更新至資料庫中。
 */

require_once __DIR__ . '/models/Database.php';

// 設定所有企業名稱與照片相對路徑的對照表
$companyPhotoMap = array(
    '基龍米克斯' => 'public/images/companies/基龍米克斯.jpg',
    '行動基因' => 'public/images/companies/行動基因_1.jpg',
    '華聯生技' => 'public/images/companies/華聯生技_1.jpg',
    '麗寶生醫' => 'public/images/companies/麗寶生醫_1.jpg',
    '創源生技' => 'public/images/companies/創源生技_1_改訊連基因數位GGA.jpg',
    '精拓生技' => 'public/images/companies/精拓生技_1.jpg',
    '維致生醫' => 'public/images/companies/維致生醫_1.jpg',
    '藥華醫藥' => 'public/images/companies/藥華醫藥_1.webp',
    '中裕新藥' => 'public/images/companies/中裕新藥_1.jpg',
    '東洋藥品' => 'public/images/companies/東洋藥品_1.jpg',
    '浩鼎生技' => 'public/images/companies/浩鼎生技_1.jpg',
    '中天生技' => 'public/images/companies/中天生技_1.jpg',
    '逸達生技' => 'public/images/companies/逸達生技_1.jpg',
    '美時化學' => 'public/images/companies/美時化學-1.jpg',
    '太景生技' => 'public/images/companies/太景生技_1.png',
    '亞諾法' => 'public/images/companies/亞諾法_1.jpg',
    '漢康生醫' => 'public/images/companies/漢康生醫_1.png',
    '全福生技' => 'public/images/companies/全福生技_1.jpg',
    '醣基生醫' => 'public/images/companies/醣基生醫_1.webp',
    '旭富製藥' => 'public/images/companies/旭富製藥_1.jpg',
    '台康生技' => 'public/images/companies/台康生技_1.jpg',
    '保瑞藥業' => 'public/images/companies/保瑞藥業_1.jpg',
    '永昕生物' => 'public/images/companies/永昕生物_1.jpg',
    '台灣神隆' => 'public/images/companies/台灣神隆_1.jpg',
    '台灣生物醫藥製造' => 'public/images/companies/台灣生物醫藥製造_1.png',
    '喜康生技' => 'public/images/companies/喜康生技_1.jpg',
    '安美得' => 'public/images/companies/安美得_1.png',
    '訊聯生技' => 'public/images/companies/訊聯生技_1.jpg',
    '亞果生醫' => 'public/images/companies/亞果生醫_1.jpg',
    '基亞生技' => 'public/images/companies/基亞生技-基亞生物_1.png',
    '和訊生技' => 'public/images/companies/和訊生技_1.png',
    '台安生技' => 'public/images/companies/台安生技_1.jpg',
    '國光生技' => 'public/images/companies/國光生技_1.jpg',
    '高端疫苗' => 'public/images/companies/高端疫苗_1.webp',
    '普生' => 'public/images/companies/普生_1.png',
    '光鼎生技' => 'public/images/companies/光鼎生技_1.jpg',
    '立景生技' => 'public/images/companies/立景生技_1.jpg',
    '國鼎生技' => 'public/images/companies/國鼎生技_1.jpg',
    '創益生技' => 'public/images/companies/創益生技_1.jpg'
);

try {
    echo "==================================================\n";
    echo "1. 開始連線至 SQL Server 資料庫...\n";
    $dbClass = new Database();
    $conn = $dbClass->getConnection();
    
    if ($conn === false) {
        throw new Exception("連線失敗！請確認 VPN 是否已開啟且資料庫伺服器正常運作。");
    }
    echo "   連線成功！\n\n";

    echo "2. 檢查 companies 資料表是否已存在 image 欄位...\n";
    // 檢查欄位是否存在
    $checkSql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                 WHERE TABLE_NAME = 'companies' AND COLUMN_NAME = 'image'";
    $checkStmt = sqlsrv_query($conn, $checkSql);
    
    if ($checkStmt === false) {
        throw new Exception("查詢資料表結構失敗：" . json_encode(sqlsrv_errors()));
    }

    $columnExists = false;
    if (sqlsrv_fetch_array($checkStmt, SQLSRV_FETCH_ASSOC)) {
        $columnExists = true;
    }
    sqlsrv_free_stmt($checkStmt);

    if (!$columnExists) {
        echo "   -> 欄位 [image] 不存在，開始執行 ALTER TABLE 新增欄位...\n";
        $alterSql = "ALTER TABLE [dbo].[companies] ADD [image] NVARCHAR(MAX) NULL";
        $alterStmt = sqlsrv_query($conn, $alterSql);
        if ($alterStmt === false) {
            throw new Exception("新增欄位失敗：" . json_encode(sqlsrv_errors()));
        }
        sqlsrv_free_stmt($alterStmt);
        echo "   -> 欄位 [image] 新增成功！\n\n";
    } else {
        echo "   -> 欄位 [image] 已存在，跳過新增步驟。\n\n";
    }

    echo "3. 開始批次更新各企業的照片路徑...\n";
    $updateSql = "UPDATE [dbo].[companies] SET [image] = ? WHERE [name] = ?";
    
    $successCount = 0;
    $failCount = 0;
    
    foreach ($companyPhotoMap as $companyName => $photoPath) {
        $params = array($photoPath, $companyName);
        $updateStmt = sqlsrv_query($conn, $updateSql, $params);
        
        if ($updateStmt === false) {
            echo "   [失敗] 無法更新企業: {$companyName} - " . json_encode(sqlsrv_errors()) . "\n";
            $failCount++;
        } else {
            // 檢查受影響的行數
            $rowsAffected = sqlsrv_rows_affected($updateStmt);
            if ($rowsAffected === 0) {
                echo "   [提示] 企業: {$companyName} 更新成功，但資料庫中找不到此名稱（0 行受影響）。\n";
            } else {
                echo "   [成功] 企業: {$companyName} -> {$photoPath} ({$rowsAffected} 行已更新)\n";
            }
            $successCount++;
            sqlsrv_free_stmt($updateStmt);
        }
    }

    echo "\n更新完成！\n";
    echo "總共處理: " . ($successCount + $failCount) . " 家企業\n";
    echo "成功更新: {$successCount} 家\n";
    echo "失敗更新: {$failCount} 家\n";
    echo "==================================================\n";

    sqlsrv_close($conn);

} catch (Exception $e) {
    echo "\n[錯誤] 執行過程中發生異常:\n";
    echo "訊息: " . $e->getMessage() . "\n";
    echo "==================================================\n";
}
?>
