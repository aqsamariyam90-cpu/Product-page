    const products = [
    {
        id: 1,
        title: "Headphones",
        price: 25,
        description: "Comfortable headphones with clear sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 40,
        description: "A stylish watch for everyday use.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        title: "Camera",
        price: 120,
        description: "Capture your favorite moments.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        id: 4,
        title: "Shoes",
        price: 55,
        description: "Comfortable shoes for daily wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 5,
        title: "Backpack",
        price: 30,
        description: "A useful bag for school and travel.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 6,
        title: "Sunglasses",
        price: 20,
        description: "Modern sunglasses for sunny days.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];
// Cart state
let cart = {};
// Select HTML elements
const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
// Display products
function showProducts() {
    products.forEach(function(product) {
        productList.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card product-card shadow-sm">
                    <img src="${product.image}" class="card-img-top"
                         alt="${product.title}">

                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>

                        <button class="btn btn-success w-100 add-btn"
                                data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}
// Add products to cart and handle quantity buttons
productList.addEventListener("click", function(event) {
    const button = event.target.closest(".add-btn");

    if (button) {
        const id = Number(button.dataset.id);

        if (cart[id]) {
            cart[id]++;
        } else {
            cart[id] = 1;
        }

        updateCart();
    }
});
// Display cart and calculate total
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    for (let id in cart) {
        const product = products.find(function(item) {
            return item.id === Number(id);
        });
        const quantity = cart[id];
        total += product.price * quantity;
        count += quantity;
        cartItems.innerHTML += `
            <div class="cart-row">
                <div>
                    <strong>${product.title}</strong>
                    <p class="mb-0">$${product.price.toFixed(2)} each</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="quantity-btn decrease-btn"
                            data-id="${id}">−</button>

                    <span>${quantity}</span>

                    <button class="quantity-btn increase-btn"
                            data-id="${id}">+</button>
                </div>
                <strong>$${(product.price * quantity).toFixed(2)}</strong>
            </div>
        `;
    }
    if (count === 0) {
        cartItems.textContent = "Your cart is empty.";
    }
    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}
// Increase or decrease product quantity
cartItems.addEventListener("click", function(event) {
    const button = event.target.closest(".quantity-btn");
    if (!button) {
        return;
    }
    const id = Number(button.dataset.id);
    if (button.classList.contains("increase-btn")) {
        cart[id]++;
    } else if (button.classList.contains("decrease-btn")) {
        cart[id]--;

        if (cart[id] === 0) {
            delete cart[id];
        }
    }
    updateCart();
});
// Run when page loads
showProducts();
updateCart();