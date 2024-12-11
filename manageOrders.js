// Import the product catalog from products.js (Ensure this is included at the top)
import { products } from './products.js';

// Track products and orders
let productCount = 0;
let currentOrderProducts = [];

const finalizedOrders = [
    // Existing finalized orders
];

// Function to populate finalized orders in the list
function populateFinalizedOrders() {
    const finalizedOrdersList = document.getElementById('finalizedOrders');
    finalizedOrdersList.innerHTML = '';

    finalizedOrders.forEach(order => {
        const newOrderElement = document.createElement('li');
        newOrderElement.classList.add('list-group-item');
        newOrderElement.innerHTML = ` 
            <strong>Order ID:</strong> ${order.orderId}, 
            <strong>Customer Name:</strong> ${order.customerName}, 
            <strong>Voucher Code:</strong> ${order.voucherCode}<br>
            <strong>Products:</strong>
            <ul>
                ${order.products
                .map(product => `<li>${product.product} - ${product.quantity} x ${product.price}</li>`)
                .join('')}
            </ul>
        `;
        finalizedOrdersList.appendChild(newOrderElement);
    });
}

// Call the function to populate finalized orders
populateFinalizedOrders();

// Add product to current order
document.getElementById('addProductButton').addEventListener('click', function () {
    const productId = document.getElementById('orderProductId').value;
    const quantity = document.getElementById('orderQuantity').value;

    if (!productId || !quantity) {
        alert('Please fill out all fields for the product.');
        return;
    }

    const product = products[productId];

    if (!product) {
        alert('Invalid product ID');
        return;
    }

    productCount++;

    // Add product to table
    const productTable = document.getElementById('currentOrderProducts');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${productCount}</td>
        <td>${product.name}</td>
        <td>${quantity}</td>
        <td>
            <button class="btn btn-danger btn-sm deleteProductButton">Delete</button>
        </td>
    `;
    productTable.appendChild(newRow);

    // Add product to array with name and price
    currentOrderProducts.push({
        productId,
        productName: product.name,
        quantity,
        price: product.price
    });

    // Clear inputs
    document.getElementById('orderProductId').value = '';
    document.getElementById('orderQuantity').value = '';
});

// Handle deleting a product
document.getElementById('currentOrderProducts').addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteProductButton')) {
        const row = event.target.closest('tr');
        const productId = row.children[0].textContent;

        // Remove product from array
        currentOrderProducts = currentOrderProducts.filter(product => product.productId !== productId);

        // Remove row from table
        row.remove();
    }
});

// Submit the order
document.getElementById('submitOrderButton').addEventListener('click', function () {
    const orderId = document.getElementById('orderId').value;
    const customerName = document.getElementById('customerName').value;
    const voucherCode = document.getElementById('voucherCode').value;

    if (!orderId || !customerName || currentOrderProducts.length === 0) {
        alert('Please fill out the order details and add at least one product.');
        return;
    }

    // Finalize order
    const newOrder = {
        orderId,
        customerName,
        voucherCode,
        products: currentOrderProducts.map(product => ({
            product: product.productName,
            quantity: product.quantity,
            price: product.price
        }))
    };
    finalizedOrders.push(newOrder);

    // Display finalized order
    const orderList = document.getElementById('finalizedOrders');
    const newOrderElement = document.createElement('li');
    newOrderElement.classList.add('list-group-item');
    newOrderElement.innerHTML = `
        <strong>Order ID:</strong> ${orderId}, 
        <strong>Customer Name:</strong> ${customerName}, 
        <strong>Voucher Code:</strong> ${voucherCode}<br>
        <strong>Products:</strong>
        <ul>
            ${currentOrderProducts
            .map(product => `<li>${product.productName} - ${product.quantity} x ${product.price}</li>`)
            .join('')}
        </ul>
    `;
    orderList.appendChild(newOrderElement);

    // Clear the form and products table
    document.getElementById('orderForm').reset();
    document.getElementById('currentOrderProducts').innerHTML = '';
    productCount = 0;
    currentOrderProducts = [];
});
