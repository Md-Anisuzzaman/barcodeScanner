import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { setScannedData, toggleCamera } from "../store/scannerSlice";
import { Loader2 } from "lucide-react";

const ScannerView = ({ isCameraOpen, isFetching, onScanSuccess }) => {
  const dispatch = useDispatch();
  const qrCodeRef = useRef(null);

  const stopScanner = useCallback(() => {
    if (qrCodeRef.current?.isScanning) {
      qrCodeRef.current.stop().then(() => dispatch(toggleCamera(false)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isCameraOpen) {
      const html5QrCode = new Html5Qrcode("reader");
      qrCodeRef.current = html5QrCode;
      
      html5QrCode.start(
        { facingMode: "environment" },
        { 
          fps: 20, 
          qrbox: { width: 250, height: 200 }, 
          aspectRatio: 1.0,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.QR_CODE 
          ]
        },
        (decodedText) => {
          dispatch(setScannedData(decodedText));
          onScanSuccess(decodedText);
        }
      ).catch(console.error);
    }
    return () => {
      if (qrCodeRef.current?.isScanning) qrCodeRef.current.stop().catch(() => {});
    };
  }, [isCameraOpen, onScanSuccess, dispatch]);

  return (
    <>
      <div className="w-full max-w-md bg-black rounded-2xl overflow-hidden relative shadow-2xl h-87.5">
        {isCameraOpen ? (
          <>
            <div id="reader" className="w-full h-full"></div>
            {isFetching && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
                <Loader2 className="animate-spin text-white w-10 h-10" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="relative w-64 h-52 border-2 border-white/30 rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>
                <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <button onClick={() => dispatch(toggleCamera(true))} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Open Camera</button>
          </div>
        )}
      </div>

      <div className="flex gap-4 my-6 w-full max-w-md">
        <button onClick={stopScanner} className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold">Stop Scan</button>
        <button className="bg-white border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-bold">Customer</button>
      </div>
    </>
  );
};

export default ScannerView;