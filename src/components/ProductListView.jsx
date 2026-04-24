import { Trash2, ShoppingCart, Tag } from 'lucide-react';

const ProductListView = ({ products, onRemove }) => {
  if (products.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
          Scanned Products
        </h3>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
          {products.length} Items
        </span>
      </div>

      <div className="space-y-3">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all group"
          >
            {/* Product Icon/Image Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:bg-indigo-50 transition-colors">
              <Tag className="w-6 h-6 text-zinc-400 group-hover:text-indigo-500" />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-zinc-900 truncate">
                Product ID: {product.id}
              </h4>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Barcode: {product.barcode}
              </p>
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => onRemove(index)}
              className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Remove Item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Total Amount Placeholder */}
      <div className="mt-6 p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
        <div className="flex justify-between items-center">
          <span className="text-indigo-100 text-sm">Estimated Total</span>
          <span className="text-xl font-black">৳ 0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;