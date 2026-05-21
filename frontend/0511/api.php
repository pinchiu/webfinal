<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// SQL Server Connection Configuration
// Replace with your actual credentials
$serverName = "120.108.111.177,8080"; // or your server IP
$connectionOptions = array(
    "Database" => "114025001",        
    "Uid" => "s114025001",     
    "PWD" => "Change@1234",           
    "CharacterSet" => "UTF-8",
    "TrustServerCertificate" => true, 
    "Encrypt" => true                 
);
try {
    $conn = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn === false) {
        http_response_code(500);
        echo json_encode(array("error" => sqlsrv_errors()));
        exit;
    }

    $search = isset($_GET['q']) ? $_GET['q'] : '';

    if ($search !== '') {
        $tsql = "SELECT * FROM [dbo].[companies] WHERE name LIKE ? OR products LIKE ? OR category LIKE ?";
        $params = array("%$search%", "%$search%", "%$search%");
        $getResults = sqlsrv_query($conn, $tsql, $params);
    } else {
        $tsql = "SELECT * FROM [dbo].[companies]";
        $getResults = sqlsrv_query($conn, $tsql);
    }

    if ($getResults === false) {
        http_response_code(500);
        echo json_encode(array("error" => sqlsrv_errors()));
        exit;
    }

    $companies = array();
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $companies[] = array_change_key_case($row, CASE_LOWER);
    }

    echo json_encode($companies);

    sqlsrv_free_stmt($getResults);
    sqlsrv_close($conn);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}
?>
