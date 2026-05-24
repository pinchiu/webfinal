<?php
class Company {
    private $conn;
    private $tableName = "[dbo].[companies]";

    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Search companies by name, products, or category.
     * @param string $search
     * @return array
     * @throws Exception
     */
    public function search($search = '') {
        if ($search !== '') {
            $tsql = "SELECT * FROM {$this->tableName} WHERE name LIKE ? OR products LIKE ? OR category LIKE ?";
            $params = array("%$search%", "%$search%", "%$search%");
            $getResults = sqlsrv_query($this->conn, $tsql, $params);
        } else {
            $tsql = "SELECT * FROM {$this->tableName}";
            $getResults = sqlsrv_query($this->conn, $tsql);
        }

        if ($getResults === false) {
            throw new Exception(json_encode(sqlsrv_errors()));
        }

        $companies = array();
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
            $companies[] = array_change_key_case($row, CASE_LOWER);
        }

        sqlsrv_free_stmt($getResults);
        return $companies;
    }
}
?>
