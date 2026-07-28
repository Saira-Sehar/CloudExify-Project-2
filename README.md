╔══════════════════════════════════════════════════════════════╗
║                    D R O P X                                 ║
║            Limited Drop Storefront                           ║
║       CloudExify Web Development Internship                  ║
║              Project 2 — Month 1 FINAL                       ║
╚══════════════════════════════════════════════════════════════╝



STUDENT INFORMATION
────────────────────────────────────────────────────────────

Name:              Saira Sehar
Registration:      CX-INT-2026-GEN-0488
Project:           E-Commerce Product Page (Limited Drop Storefront)
Month:             Month 1 — FINAL SUBMISSION



PROJECT OVERVIEW
────────────────────────────────────────────────────────────

DROPX is a premium limited-drop e-commerce storefront built for
the CloudExify internship program. It simulates a real streetwear
and sneaker drop platform with live countdown timers, real-time
stock tracking, persistent cart functionality, and advanced
product filtering.

Drop Concept: Streetwear & Sneaker Capsule
Drop Name:     Drop 003 — Winter Collection



LIVE DEMO
────────────────────────────────────────────────────────────

Visit the live site: https://github.com/Saira-Sehar/CloudExify-Project-2/



FEATURES IMPLEMENTED
────────────────────────────────────────────────────────────

CORE REQUIREMENTS (ALL 4 COMPLETED)

  1. Countdown Timer
     Real-time countdown displayed in hero section and navbar.
     Updates every second using setInterval. Shows "DROP ENDED"
     when countdown reaches zero.

  2. Live Stock Indicator
     Each product card shows remaining stock with color-coded
     badges:
       Green  — Stock available (5+ items)
       Orange — Running low (3-5 items)
       Red    — Critical stock (1-2 items, pulsing animation)
       Grey   — Sold out (disabled button)

  3. Persistent Cart
     Cart state survives page refresh using localStorage.
     Quantities persist. Stock updates reflect cart contents.
     Cart accessible via offcanvas sidebar.

  4. Search + Category + Price Filter
     Combined real-time filtering on the same product set:
       Search bar — filters by name, description, colorway
       Category dropdown — sneakers, streetwear, accessories
       Price slider — dynamic max price filter
     All three work together simultaneously.


BONUS FEATURES

  • Sort Dropdown
    Sort products by: Featured, Price (Low-High),
    Price (High-Low), Highest Rated

  • Toast Notifications
    Visual feedback on add-to-cart, stock warnings,
    and order confirmation

  • Product Detail Modal
    Click any product image to view full details including
    description, colorway, price, and stock status

  • Active Filter Tags
    Visual filter pills show applied filters with individual
    clear buttons for each filter

  • Responsive Design
    Mobile-first Bootstrap grid layout. Tested on:
      Desktop (1920px)
      Tablet (768px)
      Mobile (375px)

  • Empty State Handling
    Clean UI when no products match active filters with
    "Clear All Filters" action button



TECH STACK
────────────────────────────────────────────────────────────

Technology           Usage
─────────────────────────────────────────────────
HTML5                Semantic page structure
Bootstrap 5.3.3      Responsive grid, modals, forms, offcanvas
Bootstrap Icons      Icon system throughout
CSS3                 Custom dark theme, animations, transitions
Vanilla JavaScript   All interactive functionality
localStorage         Persistent cart state management



PROJECT STRUCTURE
────────────────────────────────────────────────────────────

cloudexify-web-p2-saira/
│
├── index.html              Main HTML with Bootstrap CDN links
│
├── css/
│   └── style.css           Custom dark premium theme styles
│
├── js/
│   ├── data.js             Product catalog (10 items, 3 categories)
│   └── script.js           Application logic and interactivity
│
├── assets/
│   └── images/             Product images and assets
│
├── screenshots/
│   ├── desktop.png         Full desktop view capture
│   └── mobile.png          Mobile responsive view capture
│
├── vercel.json             Vercel deployment configuration
└── README.md               Project documentation (this file)



PRODUCT CATALOG
────────────────────────────────────────────────────────────

10 Products across 3 Categories:

CATEGORY: SNEAKERS (3 products)
  1. Shadow Runner X       ₨12,500    Rating: 4.9
  2. Velocity Mid-Top      ₨9,800     Rating: 4.8
  3. Frost Runner Boot     ₨14,500    Rating: 4.9

CATEGORY: STREETWEAR (4 products)
  4. Neon Drift Hoodie     ₨6,500     Rating: 4.7
  5. Tech Cargo Pants      ₨5,500     Rating: 4.6
  6. Signal Graphic Tee    ₨3,500     Rating: 4.3
  7. Reflex Puffer Vest    ₨8,500     Rating: 4.6

CATEGORY: ACCESSORIES (3 products)
  8. Aero Strap Cap        ₨3,000     Rating: 4.5
  9. Crossbody Tech Bag    ₨4,200     Rating: 4.4
 10. Gravity Socks 3-Pack  ₨1,800     Rating: 4.2



DEPLOYMENT
────────────────────────────────────────────────────────────

Platform: Vercel
Type:     Static Site (no build step)

Deployment Steps:
  1. Push code to GitHub repository
  2. Connect repository to Vercel
  3. Framework preset set to "Other"
  4. Automatic deployment on every git push



TESTING CHECKLIST
────────────────────────────────────────────────────────────

Test Case                                    Status
──────────────────────────────────────────────────────
Open live Vercel link                        PASSED
Countdown timer updates every second         PASSED
Countdown handles zero state correctly       PASSED
Add to cart decreases displayed stock        PASSED
Cart persists after page refresh             PASSED
Remove item recalculates cart total          PASSED
Quantity changes respect stock limits        PASSED
Search filters products in real-time         PASSED
Category filter works independently          PASSED
Category + price + search work together      PASSED
Sort dropdown changes product order          PASSED
Product modal shows correct details          PASSED
Checkout form validates inputs               PASSED
Empty cart cannot submit order               PASSED
Responsive on mobile width                   PASSED
Responsive on tablet width                   PASSED
No JavaScript console errors                 PASSED



SCREENSHOTS
────────────────────────────────────────────────────────────

Desktop View:
screenshots/desktop.png

Mobile View:
screenshots/mobile.png



LEARNING OUTCOMES
────────────────────────────────────────────────────────────

Through this project, I gained practical experience in:

  • Dynamic DOM rendering from JavaScript data arrays
  • State management using localStorage API
  • Event delegation for efficient event handling
  • Bootstrap 5 component integration (modals, offcanvas, forms)
  • Combined filtering logic across multiple criteria
  • Real-time countdown implementation with setInterval
  • Responsive design with Bootstrap grid system
  • Form validation using Bootstrap's built-in validation
  • Toast notification system for user feedback



FUTURE IMPROVEMENTS
────────────────────────────────────────────────────────────

Planned enhancements for future versions:

  • Backend integration with payment gateway (Stripe/JazzCash)
  • User authentication and account system
  • Real inventory database with MongoDB
  • Order history and tracking
  • Admin dashboard for product CRUD operations
  • Email notifications for order confirmation
  • Wishlist functionality
  • Discount code system
  • Size/color variant selection
  • Product image zoom on hover



══════════════════════════════════════════════════════════════
  Built by Saira Sehar — CloudExify Internship 2026
  GitHub: https://github.com/Saira-Sehar
  LinkedIn: https://www.linkedin.com/in/saira-sehar
══════════════════════════════════════════════════════════════
