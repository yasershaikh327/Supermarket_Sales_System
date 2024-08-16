<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Form</title>
  <link rel="stylesheet" href="../Css/style2.css">
  <script src="../js/data.js" defer></script>
</head>
<body>
  <section style="width: 75vh;">
    <div class="wrapper">
      <form id="dataForm" >
        <h2>Data Form</h2>
        <div class="input-field">
          <input type="date" name="sale_date" required>
        </div>
        <div class="input-field">
          <input type="number" onchange="showAverage()" name="total_sales_amt" id="total_sales_amt" pattern="\d+(\.\d{1,2})?" title="Please enter a valid decimal number" required>
          <label>Enter Total Sales Amount</label>
        </div>
        <div class="input-field">
          <input type="number" onchange="showAverage()" name="total_sales_count" id="total_sales_count" required>
          <label>Enter Total Sales Count</label>
        </div>
        <div class="input-field">
          <input type="text" id="avg" readonly>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>

  <div class="wrapper" style="height: 66vh; overflow-y: scroll;">
    <form id="editForm">
    <button onclick="window.location.href='../Html/option.html'"  type="button" style="border:3px solid green;width: max-content">Back</button>
      <h2>Edit Form</h2>
      <table>
        <thead>
          <tr>
            <th>Sales Date</th>
            <th>Total Sales Amount</th>
            <th>Total Sales Count</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody id="salesTableBody">
          <?php include '../Php/getSalesData.php'; ?>
        </tbody>
      </table>
    </form>
  </div>
</body>
</html>
