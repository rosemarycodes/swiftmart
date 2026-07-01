// ============ PRODUCT DATABASE (Base prices in USD) ============
const products = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 49, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop" },
    { id: 2, name: "Smart Watch", price: 89, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop" },
    { id: 3, name: "Bluetooth Speaker", price: 35, category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop" },
    // Fashion
    { id: 4, name: "Men's T-Shirt", price: 25, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop" },
    { id: 5, name: "Women's Dress", price: 45, category: "fashion", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=200&fit=crop" },
    { id: 6, name: "Sneakers", price: 65, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
    // Home & Living
    { id: 7, name: "Floor Lamp", price: 55, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop" },
    { id: 8, name: "Coffee Table", price: 120, category: "home", image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=300&h=200&fit=crop" },
    { id: 9, name: "Decorative Pillow", price: 20, category: "home", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=300&h=200&fit=crop" },
    // Beauty
    { id: 10, name: "Skincare Set", price: 40, category: "beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop" },
    { id: 11, name: "Perfume", price: 60, category: "beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop" },
    { id: 12, name: "Makeup Kit", price: 35, category: "beauty", image: "https://images.unsplash.com/photo-1596462502278-27bf7c1d7739?w=300&h=200&fit=crop" },
];

// ============ CURRENCY CONVERSION RATES ============
const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    NGN: 1550,
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

// ============ RENDER PRODUCTS ============
const grid = document.getElementById("productGrid");
const searchBar = document.getElementById("searchBar");
const currencySelector = document.getElementById("currencySelector");
let currentCategory = "all";

function renderProducts(category = "all", search = "") {
    let filtered = products;

    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

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

// ============ WHATSAPP ORDER FUNCTION ============
function orderProduct(name, price) {
    const phone = "2348012345678"; // REPLACE with client's number
    const message = `Hello! I want to order ${name} for ${price}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// ============ CURRENCY SWITCHER ============
currencySelector.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    renderProducts(currentCategory, searchBar.value);
});

// ============ CATEGORY FILTERS ============
document.querySelectorAll
