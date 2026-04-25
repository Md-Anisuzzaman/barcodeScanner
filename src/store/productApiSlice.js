import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', }),
  endpoints: (builder) => ({
    getProductByBarcode: builder.query({
      // এখানে বারকোড পাস করলে এটি API কল করবে
      query: (barcode) => `serarch-product-by-barcode?barcode=${barcode}&need_codes=true`,
      // ডাটা ফরম্যাট অনুযায়ী ট্রান্সফর্ম করা (ঐচ্ছিক)
      transformResponse: (response) => {
        console.log("API full response:", response);
        return response.product;
      }
    }),
  }),
});

export const { useLazyGetProductByBarcodeQuery } = productApi;

// fetch('https://bikrampur.store/serarch-product-by-barcode?barcode=8941100500576&need_codes=true')
//   .then(res => res.json())
//   .then(console.log)
//   .catch(console.error);


// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://bikrampur.store/',
//   }),
//   endpoints: (builder) => ({
//     getProductByBarcode: builder.query({
//       query: (barcode) =>
//         `serarch-product-by-barcode?barcode=${barcode}&need_codes=true`,
//       transformResponse: (response) => {
//         console.log(response);
//         return response?.product;
//       },
//     }),
//   }),
// });