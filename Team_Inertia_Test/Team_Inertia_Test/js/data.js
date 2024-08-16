function showAverage() {
  const amount = document.getElementById("total_sales_amt").value;
  const count = document.getElementById("total_sales_count").value;

  if (amount && count) {
    const average = (parseFloat(amount) / parseInt(count)).toFixed(2);
    document.getElementById("avg").value = average;
  } else {
    document.getElementById("avg").value = "N/A";
  }
}

function editRow(button) {
  const row = button.closest('tr');
  const saleDate = row.querySelector('.sale_date');
  const totalSalesAmt = row.querySelector('.total_sales_amt');
  const totalSalesCount = row.querySelector('.total_sales_count');

  // Make fields editable
  saleDate.innerHTML = `<input type="date" value="${saleDate.textContent}" class="sale_date_input">`;
  totalSalesAmt.innerHTML = `<input type="number" value="${totalSalesAmt.textContent}" class="total_sales_amt_input">`;
  totalSalesCount.innerHTML = `<input type="number" value="${totalSalesCount.textContent}" class="total_sales_count_input">`;

  // Change the Edit button to Update
  button.textContent = 'Update';
  button.style.backgroundColor = 'green';
  button.onclick = function() { updateRow(row) };
}


function updateRow(row) {
  const id = row.getAttribute('data-id');
  const saleDate = row.querySelector('.sale_date_input').value;
  const totalSalesAmt = row.querySelector('.total_sales_amt_input').value;
  const totalSalesCount = row.querySelector('.total_sales_count_input').value;

  // Send updated data to the server
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `../Php/Api.php?id=${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Update the table with new values
      row.querySelector('.sale_date').innerHTML = saleDate;
      row.querySelector('.total_sales_amt').innerHTML = totalSalesAmt;
      row.querySelector('.total_sales_count').innerHTML = totalSalesCount;

      // Change the Update button back to Edit
      const updateButton = row.querySelector('.edit-btn');
      updateButton.textContent = 'Edit';
      updateButton.style.backgroundColor = 'orange';
      updateButton.onclick = function() { editRow(updateButton) };

      // Reload the page to see the updated list
      location.reload();
    }
  };
  xhr.onerror = function () {
    alert("An error occurred during the transaction.");
  };
  xhr.send(`sale_date=${saleDate}&total_sales_amt=${totalSalesAmt}&total_sales_count=${totalSalesCount}`);
}



//Delete Data From Form
function deleteRecord(id) {
  if (confirm("Are you sure you want to delete this record?")) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `../Php/Api.php?id=${id}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        location.reload(); // Reload the page to see the updated list
      }
    };
    xhr.send();
  }
}


//Add Data to Form
// Function to handle form submission using JavaScript
document.getElementById("dataForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  const saleDate = document.querySelector("input[name='sale_date']").value;
  const totalSalesAmt = document.querySelector("input[name='total_sales_amt']").value;
  const totalSalesCount = document.querySelector("input[name='total_sales_count']").value;

  // Prepare data to send
  const data = `sale_date=${encodeURIComponent(saleDate)}&total_sales_amt=${encodeURIComponent(totalSalesAmt)}&total_sales_count=${encodeURIComponent(totalSalesCount)}`;

  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../Php/Api.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Handle the response from the server
  xhr.onload = function() {
    if (xhr.status === 200) {
      alert("Record added successfully");
      document.getElementById("dataForm").reset(); // Reset the form after submission
      document.getElementById("avg").value = ""; // Clear the average field
      location.reload(); // Reload the page to see the updated list
    } else {
      alert("Failed to add record");
    }
  };

  // Send the data
  xhr.send(data);
});