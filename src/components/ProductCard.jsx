const ProductCard = ({ product }) => {
    console.log(product.file_path_url);
    
  return (
    <div className="bg-white rounded-3xl p-5 shadow-xl border border-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-zinc-100 rounded-2xl overflow-hidden shrink-0">
          <img src={`${product.file_path_url}/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded w-fit mb-1">
            Barcode: {product.barcode}
          </span>
          <h2 className="text-xl font-bold text-zinc-800 leading-tight">{product.name}</h2>
          <p className="text-zinc-500 text-sm mt-1">{product.category || "General Item"}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-zinc-50 flex justify-between items-center">
        <div>
          <p className="text-xs text-zinc-400 font-bold uppercase">Price</p>
          <p className="text-2xl font-black text-indigo-600">${product.price}</p>
        </div>
        <button className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


