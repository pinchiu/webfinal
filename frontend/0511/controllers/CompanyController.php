<?php
require_once __DIR__ . '/../models/Database.php';
require_once __DIR__ . '/../models/Company.php';

class CompanyController {
    /**
     * Handles the incoming HTTP request to search and get companies.
     */
    public function handleRequest() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");

        try {
            $database = new Database();
            $db = $database->getConnection();

            $company = new Company($db);
            $search = isset($_GET['q']) ? $_GET['q'] : '';

            $results = $company->search($search);
            echo json_encode($results);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("error" => $e->getMessage()));
        }
    }
}
?>
