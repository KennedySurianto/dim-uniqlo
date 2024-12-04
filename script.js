// Order management (placeholder implementation)
const orderTableBody = document.getElementById('orderTableBody');
const orders = [
    { id: 'ORD001', customer: 'Alice', product: 'Shirt (M)', quantity: 2, totalPrice: 400, status: 'Pending' },
    { id: 'ORD002', customer: 'Bob', product: 'Bag', quantity: 1, totalPrice: 300, status: 'Shipped' },
];

// Render Orders in Table
function renderOrders() {
    orderTableBody.innerHTML = '';
    orders.forEach((order, index) => {
        orderTableBody.innerHTML += `
  <tr>
    <td>${index + 1}</td>
    <td>${order.id}</td>
    <td>${order.customer}</td>
    <td>${order.product}</td>
    <td>${order.quantity}</td>
    <td>${order.totalPrice}</td>
    <td>${order.status}</td>
    <td>
      <button class="btn btn-success btn-sm" onclick="markAsShipped(${index})">Mark as Shipped</button>
      <button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Delete</button>
    </td>
  </tr>
`;
    });
}

// Mark order as shipped
function markAsShipped(index) {
    orders[index].status = 'Shipped';
    renderOrders();
}

// Delete Order
function deleteOrder(index) {
    orders.splice(index, 1);
    renderOrders();
}

// Initial render
renderOrders();