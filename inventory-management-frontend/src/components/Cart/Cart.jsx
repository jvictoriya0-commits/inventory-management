import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { useCartDispatch } from "../../context/CartContext";
import { useInventoryDispatch } from "../../context/InventoryContext";
import { useSalesDispatch } from "../../context/SalesContext";

export default function Cart() {
    const inventoryDispatch = useInventoryDispatch();
    const cartItemsFromContext = useCart();
    const cartDispatch = useCartDispatch();
    const saleDispatch = useSalesDispatch();
    
    let count = 0;
    let cartValue = 0;
    
    if (cartItemsFromContext.length > 0) {
        cartItemsFromContext.forEach((item) => {
            cartValue = cartValue + (item.price * item.quantity);
            count = count + (item.quantity);
        });
    }

    // Cart Status Data
    const totalItems = cartItemsFromContext.reduce((total, item) => total + item.quantity, 0);
    const totalValue = cartItemsFromContext.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="m-2 flex flex-col items-center">
            {/* Cart Status Box with Image */}
            <div className="border border-blue-400 px-6 py-4 rounded-xl text-center flex flex-col items-center bg-blue-50 shadow-md mb-6 w-full max-w-md">
                {/* Cart Image Added Here */}
                <div className="mb-3">
                    <img 
                        src="/cartImage.png" 
                        alt="Shopping Cart" 
                        className="w-40 h-40 object-contain"
                    />
                </div>
                
                <h1 className="font-bold text-2xl text-blue-700 mb-2"> Cart Summary</h1>
                <div className="flex justify-around w-full mt-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{cartItemsFromContext.length}</div>
                        <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{totalItems}</div>
                        <div className="text-sm text-gray-600">Items</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">₹{totalValue.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-2 mx-2">Your Cart Items</h1>
            
            {count === 0 ? (
                <p className="text-lg text-gray-600 mx-2">Your cart is empty.</p>
            ) : (
                <div>
                    <p className="mx-2">
                        No. of products in cart: <b>{count}</b> | Total Cart Value: <b>{cartValue.toFixed(2)}</b> 
                        <button onClick={() => {
                            cartItemsFromContext.forEach((cartItem) => {
                                inventoryDispatch({
                                    type: 'STOCK_SOLD',
                                    productName: cartItem.productName,
                                    stock: cartItem.quantity,
                                })
                            });
                            saleDispatch({
                                type: 'NEW_SALE',
                                saleValue: cartValue,
                                products: cartItemsFromContext,
                            });
                            cartDispatch({
                                type: 'EMPTY_CART',
                            });
                            alert('Checkout successful! Inventory has been updated.');
                        }} className="bg-green-500 hover:bg-green-600 text-white rounded p-1 m-1 mx-3">Checkout Cart</button>
                        <button onClick={() => {
                            cartDispatch({
                                type: 'EMPTY_CART',
                            });
                        }} className="bg-red-500 hover:bg-red-600 text-white rounded p-1 m-1 mx-2">Clear Cart</button>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {cartItemsFromContext.map((product) => (
                            <CartItem key={product.productName} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}