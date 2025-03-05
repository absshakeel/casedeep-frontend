import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  orderData: null,
  selectedLanguage: 'en',
  selectedUserType: null,
  selectedPlan: null,
  selectedPaymentMethod: null,
  deliveryInfo: null,
  contractInfo: null,
  confirmationInfo: null,
  rating: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedUserType: (state, action) => {
      state.selectedUserType = action.payload;
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload;
    },
    setContractInfo: (state, action) => {
      state.contractInfo = action.payload;
    },
    setConfirmationInfo: (state, action) => {
      state.confirmationInfo = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    clearUserData: (state) => {
      return initialState;
    }
  }
});

export const {
  setUser,
  setOrderData,
  setSelectedLanguage,
  setSelectedUserType,
  setSelectedPlan,
  setSelectedPaymentMethod,
  setDeliveryInfo,
  setContractInfo,
  setConfirmationInfo,
  setRating,
  clearUserData
} = userSlice.actions;

export default userSlice.reducer;