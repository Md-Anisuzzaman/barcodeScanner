import { useDispatch, useSelector } from "react-redux";
import { clearScanError } from "../store/cartSlice";
import { useEffect } from "react";

// 1. Create a separate component for the error
export default function ScanErrorToast() {
  const dispatch = useDispatch();
  const scanError = useSelector((state) => state.cart.scanError);

  useEffect(() => {
    if (scanError) {
      const timer = setTimeout(() => {
        dispatch(clearScanError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanError, dispatch]);

  if (!scanError) return null;

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-100 animate-pulse">
      <div className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white">
        <span className="font-bold">⚠️ {scanError}</span>
      </div>
    </div>
  );
};

    

