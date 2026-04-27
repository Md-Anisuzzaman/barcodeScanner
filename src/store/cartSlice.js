import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    companyDiscount: 50,
    scanError: null,

  },
  reducers: {
    addItemFromScanner: (state, action) => {
      const newProduct = action.payload;
      const isExist = state.cartItems.find((item) => item.id === newProduct.id);

      // Rule: If product exists, IGNORE the scan. If not, ADD it.
      if (!isExist) {
        state.cartItems.push({ ...newProduct, quantity: 1 });
        state.scanError = null;
      } else {
        console.log("Product already in cart. Scan ignored.");
        state.scanError = `${newProduct.name} is already in the cart!`;
      }
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        const newQty = item.quantity + amount;
        const maxStock = item.stock_amount || item.stock_quantity;
        if (newQty >= 1 && newQty <= maxStock) {
          item.quantity = newQty;
        }
      }
    },
    clearScanError: (state) => {
      state.scanError = null;
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItemFromScanner, updateQuantity, removeItem, clearScanError } = cartSlice.actions;
export default cartSlice.reducer;