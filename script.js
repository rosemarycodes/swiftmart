// ============ PRODUCT DATABASE (REALISTIC PRICES) ============
const products = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 29.99, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" },
    { id: 2, name: "Smart Watch", price: 49.99, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop" },
    { id: 3, name: "Bluetooth Speaker", price: 19.99, category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop" },
    // Fashion
    { id: 4, name: "Men's T-Shirt", price: 14.99, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop" },
    { id: 5, name: "Women's Dress", price: 24.99, category: "fashion", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=200&fit=crop" },
    { id: 6, name: "Sneakers", price: 39.99, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
    // Home & Living
    { id: 7, name: "Floor Lamp", price: 34.99, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop" },
    { id: 8, name: "Coffee Table", price: 79.99, category: "home", image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=300&h=200&fit=crop" },
    { id: 9, name: "Decorative Pillow", price: 12.99, category: "home", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=300&h=200&fit=crop" },
    // Beauty
    { id: 10, name: "Skincare Set", price: 22.99, category: "beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop" },
    { id: 11, name: "Perfume", price: 34.99, category: "beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop" },
    { id: 12, name: "Makeup Kit", price: 19.99, category: "beauty", image: "https://images.unsplash.com/photo-1596462502278-27bf7c1d7739?w=300&h=200&fit=crop" },
];

// ============ CURRENCY CONVERSION RATES ============
const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    NGN: 1300,
    KES: 135,
    ZAR: 18.5
};

const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    NGN: '₦',
    KES: 'KSh',
    ZAR: 'R'
};

let currentCurrency = 'USD';

// ============ DOM ELEMENTS ============
const grid = document.getElementById("productGrid");
const searchBar = document.getElementById("searchBar");
const currencySelector = document.getElementById("currencySelector");
const sidebarCurrency = document.getElementById("sidebarCurrency");
const categoryFilters = document.querySelectorAll(".filter-btn");
const sidebarFilters = document.querySelectorAll(".sidebar-filter");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarClose = document.getElementById("sidebarClose");

let currentCategory = "all";

// ============ SIDEBAR TOGGLE ============
function toggleSidebar() {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("open") ? "hidden" : "";
}

hamburgerBtn.addEventListener("click", toggleSidebar);
sidebarClose.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", toggleSidebar);

// ============ RENDER PRODUCTS ============
function renderProducts(category = "all", search = "") {
    let filtered = products;

    // Category filter
    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    // Search filter
    if (search.trim()) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="no-results">No products found 😕</p>`;
        return;
    }

    grid.innerHTML = filtered.map((p, index) => {
        const rate = exchangeRates[currentCurrency];
        const convertedPrice = p.price * rate;
        const symbol = currencySymbols[currentCurrency];
        const formattedPrice = convertedPrice.toFixed(2);
        
        // Hot badge for first 3 products
        const badge = index < 3 ? `<span class="badge">🔥 Hot</span>` : '';
        
        return `
            <div class="product-card">
                ${badge}
                <img src="${p.image}" alt="${p.name}" loading="lazy" />
                <h3>${p.name}</h3>
                <p class="price">${symbol}${formattedPrice}</p>
                <button onclick="orderProduct('${p.name}', '${symbol}${formattedPrice}')">
                    <i class="fab fa-whatsapp"></i> Order Now
                </button>
            </div>
        `;
    }).join("");
}

// ============ WHATSAPP ORDER ============
function orderProduct(name, price) {
    const phone = "2347034957341"; // REPLACE with client's number
    const message = `Hello! I want to order ${name} for ${price}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// ============ UPDATE CATEGORY ============
function setCategory(category, activeElement) {
    currentCategory = category;
    
    // Update main filters
    categoryFilters.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.filter-btn[data-category="${category}"]`)?.classList.add("active");
    
    // Update sidebar filters
    sidebarFilters.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.sidebar-filter[data-category="${category}"]`)?.classList.add("active");
    
    renderProducts(category, searchBar.value);
}

// ============ EVENT LISTENERS ============

// Main category filters
categoryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
        setCategory(btn.dataset.category, btn);
        // Close sidebar on mobile
        if (window.innerWidth <= 768) toggleSidebar();
    });
});

// Sidebar filters
sidebarFilters.forEach(btn => {
    btn.addEventListener("click", () => {
        setCategory(btn.dataset.category, btn);
        // Close sidebar on mobile
        if (window.innerWidth <= 768) toggleSidebar();
    });
});

// Currency switcher (main)
currencySelector.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    sidebarCurrency.value = e.target.value;
    renderProducts(currentCategory, searchBar.value);
});

// Currency switcher (sidebar)
sidebarCurrency.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    currencySelector.value = e.target.value;
    renderProducts(currentCategory, searchBar.value);
});

// Search bar
searchBar.addEventListener("input", (e) => {
    renderProducts(currentCategory, e.target.value);
});

// ============ INITIAL RENDER ============
renderProducts();
