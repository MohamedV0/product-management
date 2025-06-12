/**
 * Product Data Seeder
 * 
 * This utility script is designed for demonstration and testing purposes only.
 * It populates the system with sample product data to showcase the application's functionality.
 * 
 * How to use:
 * 1. Open the browser console in your application
 * 2. Copy and paste this entire script into the console
 * 3. Press Enter to execute
 * 4. The script will automatically populate localStorage with sample products
 * 5. The page will refresh once to display the seeded data
 * 
 * Note: This will overwrite any existing product data in localStorage
 */

(function () {
    const sampleProducts = [{
            name: "IPhone X",
            price: "999",
            category: "Phones",
            description: "This is an auto-created example product to demonstrate the system's functionality.",
            image: "images/default-product.png",
            dateAdded: new Date().toISOString()
        },
        {
            name: "IPhone 15 Pro",
            price: "999",
            category: "Phones",
            description: "Apple's latest flagship phone with A17 Pro chip, titanium design, and advanced camera system.",
            image: "https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/6503856f94473-iPhone%2015%20Pro.png",
            dateAdded: new Date(2023, 8, 15).toISOString()
        },
        {
            name: "Dell UltraSharp",
            price: "899",
            category: "Screens",
            description: "27-inch 4K monitor with accurate color reproduction, perfect for creative professionals.",
            image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/media-gallery/monitor-u2723qe-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402",
            dateAdded: new Date(2023, 6, 20).toISOString()
        },
        {
            name: "AirPods Max",
            price: "549",
            category: "AirPods",
            description: "Over-ear headphones with computational audio, active noise cancellation, and spatial audio.",
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha&.v=1604021221000",
            dateAdded: new Date(2023, 2, 15).toISOString()
        },
        {
            name: "Pixel Tablet",
            price: "499",
            category: "Other",
            description: "Google's versatile tablet that doubles as a smart home hub with vibrant display.",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop",
            dateAdded: new Date(2023, 5, 14).toISOString()
        }
    ];

    function seedProductData() {
        try {
            // Set products in localStorage
            localStorage.setItem('productsList', JSON.stringify(sampleProducts));

            window.location.reload();

            console.log('✅ Product data seeded successfully! The page will refresh to show the sample products.');
        } catch (error) {
            console.error('❌ Error seeding product data:', error);
        }
    }

    seedProductData();
})();