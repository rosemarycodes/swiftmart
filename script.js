// ============ PRODUCT DATABASE (Base prices in USD) ============
const products = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 49, category: "electronics", image: "https://via.placeholder.com/300x200?text=Headphones" },
    { id: 2, name: "Smart Watch", price: 89, category: "electronics", image: "https://via.placeholder.com/300x200?text=Smart+Watch" },
    { id: 3, name: "Bluetooth Speaker", price: 35, category: "electronics", image: "https://via.placeholder.com/300x200?text=Speaker" },
    // Fashion
    { id: 4, name: "Men's T-Shirt", price: 25, category: "fashion", image: "https://via.placeholder.com/300x200?text=T-Shirt" },
    { id: 5, name: "Women's Dress", price: 45, category: "fashion", image: "https://via.placeholder.com/300x200?text=Dress" },
    { id: 6, name: "Sneakers", price: 65, category: "fashion", image: "https://via.placeholder.com/300x200?text=Sneakers" },
    // Home & Living
    { id: 7, name: "Floor Lamp", price: 55, category: "home", image: "https://via.placeholder.com/300x200?text=Floor+Lamp" },
    { id: 8, name: "Coffee Table", price: 120, category: "home", image: "https://via.placeholder.com/300x200?text=Coffee+Table" },
    { id: 9, name: "Decorative Pillow", price: 20, category: "home", image: "https://via.placeholder.com/300x200?text=Pillow" },
    // Beauty
    { id: 10, name: "Skincare Set", price: 40, category: "beauty", image: "https://via.placeholder.com/300x200?text=Skincare" },
    { id: 11, name: "Perfume", price: 60, category: "beauty", image: "https://via.placeholder.com/300x200?text=Perfume" },
    { id: 12, name: "Makeup Kit", price: 35, category: "beauty", image: "https://via.placeholder.com/300x200?text=Makeup" },
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

    grid.innerHTML = filtered.map(p => {
        const rate = exchangeRates[currentCurrency];
        const convertedPrice = p.price * rate;
        const symbol = currencySymbols[currentCurrency];
        const formattedPrice = convertedPrice.toFixed(2);
        
        return `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}" />
                <h3>${p.name}</h3>
                <p class="price">${symbol}${formattedPrice}</p>
                <button onclick="orderProduct('${p.name}', '${symbol}${formattedPrice}')">
                    Order via WhatsApp
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
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        renderProducts(currentCategory, searchBar.value);
    });
});

// ============ SEARCH FUNCTIONALITY ============
searchBar.addEventListener("input", (e) => {
    renderProducts(currentCategory, e.target.value);
});

// ============ INITIAL RENDER ============
renderProducts();
