<?php
$mysqli = new mysqli("localhost", "root", "", "supermarket");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$type = $_GET['type']; // either 'day' or 'month'

if ($type == 'day') {
    $query = "SELECT DATE(sale_date) as date, SUM(total_sales_amt) as total_sales_amt, SUM(total_sales_count) as total_sales_count, SUM(total_sales_amt)/SUM(total_sales_count) as average_sale_amt FROM sales GROUP BY DATE(sale_date) ORDER BY sale_date ASC";
} else {
    $query = "SELECT DATE_FORMAT(sale_date, '%Y-%m') as date, SUM(total_sales_amt) as total_sales_amt, SUM(total_sales_count) as total_sales_count, SUM(total_sales_amt)/SUM(total_sales_count) as average_sale_amt FROM sales GROUP BY DATE_FORMAT(sale_date, '%Y-%m') ORDER BY sale_date ASC";
}

$result = $mysqli->query($query);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$mysqli->close();
?>
