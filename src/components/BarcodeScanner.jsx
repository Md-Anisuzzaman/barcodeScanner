// import { useEffect, useRef, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
// import { setScannedData, toggleCamera } from "../store/scannerSlice";
// import { addItemFromScanner, clearScanError } from "../store/cartSlice";
// import { useLazyGetProductByBarcodeQuery } from "../store/productApiSlice";
// import Products from "./Products";
// // import ScanErrorToast from "./ScanErrorToast";

// const BarcodeScanner = () => {
//   const [trigger, { isFetching, isError, error }] =
//     useLazyGetProductByBarcodeQuery();
//   const dispatch = useDispatch();
//   const { scannedData, isCameraOpen } = useSelector((state) => state.scanner);
//   const qrCodeRef = useRef(null);
//   const isProcessingRef = useRef(false);
//   const { scanError } = useSelector((state) => state.cart);


//   const stopScanner = useCallback(() => {
//     if (qrCodeRef.current && qrCodeRef.current.isScanning) {
//       qrCodeRef.current
//         .stop()
//         .then(() => dispatch(toggleCamera(false)))
//         .catch((err) => console.error("Failed to stop scanner", err));
//     }
//   }, [dispatch]);


// useEffect(() => {
//   if (!isCameraOpen) return;

//   const html5QrCode = new Html5Qrcode("reader");
//   qrCodeRef.current = html5QrCode;

//   const config = {
//     fps: 20,
//     qrbox: { width: 250, height: 200 },
//     aspectRatio: 1.0,
//     formatsToSupport: [
//       Html5QrcodeSupportedFormats.EAN_13,
//       Html5QrcodeSupportedFormats.CODE_128,
//       Html5QrcodeSupportedFormats.CODE_39,
//       Html5QrcodeSupportedFormats.UPC_A,
//       Html5QrcodeSupportedFormats.UPC_E,
//     ],
//   };

//   const handleScan = async (decodedText) => {
//     if (isProcessingRef.current) return;
//     isProcessingRef.current = true;

//     dispatch(setScannedData(decodedText));

//     try {
//       const result = await trigger(decodedText).unwrap();

//       if (result) {
//         dispatch(addItemFromScanner(result));
//       }

//       // ✅ Delay so UI updates first
//       setTimeout(async () => {
//         await html5QrCode.stop();
//         dispatch(toggleCamera(false));
//       }, 800);

//     } catch (err) {
//       console.error("Scan Error:", err);

//       // ❗ Still close camera on error
//       setTimeout(async () => {
//         await html5QrCode.stop();
//         dispatch(toggleCamera(false));
//       }, 800);
//     } finally {
//       setTimeout(() => {
//         isProcessingRef.current = false;
//       }, 1000);
//     }
//   };

//   html5QrCode
//     .start({ facingMode: "environment" }, config, handleScan)
//     .catch((err) => console.error("Unable to start scanner", err));

//   return () => {
//     if (html5QrCode && html5QrCode.isScanning) {
//       html5QrCode.stop().catch((err) => console.log(err));
//     }
//   };
// }, [isCameraOpen, dispatch, trigger]);


//   return (
//     <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
//       {/* <ScanErrorToast /> */}
//       <div
//         className="w-full max-w-md bg-black rounded-2xl overflow-hidden relative shadow-2xl"
//         style={{ height: "350px" }}
//       >
//         {isCameraOpen ? (
//           <>
//             <div id="reader" className="w-full h-full"></div>
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
//               <div className="relative w-64 h-52 border-2 border-white/30 rounded-lg">
//                 <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
//                 <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
//                 <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
//                 <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>
//                 <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
//               </div>
//               <div className="absolute inset-0 bg-black/20"></div>
//             </div>
//             <div className="absolute bottom-4 left-0 right-0 text-center z-20">
//               <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
//                 Align barcode within frame
//               </span>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-3">
//             <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white text-2xl">
//               📷
//             </div>
//             <p className="text-sm font-medium">Camera is Off</p>
//           </div>
//         )}
//       </div>

//       <div className="flex gap-4 my-8 w-full max-w-md">
//         <button
//           onClick={() => dispatch(toggleCamera(true))}
//           disabled={isCameraOpen}
//           className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${isCameraOpen ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {isCameraOpen ? "Camera Active" : "Open Camera"}
//         </button>
//         <button
//           onClick={stopScanner}
//           className="bg-white border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-bold hover:bg-zinc-50 transition-all"
//         >
//           Stop
//         </button>

//         <button className="bg-slate-200 border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-bold">
//           Customer
//         </button>
//       </div>
//       {isFetching && (
//         <p className="text-blue-500 font-bold">Checking database...</p>
//       )}
//       {isError && <p className="text-red-500 font-bold">Product Not Found</p>}

//       <Products />
//     </div>
//   );
// };

// export default BarcodeScanner;


import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { setScannedData, toggleCamera } from "../store/scannerSlice";
import { addItemFromScanner, clearScanError } from "../store/cartSlice";
import { useLazyGetProductByBarcodeQuery } from "../store/productApiSlice";
import Products from "./Products";

const BarcodeScanner = () => {
  const [trigger, { isFetching, isError }] =
    useLazyGetProductByBarcodeQuery();

  const dispatch = useDispatch();

  const { isCameraOpen } = useSelector((state) => state.scanner);

  const { scanError } = useSelector((state) => state.cart); // ✅ USING scanError

  const qrCodeRef = useRef(null);
  const isProcessingRef = useRef(false);

  // ✅ STOP CAMERA FUNCTION (NO CHANGE)
  const stopScanner = useCallback(() => {
    if (qrCodeRef.current && qrCodeRef.current.isScanning) {
      qrCodeRef.current
        .stop()
        .then(() => dispatch(toggleCamera(false)))
        .catch((err) => console.error("Failed to stop scanner", err));
    }
  }, [dispatch]);

  // ✅ MAIN SCANNER EFFECT
  useEffect(() => {
    if (!isCameraOpen) return;

    const html5QrCode = new Html5Qrcode("reader");
    qrCodeRef.current = html5QrCode;

    const config = {
      fps: 20,
      qrbox: { width: 250, height: 200 },
      aspectRatio: 1.0,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
      ],
    };

    const handleScan = async (decodedText) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      dispatch(setScannedData(decodedText));

      try {
        const result = await trigger(decodedText).unwrap();

        if (result) {
          // ✅ DO NOT check duplicate here
          // Redux slice already handles duplicate logic
          dispatch(addItemFromScanner(result));
        }

        // ✅ DELAY → allow UI update before camera stops
        setTimeout(async () => {
          await html5QrCode.stop();
          dispatch(toggleCamera(false));
        }, 800);

      } catch (err) {
        console.error("Scan Error:", err);

        // ✅ STOP CAMERA EVEN IF PRODUCT NOT FOUND
        setTimeout(async () => {
          await html5QrCode.stop();
          dispatch(toggleCamera(false));
        }, 800);
      } finally {
        // ✅ RESET SCAN LOCK
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 1000);
      }
    };

    html5QrCode
      .start({ facingMode: "environment" }, config, handleScan)
      .catch((err) => console.error("Unable to start scanner", err));

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch((err) => console.log(err));
      }
    };
  }, [isCameraOpen, dispatch, trigger]);

  // ✅ ADDED: AUTO CLEAR duplicate error after 2 sec
  useEffect(() => {
    if (scanError) {
      const timer = setTimeout(() => {
        dispatch(clearScanError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [scanError, dispatch]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      
      <div
        className="w-full max-w-md bg-black rounded-2xl overflow-hidden relative shadow-2xl"
        style={{ height: "350px" }}
      >
        {isCameraOpen ? (
          <>
            <div id="reader" className="w-full h-full"></div>

            {/* Scanner UI */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="relative w-64 h-52 border-2 border-white/30 rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500"></div>
                <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <p>Camera is Off</p>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 my-6 w-full max-w-md">
        <button
          onClick={() => dispatch(toggleCamera(true))}
          disabled={isCameraOpen}
          className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          {isCameraOpen ? "Camera Active" : "Open Camera"}
        </button>

        <button
          onClick={stopScanner}
          className="bg-white border px-6 py-3 rounded-xl"
        >
          Stop
        </button>
        <button
          className="bg-slate-500 border px-6 py-3 rounded-xl text-amber-400"
        >
          Coustomer
        </button>
      </div>

      {/* ✅ API ERROR */}
      {isFetching && (
        <p className="text-blue-500 font-bold">Checking database...</p>
      )}

      {/* 🔴 Product not found */}
      {isError && (
        <p className="text-red-500 font-bold">Product Not Found</p>
      )}

      {/* 🟡 Duplicate product error */}
      {scanError && (
        <p className="text-yellow-500 font-bold">{scanError}</p>
      )}

      <Products />
    </div>
  );
};

export default BarcodeScanner;