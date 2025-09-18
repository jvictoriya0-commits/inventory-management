import { useState } from "react";
import { useInventoryDispatch } from "../../context/InventoryContext";

const Product = ({ product, alertValue }) => {
    const [addStock, setAddStock] = useState(0);
    const inventoryDispatch = useInventoryDispatch();

    const handleRemove = () => {
        if (product.stock > 0) {
            alert(`Cannot remove ${product.productName} - there is still stock available. Sell or clear stock first.`);
            return;
        }
        
        if (window.confirm(`Are you sure you want to remove ${product.productName} from inventory?`)) {
            inventoryDispatch({
                type: 'PRODUCT_REMOVED',
                productName: product.productName
            });
        }
    };

    // REGULAR PRODUCT - INVENTORY MANAGEMENT ONLY (NO SAMPLE ITEM CODE)
    return (
        <div className={`border px-3 py-2 rounded text-center flex flex-col items-center ${product.stock < alertValue ? "border-red-800 bg-red-100 border-2" : "border-gray-400"}`}>
            <h1 className="font-bold text-xl">{product.productName}</h1>
            <div className="w-[250px] h-[250px] overflow-hidden border border-gray-300 rounded mt-2">
                <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
            </div>
            <p className="text-lg mt-2">Price: ₹ {product.price.toFixed(2)}</p>
            <p>Stock Available: {product.stock}</p>
            
            <div className="mt-2">
                Add Stock:{" "}
                <input
                    onChange={(e) => setAddStock(e.target.value)}
                    className="border border-gray-400 rounded p-1 w-20"
                    value={addStock}
                    type="number"
                />
            </div>
            
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => {
                        setAddStock(0);
                        inventoryDispatch({
                            type: "STOCK_ADDED",
                            productName: product.productName,
                            stock: addStock,
                        });
                    }}
                    className="bg-green-500 hover:bg-green-600 rounded p-2 text-white"
                >
                    Update Stock
                </button>

                <button
                    onClick={handleRemove}
                    className="bg-red-500 hover:bg-red-600 rounded p-2 text-white"
                >
                    Remove Product
                </button>
            </div>
        </div>
    );
};

export default Product;