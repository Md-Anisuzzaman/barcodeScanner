import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { setScannedData, toggleCamera } from "../store/scannerSlice";
import { useLazyGetProductByBarcodeQuery } from "../store/productApiSlice";

const BarcodeScanner = () => {
  const [trigger, { data, isFetching, isError, error }] =
    useLazyGetProductByBarcodeQuery();
  const dispatch = useDispatch();
  const { scannedData, isCameraOpen } = useSelector((state) => state.scanner);
  const qrCodeRef = useRef(null);

  // স্ক্যানার বন্ধ করার জন্য useCallback ব্যবহার করা হয়েছে যাতে ডিপেন্ডেন্সি এরর না আসে
  const stopScanner = useCallback(() => {
    if (qrCodeRef.current && qrCodeRef.current.isScanning) {
      qrCodeRef.current
        .stop()
        .then(() => {
          dispatch(toggleCamera(false));
        })
        .catch((err) => console.error("Failed to stop scanner", err));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isCameraOpen) {
      const html5QrCode = new Html5Qrcode("reader");
      qrCodeRef.current = html5QrCode;

      const config = {
        fps: 20,
        qrbox: { width: 250, height: 200 },
        aspectRatio: 1.0,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
        ],
      };

      html5QrCode
        .start(
          { facingMode: "environment" },
          config,
          async (decodedText) => {
            // added async
            dispatch(setScannedData(decodedText));
            console.log("Scanned Barcode:", decodedText);
            try {
              // .unwrap() allows you to treat the result like a standard promise
              const result = await trigger(decodedText).unwrap();
              console.log("🔍 Scanned Result from API:", result);
            } catch (err) {
              console.error("🔍 Product not found in database:", err);
            }
            stopScanner();
          },
          (errorMessage) => {
            console.log(errorMessage);
          },
        )
        .catch((err) => console.error("Unable to start scanner", err));
    }

    return () => {
      if (qrCodeRef.current && qrCodeRef.current.isScanning) {
        qrCodeRef.current.stop().catch((err) => console.log(err));
      }
    };
  }, [isCameraOpen, stopScanner, dispatch, trigger]);

  useEffect(() => {
    if (data) {
      console.log("✅ Product Found:", data);
    }
    if (error) {
      console.error("❌ API Error:", error);
    }
  }, [data, error]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      {/* Scanner Container */}
      <div
        className="w-full max-w-md bg-black rounded-2xl overflow-hidden relative shadow-2xl"
        style={{ height: "350px" }}
      >
        {isCameraOpen ? (
          <>
            <div id="reader" className="w-full h-full"></div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              {/* মেইন ফ্রেম */}
              <div className="relative w-64 h-52 border-2 border-white/30 rounded-lg">
                {/* corner border */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>

                {/* scanning animation */}
                <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
              </div>

              {/* outside part of border */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Instruction Text */}
            <div className="absolute bottom-4 left-0 right-0 text-center z-20">
              <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                Align barcode within frame
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Camera is Off</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 my-8 w-full max-w-md">
        <button
          onClick={() => dispatch(toggleCamera(true))}
          disabled={isCameraOpen}
          className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 ${isCameraOpen ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isCameraOpen ? "Camera Active" : "Open Camera"}
        </button>
        <button className="bg-white border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-bold hover:bg-zinc-50 transition-all">
          Customer
        </button>
      </div>

      {/* Result Section */}
      {/* <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-zinc-100">
        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4">
          Scanned Information
        </h3>
        {scannedData ? (
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <p className="text-indigo-900 font-mono break-all text-sm">
              <span className="font-bold text-indigo-400 mr-2">DATA:</span>
              {scannedData}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse"></div>
            <p className="text-sm italic">Waiting for scan...</p>
          </div>
        )}
      </div> */}

      {/* Result Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-zinc-100">
        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4">
          Product Information
          <div>
            {data}
          </div>
        </h3>

        {/* 1. Loading State */}
        {isFetching && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-sm text-zinc-500">Searching product...</p>
          </div>
        )}

        {/* 2. Error State */}
        {isError && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-4">
            <p className="text-red-600 text-sm">
              {error?.data?.message || "Product not found or network error."}
            </p>
          </div>
        )}

        {/* 3. Success State (Assuming 'data' is returned from trigger) */}
        {scannedData && !isFetching && !isError && (
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <p className="text-xs text-indigo-400 font-bold mb-1">
              BARCODE: {scannedData}
            </p>
            {/* If your API returns data, display it here */}
            {/* <p className="text-lg font-bold text-indigo-900">{data?.name}</p> */}
            {/* <p className="text-indigo-700">${data?.price}</p> */}
          </div>
        )}

        {!scannedData && !isFetching && (
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse"></div>
            <p className="text-sm italic">Waiting for scan...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;

// import { useState} from "react";
// import { useLazyGetProductByBarcodeQuery } from "../store/productApiSlice";
// import ScannerView from "./ScannerView"; // স্ক্যানার পার্ট
// import ProductCard from "./ProductCard"; // প্রোডাক্ট কার্ড
// import SearchBar from "./SearchBar"; // সার্চবার পার্ট

// const BarcodeScanner = () => {
//   const [product, setProduct] = useState(null);
//   const [trigger, { isFetching, isError, error }] = useLazyGetProductByBarcodeQuery();

//   // বারকোড পাওয়ার পর এপিআই কল করার মেইন ফাংশন
//   const handleBarcodeSearch = async (barcode) => {
//     console.log("Scanned Barcode:", barcode);
//     console.log("Scanned Barcode:", barcode);

//     if (!barcode) return;
//     try {
//       const result = await trigger(barcode).unwrap();
//       setProduct(result);
//     } catch (err) {
//       setProduct(null);
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50 pb-20">
//       <div className="w-full max-w-md space-y-6">

//         {/* ১. স্ক্যানার কম্পোনেন্ট (আপনার ডিজাইন) */}
//         <ScannerView onScanSuccess={handleBarcodeSearch} isFetching={isFetching} />

//         {/* ২. সার্চবার কম্পোনেন্ট */}
//         <SearchBar onSearch={handleBarcodeSearch} isLoading={isFetching} />

//         {/* ৩. রেজাল্ট সেকশন / প্রোডাক্ট কার্ড */}
//         <div className="mt-4">
//           {isFetching && (
//             <div className="flex justify-center p-10">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//             </div>
//           )}

//           {isError && (
//             <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
//               {error?.data?.message || "Product not found!"}
//             </div>
//           )}

//           {product && !isFetching && <ProductCard product={product} />}

//           {!product && !isFetching && !isError && (
//             <div className="text-center text-zinc-400 py-10 border-2 border-dashed border-zinc-200 rounded-2xl">
//               <p className="text-sm italic">Scan a barcode or type to see product details</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;
