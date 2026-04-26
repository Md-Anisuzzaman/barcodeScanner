// import { useEffect, useState } from "react";
// import { useGetProductByBarcodeQuery } from "../store/productApiSlice";
// import { useSelector } from "react-redux";

// export default function Products({scannedProduct}) {
//   const initialProducts = [
//     {
//       id: 101,
//       name: "Quantum Headphones",
//       image_url:
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
//       price: 299.99,
//       discount_price: 249.99,
//       quantity: 1,
//       stock_quantity: 5,
//     },
//     {
//       id: 102,
//       name: "Walnut Desk",
//       image_url:
//         "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=600",
//       price: 450.0,
//       discount_price: null,
//       quantity: 1,
//       stock_quantity: 3,
//     },
//     {
//       id: 103,
//       name: "Mechanical Keyboard",
//       image_url:
//         "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600",
//       price: 129.5,
//       discount_price: 99.0,
//       quantity: 1,
//       stock_quantity: 10,
//     },
//     {
//       id: 104,
//       name: "4K Monitor",
//       image_url:
//         "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
//       price: 899.99,
//       discount_price: null,
//       quantity: 1,
//       stock_quantity: 2,
//     },
//     {
//       id: 105,
//       name: "Smart Light Strip",
//       image_url:
//         "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600",
//       price: 45.0,
//       discount_price: 35.5,
//       quantity: 1,
//       stock_quantity: 15,
//     },
//   ];

//   const [localProducts, setLocalProducts] = useState([]);
//   console.log("local", localProducts);

//   const {scannedData} = useSelector((state) => state.scanner);
//   console.log("scannedData in Products.jsx", scannedData);
//   const { data: product, isFetching } = useGetProductByBarcodeQuery(scannedData, {
//     skip: !scannedData,
//   });
//   console.log("API response in Products.jsx", { product, isFetching });

//   const [products, setProducts] = useState(initialProducts);
//   const [companyDiscount] = useState(50); // Flat ৳50 discount
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [customerPaid, setCustomerPaid] = useState(0);

//   const handleUpdate = (id, amount) => {
//     setProducts((prev) =>
//       prev.map((item) => {
//         if (item.id === id) {
//           const newQty = item.quantity + amount;
//           if (newQty >= 1 && newQty <= item.stock_quantity)
//             return { ...item, quantity: newQty };
//         }
//         return item;
//       }),
//     );
//   };
// useEffect(() => {
//   if (!scannedProduct) return;

//   console.log("✅ Product received in Products:", scannedProduct);

//   setLocalProducts((prevProducts) => {
//     const existingProduct = prevProducts.find(
//       (item) => item.id === scannedProduct.id,
//     );

//     if (existingProduct) {
//       return prevProducts.map((item) =>
//         item.id === scannedProduct.id
//           ? {
//               ...item,
//               quantity:
//                 item.quantity < item.stock_quantity
//                   ? item.quantity + 1
//                   : item.quantity,
//             }
//           : item,
//       );
//     }

//     return [...prevProducts, { ...scannedProduct, quantity: 1 }];
//   });
// }, [scannedProduct]);

//   // --- Calculations ---

//   const subTotal = localProducts.reduce(
//     (acc, item) => acc + (item.discount_price || item.price) * item.quantity,
//     0,
//   );

//   const afterDiscount = subTotal - companyDiscount;
//   const grandTotal = Math.round(afterDiscount);

//   const roundOff = (grandTotal - afterDiscount).toFixed(2);

//   const returnAmount =
//     customerPaid > grandTotal ? (customerPaid - grandTotal).toFixed(2) : 0;

//   const dueAmount =
//     grandTotal > customerPaid ? (grandTotal - customerPaid).toFixed(2) : 0;

//   return (
//     <div>
//       <h2 className="font-bold text-gray-700 ml-2">Shopping Cart</h2>
//       <div className="bg-gray-100 min-h-screen p-4 md:p-10 flex flex-col lg:flex-row gap-6 justify-center">
//         {/* LEFT: Product List */}
//         <div className="flex flex-col gap-4 w-full max-w-md">
//           {products.map((product) => {
//             const activePrice = product.discount_price || product.price;
//             const isAtLimit = product.quantity >= product.stock_quantity;
//             return (
//               <div
//                 key={product.id}
//                 className="p-4 bg-white rounded-2xl shadow-sm border flex flex-col gap-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={product.image_url}
//                     alt=""
//                     className="w-10 h-10 object-cover rounded-lg border"
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-gray-800 line-clamp-1">
//                       {product.name}
//                     </p>
//                     <p className="text-[10px] text-gray-400">
//                       Stock: {product.stock_quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-green-600 font-bold">৳ {activePrice}</p>
//                     {product.discount_price && (
//                       <p className="text-[10px] text-gray-400 line-through">
//                         ৳ {product.price}
//                       </p>
//                     )}
//                   </div>
//                   {/* <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border">
//                     <button
//                       onClick={() => handleUpdate(product.id, -1)}
//                       className="font-bold"
//                     >
//                       -
//                     </button>
//                     <span className="text-sm w-4 text-center">
//                       {product.quantity}
//                     </span>
//                     <button
//                       onClick={() => handleUpdate(product.id, 1)}
//                       disabled={isAtLimit}
//                       className= {`font-bold ${isAtLimit ? "text-gray-200" : "text-green-600"}`}
//                     >
//                       +
//                     </button>
//                   </div> */}
//                   <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
//                     {/* Minus Button */}
//                     <button
//                       onClick={() => handleUpdate(product.id, -1)}
//                       className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-r transition-colors"
//                     >
//                       -
//                     </button>

//                     {/* Quantity Display */}
//                     <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-gray-800">
//                       {product.quantity}
//                     </span>

//                     {/* Plus Button */}
//                     <button
//                       onClick={() => handleUpdate(product.id, 1)}
//                       disabled={isAtLimit}
//                       className={`w-8 h-8 flex items-center justify-center font-bold border-l transition-colors ${
//                         isAtLimit
//                           ? "bg-gray-50 text-gray-300 cursor-not-allowed"
//                           : "bg-green-50 hover:bg-green-100 text-green-600"
//                       }`}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-gray-700 font-bold">
//                     ৳ {(activePrice * product.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* RIGHT: Money Receipt */}
//         <div className="w-full max-w-md h-fit">
//           <div className="bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-200 p-6">
//             <div className="text-center mb-6">
//               <h2 className="text-xl font-black uppercase tracking-widest text-gray-800">
//                 Money Receipt
//               </h2>
//               <p className="text-xs text-gray-400">
//                 Company Wallet Transaction
//               </p>
//             </div>

//             <div className="space-y-3 text-sm border-b pb-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>৳ {subTotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-red-500">
//                 <span>Company Discount (Flat)</span>
//                 <span>-৳ {companyDiscount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-blue-500 italic">
//                 <span>Round Off</span>
//                 <span>৳ {roundOff}</span>
//               </div>
//             </div>

//             <div className="flex justify-between items-center py-4">
//               <span className="text-lg font-bold">Grand Total</span>
//               <span className="text-2xl font-black text-gray-900">
//                 ৳ {grandTotal}
//               </span>
//             </div>

//             {/* Payment Part */}
//             <div className="bg-gray-50 p-4 rounded-xl space-y-4">
//               <div>
//                 <label className="text-xs font-bold text-gray-500 uppercase">
//                   Payment Method
//                 </label>
//                 <div className="flex gap-2 mt-1">
//                   {["Cash", "Bkash"].map((m) => (
//                     <button
//                       key={m}
//                       onClick={() => setPaymentMethod(m)}
//                       className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${paymentMethod === m ? "bg-black text-white" : "bg-white border text-gray-600"}`}
//                     >
//                       {m}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-gray-500 uppercase">
//                   Customer Paid Amount
//                 </label>
//                 <input
//                   type="number"
//                   className="w-full mt-1 p-2 border rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="0.00"
//                   onChange={(e) => setCustomerPaid(Number(e.target.value))}
//                 />
//               </div>
//             </div>

//             <div className="mt-6 space-y-2 border-t pt-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Paid via {paymentMethod}</span>
//                 <span className="font-bold text-gray-800">
//                   ৳ {customerPaid}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Due Balance</span>
//                 <span className="font-bold text-red-600">৳ {dueAmount}</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                 <span className="text-xs font-bold text-green-700 uppercase">
//                   Return from Wallet
//                 </span>
//                 <span className="text-lg font-black text-green-700">
//                   ৳ {returnAmount}
//                 </span>
//               </div>
//             </div>

//             <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition">
//               Confirm Transaction
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../store/cartSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { cartItems: localProducts, companyDiscount } = useSelector(
    (state) => state.cart,
  );

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [customerPaid, setCustomerPaid] = useState(0);

  // --- Calculations ---
  const subTotal = localProducts.reduce(
    (acc, item) => acc + (item.discount_price || item.price) * item.quantity,
    0,
  );

  const afterDiscount = subTotal > 0 ? subTotal - companyDiscount : 0;
  const grandTotal = Math.round(afterDiscount);
  const roundOff = (grandTotal - afterDiscount).toFixed(2);

  const returnAmount =
    customerPaid > grandTotal ? (customerPaid - grandTotal).toFixed(2) : 0;
  const dueAmount =
    grandTotal > customerPaid ? (grandTotal - customerPaid).toFixed(2) : 0;

  return (
    <div className="w-full">
      {/* Error Toast/Tag */}
      
      <h2 className="font-bold text-gray-700 ml-2">Shopping Cart</h2>
      <div className="bg-gray-100 min-h-screen p-4 md:p-10 flex flex-col lg:flex-row gap-6 justify-center">
        {/* LEFT: Product List */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          {localProducts.length === 0 && (
            <div className="p-10 text-center bg-white rounded-2xl border-2 border-dashed text-gray-400">
              No products added. Scan a barcode to begin.
            </div>
          )}

          {localProducts.map((product) => {
            const activePrice = product.discount_price || product.price;
            const isAtLimit =
              product.quantity >=
              (product.stock_amount || product.stock_quantity);

            return (
              <div
                key={product.id}
                className="p-4 bg-white rounded-2xl shadow-sm border flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                    {product.file_path_url ? (
                      <img
                        src={`${product.file_path_url}/${product.image}`}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      "📦"
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Stock: {product.stock_amount || product.stock_quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(product.id))}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-bold">৳ {activePrice}</p>
                    {product.discount_price && (
                      <p className="text-[10px] text-gray-400 line-through">
                        ৳ {product.price}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center border rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: product.id, amount: -1 }))
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-r"
                    >
                      -
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-gray-800">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: product.id, amount: 1 }))
                      }
                      disabled={isAtLimit}
                      className={`w-8 h-8 flex items-center justify-center font-bold border-l ${isAtLimit ? "bg-gray-50 text-gray-300" : "bg-green-50 text-green-600"}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-700 font-bold">
                    ৳ {(activePrice * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Money Receipt */}
        <div className="w-full max-w-md h-fit">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-800">
                Money Receipt
              </h2>
              <p className="text-xs text-gray-400">Transaction Details</p>
            </div>

            <div className="space-y-3 text-sm border-b pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Company Discount (Flat)</span>
                <span>-৳ {companyDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-blue-500 italic">
                <span>Round Off</span>
                <span>৳ {roundOff}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-bold">Grand Total</span>
              <span className="text-2xl font-black text-gray-900">
                ৳ {grandTotal}
              </span>
            </div>

            {/* Payment Part */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Payment Method
                </label>
                <div className="flex gap-2 mt-1">
                  {["Cash", "Bkash"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${paymentMethod === m ? "bg-black text-white" : "bg-white border text-gray-600"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Customer Paid Amount
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded-lg text-lg font-bold focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="0.00"
                  onChange={(e) => setCustomerPaid(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Paid via {paymentMethod}</span>
                <span className="font-bold text-gray-800">
                  ৳ {customerPaid}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Due Balance</span>
                <span className="font-bold text-red-600">৳ {dueAmount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-xs font-bold text-green-700 uppercase">
                  Return from Wallet
                </span>
                <span className="text-lg font-black text-green-700">
                  ৳ {returnAmount}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 transition">
              Confirm Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
