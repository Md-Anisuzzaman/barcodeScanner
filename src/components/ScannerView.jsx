import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { toggleCamera } from "../store/scannerSlice";

const ScannerView = ({ onScanSuccess }) => {
  const dispatch = useDispatch();
  const { isCameraOpen } = useSelector((state) => state.scanner);
  const qrCodeRef = useRef(null);

  const stopScanner = useCallback(async () => {
    if (qrCodeRef.current && qrCodeRef.current.isScanning) {
      try {
        await qrCodeRef.current.stop();
        qrCodeRef.current = null;
        dispatch(toggleCamera(false));
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    // ক্যামেরা ওপেন হলে এবং রিডার আইডি ডোম-এ থাকলে শুরু হবে
    if (isCameraOpen) {
      const startCamera = async () => {
        // ছোট ডিলে যাতে ডোম এলিমেন্টটি রেন্ডার হওয়ার সময় পায়
        await new Promise((r) => setTimeout(r, 100));

        if (!document.getElementById("reader") || !isMounted) return;

        const html5QrCode = new Html5Qrcode("reader");
        qrCodeRef.current = html5QrCode;

        const config = {
          fps: 20,
          qrbox: { width: 240, height: 128 },
          // aspectRatio: 1.0, // এটি অনেক সময় স্ক্যানিং স্লো করে দেয়, রিমুভ করে দেখতে পারেন
          formatsToSupport: [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.QR_CODE,
          ],
        };

        try {
          await html5QrCode.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
              onScanSuccess(decodedText);
              stopScanner();
            },
          );
        } catch (err) {
          console.error("Unable to start scanner", err);
        }
      };

      startCamera();
    }

    return () => {
      isMounted = false;
      if (qrCodeRef.current?.isScanning) {
        qrCodeRef.current.stop().catch(() => {});
      }
    };
    // ডিপেন্ডেন্সি থেকে onScanSuccess এবং stopScanner সরিয়ে ফেলুন যদি সেগুলো মেমোয়াইজড না থাকে
  }, [isCameraOpen, onScanSuccess, stopScanner]);

  return (
    <div className="w-full bg-black rounded-3xl overflow-hidden relative shadow-2xl h-80 border-4 border-white">
      {isCameraOpen ? (
        <>
          {/* এই আইডি টি যেন ঠিক থাকে */}
          <div id="reader" className="w-full h-full object-cover"></div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative w-60 h-32 border-2 border-white/30 rounded-lg">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>
              <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan"></div>
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3 bg-zinc-900">
          <button
            onClick={() => dispatch(toggleCamera(true))}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Start New Scan
          </button>
        </div>
      )}
    </div>
  );
};

export default ScannerView;
