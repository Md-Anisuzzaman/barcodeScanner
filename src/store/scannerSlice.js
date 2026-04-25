import { createSlice } from '@reduxjs/toolkit';

const scannerSlice = createSlice({
  name: 'scanner',
  initialState: {
    scannedData: null,
    isCameraOpen: false,
  },
  reducers: {
    setScannedData: (state, action) => {
      console.log(state.scannedData, action.payload);
      state.scannedData = action.payload;
    },
    toggleCamera: (state, action) => {
      state.isCameraOpen = action.payload;
    },
  },
});

export const { setScannedData, toggleCamera } = scannerSlice.actions;
export default scannerSlice.reducer;