import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { toggleCamera } from "../store/scannerSlice";

const ScannerView = ({ onScanSuccess }) => {
  const dispatch = useDispatch();
  const { isCameraOpen } = useSelector((state) => state.scanner);
  const qrCodeRef = useRef(null);

  // ক্যামেরা বন্ধ করার ফাংশন
  const stopScanner = useCallback(async () => {
    if (qrCodeRef.current && qrCodeRef.current.isScanning) {
      try {
        await qrCodeRef.current.stop();
        qrCodeRef.current = null; // ক্লিয়ার রেফারেন্স
        dispatch(toggleCamera(false)); // Redux স্টেট আপডেট
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isCameraOpen) {
      const html5QrCode = new Html5Qrcode("reader");
      qrCodeRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 20,
            qrbox: { width: 240, height: 128 }, // আপনার UI ফ্রেম (w-60 h-32) এর সাথে সামঞ্জস্যপূর্ণ
            aspectRatio: 1.0,
            formatsToSupport: [
              Html5QrcodeSupportedFormats.EAN_13,
              Html5QrcodeSupportedFormats.CODE_128,
            ],
          },
          (decodedText) => {
            // ১. প্রথমে স্ক্যান সফল হলে ডাটা পাঠানো
            onScanSuccess(decodedText);
            // ২. সাথে সাথে ক্যামেরা বন্ধ করা
            stopScanner();
          }
        )
        .catch((err) => console.error("Scanner start error:", err));
    }

    // কম্পোনেন্ট আনমাউন্ট হলে সেফলি ক্যামেরা বন্ধ করা
    return () => {
      if (qrCodeRef.current?.isScanning) {
        qrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [isCameraOpen, onScanSuccess, stopScanner]);

  return (
    <div className="w-full bg-black rounded-3xl overflow-hidden relative shadow-2xl h-80 border-4 border-white">
      {isCameraOpen ? (
        <>
          <div id="reader" className="w-full h-full"></div>
          
          {/* আপনার সিগনেচার ডিজাইন ফ্রেম */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative w-60 h-32 border-2 border-white/30 rounded-lg">
              {/* Corner Borders */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>
              
              {/* Scanning Animation */}
              <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
            </div>
            
            {/* Overlay Dim Effect */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center z-20">
            <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
              Scan Success will close camera
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3 bg-zinc-900">
           <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </div>
          <button 
            onClick={() => dispatch(toggleCamera(true))}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95"
          >
            Start New Scan
          </button>
        </div>
      )}
    </div>
  );
};

export default ScannerView;