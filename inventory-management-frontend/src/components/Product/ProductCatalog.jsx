import { useState, useMemo } from "react";
import { useInventory } from "../../context/InventoryContext";
import ProductList from "./ProductList";

export default function ProductCatalog() {
    const inventory = useInventory();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Get unique categories dynamically from product tags
    const categories = useMemo(() => {
        const allTags = inventory.flatMap(item => item.tags || []);
        const uniqueTags = [...new Set(allTags)];
        return ["all", ...uniqueTags.sort()];
    }, [inventory]);

    // Group products by their first tag for category sections
    const productsByCategory = useMemo(() => {
    return inventory.reduce((acc, product) => {
        if (product.stock > 0 && 
            product.tags && 
            product.tags.length > 0 &&
            product.productName.toLowerCase() !== 'sample item') { // ADD THIS LINE
            const category = product.tags[0];
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
        }
        return acc;
    }, {});
}, [inventory]);

    const filteredProducts = inventory.filter((item) =>
    item.stock > 0 &&
    item.productName.toLowerCase() !== 'sample item' && // ADD THIS LINE
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "all" || item.tags.includes(selectedCategory))
);

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
            
            {/* Search and Category Filter */}
            <div className="w-full max-w-md mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm ${
                                selectedCategory === category
                                    ? "bg-pink-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {category === "all" ? "All Products" : category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display based on selection */}
            {selectedCategory === "all" ? (
                // Show Jio Mart style category sections
                Object.keys(productsByCategory).length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    Object.entries(productsByCategory).map(([category, products]) => (
                        <div key={category} className="w-full max-w-4xl mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-pink-600 border-b-2 border-pink-200 pb-2">
                                🛒 Top {category.charAt(0).toUpperCase() + category.slice(1)} for You
                            </h2>
                            <ProductList products={products} />
                        </div>
                    ))
                )
            ) : (
                // Show filtered products when a specific category is selected
                filteredProducts.length > 0 ? (
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl font-semibold mb-4 text-pink-600 border-b-2 border-pink-200 pb-2">
                            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                        </h2>
                        <ProductList products={filteredProducts} />
                    </div>
                ) : (
                    <p className="text-gray-500">No products found in this category.</p>
                )
            )}
        </div>
    );
}