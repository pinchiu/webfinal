<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// SQL Server Connection Configuration
// Replace with your actual credentials
$serverName = "120.108.111.177,8080"; // or your server IP
$connectionOptions = array(
    "Database" => "school", 
    "Uid" => "s114025001",     
    "PWD" => "Change@1234",     
    "CharacterSet" => "UTF-8"
);

try {
    $conn = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn === false) {
        http_response_code(500);
        echo json_encode(array("error" => sqlsrv_errors()));
        exit;
    }

    $tsql = "SELECT * FROM [dbo].[companies]";
    $getResults = sqlsrv_query($conn, $tsql);

    if ($getResults === false) {
        http_response_code(500);
        echo json_encode(array("error" => sqlsrv_errors()));
        exit;
    }

    $companies = array();
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $companies[] = $row;
    }

    echo json_encode($companies);

    sqlsrv_free_stmt($getResults);
    sqlsrv_close($conn);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}
?>
