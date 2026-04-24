import { useSelector, useDispatch } from "react-redux";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { setScannedData, toggleCamera } from "../store/scannerSlice";

const BarcodeScanner = () => {
  const dispatch = useDispatch();
  const { scannedData, isCameraOpen } = useSelector((state) => state.scanner);

  const handleScan = (err, result) => {
    if (result) {
      dispatch(setScannedData(result.text));
      dispatch(toggleCamera(false));
    } else if (err) {
      console.log(err);

      if (err.name === "NotAllowedError") {
        console.error("User denied camera access");
      } else if (err.name === "NotFoundError") {
        console.error("No camera device found");
      } else {
        console.error("Scanner Error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      {/* Scanner Container */}
      <div
        className="w-full max-w-md bg-black rounded-2xl overflow-hidden relative shadow-2xl"
        style={{ height: "350px" }}
      >
        {isCameraOpen ? (
          <>
            <BarcodeScannerComponent
              width="100%"
              height="100%"
              onUpdate={handleScan}
            />

            {/* --- Rectangular Overlay Design --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* মেইন ফ্রেম */}
              <div className="relative w-64 h-52 border-2 border-white/30 rounded-lg">
                {/* corner border */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -ml-1 -mt-1 rounded-tl-sm"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 -mr-1 -mt-1 rounded-tr-sm"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -ml-1 -mb-1 rounded-bl-sm"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 -mr-1 -mb-1 rounded-br-sm"></div>

                {/* scanning animation  */}
                <div className="w-full h-0.5 bg-indigo-500 absolute top-0 animate-scan shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
              </div>

              {/* outside part of border (Optional) */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Instruction Text */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
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
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
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
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          {isCameraOpen ? "Camera Active" : "Open Camera"}
        </button>
        <button className="bg-white border border-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-bold hover:bg-zinc-50 transition-all">
          Customer
        </button>
      </div>

      {/* Result Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-zinc-100">
        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4">
          Scanned Information
        </h3>
        {scannedData ? (
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <p className="text-indigo-900 font-mono break-all text-sm">
              <span className="font-bold text-indigo-400 mr-2">DATA:</span>{" "}
              {scannedData}
            </p>
          </div>
        ) : (
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
