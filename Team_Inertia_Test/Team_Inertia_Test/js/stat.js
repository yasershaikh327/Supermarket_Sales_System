$(document).ready(function(){
    var ctx = document.getElementById('salesChart').getContext('2d');
    var salesChart;

    function fetchData(type) {
        $.ajax({
            url: '../Php/get_sales_data.php',
            type: 'GET',
            data: {type: type},
            dataType: 'json',
            success: function(data) {
                var labels = [];
                var total_sales_amt = [];
                var total_sales_count = [];
                var average_sale_amt = [];

                data.forEach(function(item) {
                    labels.push(item.date);
                    total_sales_amt.push(item.total_sales_amt);
                    total_sales_count.push(item.total_sales_count);
                    average_sale_amt.push(item.average_sale_amt);
                });

                if(salesChart) {
                    salesChart.destroy();
                }

                salesChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Sales Amount',
                                data: total_sales_amt,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                fill: false
                            },
                            {
                                label: 'Total Sales Count',
                                data: total_sales_count,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                fill: false
                            },
                            {
                                label: 'Average Sale Amount',
                                data: average_sale_amt,
                                borderColor: 'rgba(255, 206, 86, 1)',
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: type === 'day' ? 'Days' : 'Months'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Amount'
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    $('#dayView').click(function() {
        fetchData('day');
    });

    $('#monthView').click(function() {
        fetchData('month');
    });

    // Default view
    fetchData('day');
});