import { products } from './products.js';  // Importing the products data

// Function to populate the products table
function populateProductsTable() {
  const tableBody = document.querySelector('#productTable tbody');
  tableBody.innerHTML = '';  // Clear existing rows

  for (const [productId, productData] of Object.entries(products)) {
    const row = document.createElement('tr');

    row.innerHTML = `
            <td>${productId}</td>
            <td>${productData.name}</td>
            <td>${productData.size}</td>
            <td>${productData.color}</td>
            <td>${productData.category}</td>
            <td>${productData.stock}</td>
            <td>${productData.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-product" data-id="${productId}">Edit</button>
                <button class="btn btn-danger btn-sm delete-product" data-id="${productId}">Delete</button>
            </td>
        `;

    tableBody.appendChild(row);
  }
}

// Function to open the edit modal and pre-fill the form with existing product data
function openEditModal(event) {
  const productId = event.target.getAttribute('data-id');
  const product = products[productId];

  // Pre-fill the form fields
  document.getElementById('editProductId').value = productId;
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductSize').value = product.size;
  document.getElementById('editProductColor').value = product.color;
  document.getElementById('editProductCategory').value = product.category;
  document.getElementById('editProductStock').value = product.stock;
  document.getElementById('editProductPrice').value = product.price;

  // Show the modal
  const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
  editModal.show();
}

// Function to save the changes after editing
function saveProductChanges() {
  const productId = document.getElementById('editProductId').value;
  const productName = document.getElementById('editProductName').value.trim();
  const productSize = document.getElementById('editProductSize').value;
  const productColor = document.getElementById('editProductColor').value.trim();
  const productCategory = document.getElementById('editProductCategory').value;
  const productStock = parseInt(document.getElementById('editProductStock').value, 10);
  const productPrice = parseFloat(document.getElementById('editProductPrice').value);

  // Validation
  if (!productName || !productSize || !productColor || !productCategory || isNaN(productStock) || isNaN(productPrice)) {
    alert('Please fill in all fields correctly.');
    return;
  }

  // Update the product data
  products[productId] = {
    name: productName,
    size: productSize,
    color: productColor,
    category: productCategory,
    stock: productStock,
    price: productPrice
  };

  // Close the modal
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
  editModal.hide();

  // Re-populate the table with updated data
  populateProductsTable();

  alert('Product updated successfully!');
}

// Function to delete a product
function deleteProduct(event) {
  const productId = event.target.getAttribute('data-id');
  if (confirm(`Are you sure you want to delete product ${productId}?`)) {
    delete products[productId];
    populateProductsTable(); // Re-populate the table after deletion
    alert('Product deleted successfully!');
  }
}

// Event listener for editing a product
document.querySelector('#productTable').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-product')) {
    openEditModal(event);
  } else if (event.target.classList.contains('delete-product')) {
    deleteProduct(event);
  }
});

// Event listener for saving changes to a product
document.getElementById('saveProductChanges').addEventListener('click', saveProductChanges);

// Initial population of the products table
populateProductsTable();
