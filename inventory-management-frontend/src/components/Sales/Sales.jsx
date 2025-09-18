import { useSales, useSalesDispatch } from "../../context/SalesContext";
import SaleRecord from "./SaleRecord";

const Sales = () => {
    const sales = useSales();
    const dispatch = useSalesDispatch();

    const clearSalesHistory = () => {
        if (window.confirm("Are you sure you want to clear ALL sales history? This cannot be undone!")) {
            dispatch({ type: 'CLEAR_SALES' });
        }
    };

    return (
        <div className="m-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Sales Record</h1>
                {sales.length > 0 && (
                    <button 
                        onClick={clearSalesHistory}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Clear All Sales
                    </button>
                )}
            </div>
            
            {sales.length > 0 ? (
                <div className="grid gap-4">
                    {sales.map((sale, index) => (
                        <SaleRecord key={index} sale={sale} saleId={index} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No sales recorded yet.</p>
            )}
        </div>
    );
};

export default Sales;