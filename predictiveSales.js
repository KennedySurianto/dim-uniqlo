// Simulate sales data for the last 30 days
const historicalSalesData = [
    50, 60, 55, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 135, 125, 150, 160, 165, 170, 180, 185, 190, 200, 210, 220, 230, 240, 250
];
let salesChart = null;

// Basic linear regression model (simple increasing trend based on average of last few days)
function predictSalesLinear(daysAhead = 7) {
    const lastSales = historicalSalesData.slice(-7); // Get the last 7 days of data for prediction
    const totalSales = lastSales.reduce((acc, val) => acc + val, 0);
    const avgSales = totalSales / lastSales.length;

    let predictedSales = [];
    for (let i = 1; i <= daysAhead; i++) {
        // A simple model that assumes average sales increase gradually
        predictedSales.push(avgSales + i * 5); // Increase sales by 5 each day as a placeholder model
    }

    return predictedSales;
}

// Exponential smoothing model for sales prediction (basic implementation)
function predictSalesExponentialSmoothing(daysAhead = 7, alpha = 0.2) {
    const lastSales = historicalSalesData.slice(-7); // Get the last 7 days of data
    let smoothedValue = lastSales[0]; // Start with the first data point

    let predictedSales = [];
    for (let i = 1; i <= daysAhead; i++) {
        // Apply exponential smoothing formula: smoothedValue = alpha * currentValue + (1 - alpha) * previousSmoothedValue
        smoothedValue = alpha * lastSales[i % 7] + (1 - alpha) * smoothedValue; // Wrap around with modulus
        predictedSales.push(smoothedValue);
    }

    return predictedSales;
}

// Update the sales summary and graph
function updatePredictiveSales(predictor = 'linear', daysAhead = 7) {
    let predictedSales = [];
    const salesForecastHeading = document.getElementById('salesForecastHeading');

    // Predict sales based on the selected predictor model
    if (predictor === 'linear') {
        predictedSales = predictSalesLinear(daysAhead);
    } else if (predictor === 'exponential') {
        predictedSales = predictSalesExponentialSmoothing(daysAhead);
    }

    // Display sales summary
    const totalPredictedSales = predictedSales.reduce((acc, val) => acc + val, 0);
    const averagePredictedSales = totalPredictedSales / predictedSales.length;
    const salesSummary = document.getElementById('salesSummary');
    salesSummary.innerHTML = `
        Predicted Total Sales (Next ${daysAhead} Days): $${totalPredictedSales.toFixed(2)}<br>
        Predicted Average Daily Sales: $${averagePredictedSales.toFixed(2)}
    `;
    salesForecastHeading.innerText = `Sales Forecast (Next ${daysAhead} Days)`;

    // If a chart already exists, destroy it before creating a new one
    if (salesChart) {
        salesChart.destroy();
    }

    // Update the sales chart
    const ctx = document.getElementById('salesForecastChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: daysAhead }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Sales Forecast ($)',
                data: predictedSales,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

// Call the function to initially populate the predictive sales data
updatePredictiveSales();

// Optional: Update predictive model on form submission
document.getElementById('predictionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const daysAhead = parseInt(document.getElementById('days').value);
    const predictor = document.getElementById('predictor').value;

    // Update sales prediction based on selected settings
    // Call the updatePredictiveSales function with the selected model and prediction days
    updatePredictiveSales(predictor, daysAhead);
});
