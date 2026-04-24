import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProductByBarcode: builder.query({
      // এখানে বারকোড পাস করলে এটি API কল করবে
      query: (barcode) => `serarch-product-by-barcode?barcode=${barcode}&need_codes=true`,
      // ডাটা ফরম্যাট অনুযায়ী ট্রান্সফর্ম করা (ঐচ্ছিক)
      transformResponse: (response) => response.product, 
    }),
  }),
});

export const { useLazyGetProductByBarcodeQuery } = productApi;
