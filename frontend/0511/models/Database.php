<?php
class Database {
    private $serverName = "120.108.111.177,8080";
    private $connectionOptions = array(
        "Database" => "114025001",
        "Uid" => "s114025001",
        "PWD" => "Change@1234",
        "CharacterSet" => "UTF-8",
        "TrustServerCertificate" => true,
        "Encrypt" => true
    );
    private $conn = null;

    /**
     * Get the SQL Server database connection.
     * @return resource|false
     * @throws Exception
     */
    public function getConnection() {
        if ($this->conn === null) {
            try {
                $this->conn = sqlsrv_connect($this->serverName, $this->connectionOptions);
                if ($this->conn === false) {
                    throw new Exception(json_encode(sqlsrv_errors()));
                }
            } catch (Exception $e) {
                throw new Exception("Database connection failed: " . $e->getMessage());
            }
        }
        return $this->conn;
    }
}
?>
