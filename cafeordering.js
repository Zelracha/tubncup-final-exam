document.addEventListener('DOMContentLoaded', () => {
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartContainer = document.getElementById('cartContainer');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartList = document.querySelector('.cartList');

    let cart = [];

    // Open and Close Cart
    openCartBtn.addEventListener('click', () => {
        cartContainer.style.display = 'block';
    });

    closeCartBtn.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });

    // Add Product to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.closest('.card').querySelector('.card-title').textContent;
            const productPrice = button.closest('.card').querySelector('.card-text').textContent;

            // Add product to cart
            cart.push({ id: productId, name: productName, price: productPrice });

            updateCart();
        });
    });

    function updateCart() {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button class="btn btn-danger btn-sm remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });

        const removeButtons = cartList.querySelectorAll('.remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== productId);
                updateCart();
            });
        });
    }
});
