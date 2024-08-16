<?php
require 'db.php';

$sql = "SELECT id, sale_date, total_sales_amt, total_sales_count FROM sales";
$stmt = $conn->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($rows) > 0) {
    foreach ($rows as $row) {
        echo "<tr data-id='{$row['id']}'>";
        echo "<td class='sale_date'>{$row['sale_date']}</td>";
        echo "<td class='total_sales_amt'>{$row['total_sales_amt']}</td>";
        echo "<td class='total_sales_count'>{$row['total_sales_count']}</td>";
        echo "<td><button type='button' class='edit-btn' style='background-color: orange; color: #fff;' onclick='editRow(this)'>Edit</button></td>";
        echo "<td><button type='button' class='delete-btn' style='background-color: red; color: #fff;' onclick='deleteRecord({$row['id']})'>Delete</button></td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='5'>No records found</td></tr>";
}
?>
