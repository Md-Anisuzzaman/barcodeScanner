import { createSlice } from '@reduxjs/toolkit';

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: {
    scannedData: null,
    isCameraOpen: false,
  },
  reducers: {
    setScannedData: (state, action) => {
      console.log("setScannedData", state, action.payload);
      state.scannedData = action.payload;
    },
    toggleCamera: (state, action) => {
      console.log("toggleCamera", state, action.payload);
      state.isCameraOpen = action.payload;
    },
    // setScanError: (state, action) => {
    //   state.scanError = action.payload; // New action
    // },
    // clearScanError: (state) => {
    //   state.scanError = null; // New action
    // },
  },
});

export const { setScannedData, toggleCamera } = scannerSlice.actions;
export default scannerSlice.reducer;