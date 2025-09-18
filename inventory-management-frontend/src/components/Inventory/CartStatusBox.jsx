import { useCart } from "../../context/CartContext";

export default function CartStatusBox() {
    const cartItems = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="border border-blue-400 px-4 py-4 rounded-xl text-center flex flex-col items-center bg-blue-50 shadow-md mb-6">
            <h1 className="font-bold text-xl text-blue-700 mb-2"> Cart Status</h1>
            <div className="w-[120px] h-[120px] overflow-hidden rounded-full mt-2 flex items-center justify-center bg-white border-2 border-blue-300">
                <span className="text-3xl font-bold text-blue-600">{cartItems.length}</span>
            </div>
            <div className="mt-4 space-y-1">
                <p className="text-md"><b>{cartItems.length}</b> Products</p>
                <p className="text-md"><b>{totalItems}</b> Items</p>
                <p className="text-md">₹<b>{totalValue.toFixed(2)}</b> Total</p>
            </div>
            <button
                onClick={() => window.location.href = '/cart'}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 transition"
            >
                View Cart
            </button>
        </div>
    );
}