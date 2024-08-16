<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("UPDATE `sales` SET `sale_date` = ?, `total_sales_amt` = ?, `total_sales_count` = ? WHERE `id` = ?");
            $stmt->execute([$_POST['sale_date'], $_POST['total_sales_amt'], $_POST['total_sales_count'], $id]);
            echo json_encode(['id' => $id, 'message' => 'Record updated successfully']);
        } else {
            $stmt = $conn->prepare("INSERT INTO `sales` (`sale_date`, `total_sales_amt`, `total_sales_count`) VALUES (?, ?, ?)");
            $stmt->execute([$_POST['sale_date'], $_POST['total_sales_amt'], $_POST['total_sales_count']]);
            echo json_encode(['id' => $conn->lastInsertId(), 'message' => 'Record added successfully']);
        }
        header("Location: ../Php/data.php");
        break;

        case 'PUT':
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $stmt = $conn->prepare("UPDATE sales SET sale_date = ?, total_sales_amt = ?, total_sales_count = ? WHERE id = ?");
                $stmt->execute([$_PUT['sale_date'], $_PUT['total_sales_amt'], $_PUT['total_sales_count'], $id]);
                echo json_encode(['message' => 'Record updated successfully']);
            }
            break;    

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("DELETE FROM `sales` WHERE `id` = ?");
            $stmt->execute([$id]);
            echo json_encode(['id' => $id, 'message' => 'Record deleted successfully']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}
?>
