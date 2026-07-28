// =============================================
// DROPX - Main Application Script
// =============================================

// =============================================
// DOM REFERENCES
// =============================================
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const priceDisplay = document.getElementById('priceDisplay');
const sortFilter = document.getElementById('sortFilter');
const activeFilters = document.getElementById('activeFilters');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');
const checkoutForm = document.getElementById('checkoutForm');
const toastContainer = document.getElementById('toastContainer');

// Countdown elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownStatus = document.getElementById('countdownStatus');
const navTimer = document.getElementById('navTimer');

// =============================================
// COUNTDOWN TIMER
// =============================================
let countdownInterval;

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            navTimer.textContent = '00:00:00';
            
            if (countdownStatus) {
                countdownStatus.innerHTML = '<span style="color:#ff4444;">● DROP ENDED</span>';
            }
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hh = String(hours).padStart(2, '0');
        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');

        hoursEl.textContent = hh;
        minutesEl.textContent = mm;
        secondsEl.textContent = ss;
        navTimer.textContent = `${hh}:${mm}:${ss}`;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown(DROP_INFO.endDate);

// =============================================
// CART FUNCTIONS
// =============================================
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('dropx_cart')) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('dropx_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    const currentQty = cartItem ? cartItem.qty : 0;
    
    if (currentQty >= product.stock) {
        showToast('Cannot add more — stock limit reached!', 'warning');
        return;
    }
    
    if (cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }
    
    saveCart(cart);
    renderCart();
    renderProducts(getFilteredProducts());
    showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    renderProducts(getFilteredProducts());
}

function updateCartQty(productId, delta) {
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!cartItem || !product) return;
    
    const newQty = cartItem.qty + delta;
    
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQty > product.stock) {
        showToast('Cannot exceed available stock!', 'warning');
        return;
    }
    
    cartItem.qty = newQty;
    saveCart(cart);
    renderCart();
    renderProducts(getFilteredProducts());
}

function getCartTotal() {
    return getCart().reduce((total, item) => total + (item.price * item.qty), 0);
}

function getCartCount() {
    return getCart().reduce((count, item) => count + item.qty, 0);
}

function renderCart() {
    const cart = getCart();
    const total = getCartTotal();
    const count = getCartCount();
    
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
    cartTotal.textContent = '₨' + total.toLocaleString();
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.classList.remove('d-none');
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.classList.add('d-none');
        cartFooter.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">₨${(item.price * item.qty).toLocaleString()}</p>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                        <button class="remove-btn ms-2" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// =============================================
// PRODUCT RENDERING
// =============================================
function getFilteredProducts() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    const sort = sortFilter.value;
    
    let filtered = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                             product.description.toLowerCase().includes(searchQuery) ||
                             product.colorway.toLowerCase().includes(searchQuery);
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = product.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    switch(sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    return filtered;
}

function renderProducts(products) {
    resultsCount.textContent = products.length;
    
    if (products.length === 0) {
        productGrid.innerHTML = '';
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
        
        productGrid.innerHTML = products.map(product => {
            const cart = getCart();
            const cartItem = cart.find(item => item.id === product.id);
            const cartQty = cartItem ? cartItem.qty : 0;
            const availableStock = product.stock - cartQty;
            const isSoldOut = availableStock <= 0;
            
            let stockBadgeClass = 'stock-low';
            let stockText = `Only ${availableStock} left`;
            
            if (isSoldOut) {
                stockBadgeClass = 'stock-out';
                stockText = 'Sold Out';
            } else if (availableStock <= 2) {
                stockBadgeClass = 'stock-critical';
                stockText = `Only ${availableStock} left!`;
            }
            
            return `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="product-card">
                        <div class="product-image-wrapper" onclick="openProductModal(${product.id})">
                            <img src="${product.image}" alt="${product.name}" class="product-image" 
                                 onerror="this.src='https://via.placeholder.com/400x400/161616/666666?text=DROPX'">
                            ${availableStock <= 5 ? `<span class="product-stock-badge ${stockBadgeClass}">${stockText}</span>` : ''}
                            <span class="product-rating">
                                <i class="bi bi-star-fill"></i> ${product.rating}
                            </span>
                        </div>
                        <div class="product-body">
                            <span class="product-category">${product.category}</span>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-colorway">${product.colorway}</p>
                            <div class="product-price">
                                <span class="currency">₨</span> ${product.price.toLocaleString()}
                            </div>
                            <button class="add-to-cart-btn ${isSoldOut ? 'sold-out' : ''}" 
                                    ${isSoldOut ? 'disabled' : ''}
                                    onclick="addToCart(${product.id})">
                                ${isSoldOut ? 'SOLD OUT' : '<i class="bi bi-bag-plus"></i> Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateActiveFilters();
}

// =============================================
// FILTER FUNCTIONS
// =============================================
function updateActiveFilters() {
    const searchQuery = searchInput.value.trim();
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    
    let tags = [];
    
    if (searchQuery) tags.push({ label: `Search: "${searchQuery}"`, clear: () => { searchInput.value = ''; applyFilters(); } });
    if (category !== 'all') tags.push({ label: `Category: ${category}`, clear: () => { categoryFilter.value = 'all'; applyFilters(); } });
    if (maxPrice < 15000) tags.push({ label: `Max: ₨${maxPrice.toLocaleString()}`, clear: () => { priceFilter.value = 15000; priceDisplay.textContent = '₨15,000'; applyFilters(); } });
    
    activeFilters.innerHTML = tags.map(tag => `
        <span class="filter-tag">
            ${tag.label} <i class="bi bi-x"></i>
        </span>
    `).join('');
    
    activeFilters.querySelectorAll('.filter-tag').forEach((tag, i) => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            tags[i].clear();
        });
    });
}

function applyFilters() {
    renderProducts(getFilteredProducts());
}

// =============================================
// PRODUCT MODAL
// =============================================
function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const cart = getCart();
    const cartItem = cart.find(item => item.id === productId);
    const cartQty = cartItem ? cartItem.qty : 0;
    const availableStock = product.stock - cartQty;
    const isSoldOut = availableStock <= 0;
    
    const modalBody = document.getElementById('productModalBody');
    
    modalBody.innerHTML = `
        <div class="product-modal-body">
            <img src="${product.image}" alt="${product.name}" class="product-modal-image"
                 onerror="this.src='https://via.placeholder.com/600x400/161616/666666?text=DROPX'">
            <span class="product-modal-category">${product.category}</span>
            <h2 class="product-modal-name">${product.name}</h2>
            <p class="product-modal-colorway">${product.colorway}</p>
            <p class="product-modal-price">₨${product.price.toLocaleString()}</p>
            <p class="product-modal-desc">${product.description}</p>
            <p class="product-modal-stock ${availableStock <= 2 && !isSoldOut ? 'text-warning' : ''} ${isSoldOut ? 'text-muted' : ''}">
                ${isSoldOut ? '<i class="bi bi-x-circle text-danger"></i> Sold Out' : 
                  availableStock <= 2 ? `<i class="bi bi-exclamation-triangle text-warning"></i> Only ${availableStock} left!` :
                  `<i class="bi bi-check-circle text-success"></i> ${availableStock} in stock`}
            </p>
            <button class="btn btn-primary-custom btn-lg w-100" ${isSoldOut ? 'disabled' : ''} 
                    onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();">
                ${isSoldOut ? 'SOLD OUT' : '<i class="bi bi-bag-plus me-2"></i> Add to Cart — ₨' + product.price.toLocaleString()}
            </button>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// =============================================
// CHECKOUT
// =============================================
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    
    localStorage.removeItem('dropx_cart');
    renderCart();
    renderProducts(getFilteredProducts());
    this.reset();
    this.classList.remove('was-validated');
    
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    showToast('Order placed successfully! 🎉', 'success');
});

// =============================================
// TOAST NOTIFICATIONS
// =============================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = message;
    toast.style.borderColor = type === 'warning' ? 'var(--warning)' : 'var(--accent)';
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// =============================================
// EVENT LISTENERS
// =============================================
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);

priceFilter.addEventListener('input', () => {
    priceDisplay.textContent = '₨' + parseInt(priceFilter.value).toLocaleString();
    applyFilters();
});

document.getElementById('clearFilters')?.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'all';
    priceFilter.value = 15000;
    priceDisplay.textContent = '₨15,000';
    sortFilter.value = 'default';
    applyFilters();
});

// =============================================
// SMOOTH SCROLL WITH OFFSET FOR NAVBAR
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// INITIALIZATION
// =============================================
renderProducts(getFilteredProducts());
renderCart();

console.log('%c🔥 DROPX %c| %cLimited Drop Storefront Ready',
    'font-weight:900; font-size:1.1em; color:#00ff88;',
    '',
    'color:#999;');