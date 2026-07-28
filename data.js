// =============================================
// DROPX - Product Catalog
// Drop 003: Winter Collection
// =============================================

const DROP_INFO = {
    number: "003",
    name: "Winter Collection",
    startDate: new Date(),
    endDate: new Date("2026-12-31T23:59:59") // Always shows countdown
};

const PRODUCTS = [
    {
        id: 1,
        name: "Shadow Runner X",
        category: "sneakers",
        price: 12500,
        stock: 4,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        description: "Premium running silhouette with carbon fiber plate. Limited to 200 pairs worldwide. Features responsive cushioning and a lightweight knit upper.",
        colorway: "Phantom Black / Volt"
    },
    {
        id: 2,
        name: "Neon Drift Hoodie",
        category: "streetwear",
        price: 6500,
        stock: 8,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        description: "Oversized fit hoodie with reflective 3M graphics. 450GSM heavyweight cotton. Dropped shoulders and ribbed cuffs.",
        colorway: "Midnight / Neon Green"
    },
    {
        id: 3,
        name: "Tech Cargo Pants",
        category: "streetwear",
        price: 5500,
        stock: 6,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop",
        description: "Tactical-inspired cargo pants with water-resistant coating. Multiple zip pockets. Tapered fit with adjustable drawstring cuffs.",
        colorway: "Olive / Black"
    },
    {
        id: 4,
        name: "Aero Strap Cap",
        category: "accessories",
        price: 3000,
        stock: 10,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
        description: "6-panel structured cap with quick-release buckle. Embroidered DROPX logo. Breathable mesh back panels.",
        colorway: "Black / White"
    },
    {
        id: 5,
        name: "Velocity Mid-Top",
        category: "sneakers",
        price: 9800,
        stock: 3,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
        description: "Mid-top basketball-inspired sneaker with premium leather overlays. Encapsulated Air unit for all-day comfort.",
        colorway: "Sail / University Blue"
    },
    {
        id: 6,
        name: "Crossbody Tech Bag",
        category: "accessories",
        price: 4200,
        stock: 7,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        description: "Modular crossbody bag with magnetic Fidlock buckle. Waterproof zippers. Fits up to 11-inch tablet.",
        colorway: "Stealth Black"
    },
    {
        id: 7,
        name: "Signal Graphic Tee",
        category: "streetwear",
        price: 3500,
        stock: 12,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        description: "Premium 220GSM cotton tee with screen-printed graphic. Relaxed fit. Pre-shrunk and garment-washed.",
        colorway: "Washed Black"
    },
    {
        id: 8,
        name: "Gravity Socks 3-Pack",
        category: "accessories",
        price: 1800,
        stock: 15,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
        description: "Performance crew socks with arch compression. Moisture-wicking fabric. 3 pairs per pack.",
        colorway: "Assorted (Black/White/Grey)"
    },
    {
        id: 9,
        name: "Frost Runner Boot",
        category: "sneakers",
        price: 14500,
        stock: 2,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
        description: "Winter-ready hiking sneaker hybrid. GORE-TEX membrane. Vibram outsole. Limited to 100 pairs.",
        colorway: "Timber / Gum"
    },
    {
        id: 10,
        name: "Reflex Puffer Vest",
        category: "streetwear",
        price: 8500,
        stock: 5,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        description: "Lightweight down-alternative puffer vest. Packable design. Reflective piping details. Water-resistant shell.",
        colorway: "Obsidian / Reflective"
    }
];

const DISCOUNT_CODES = {
    "DROPX10": 10,
    "WINTER20": 20,
    "FIRSTBUY": 15
};