import { useSelector, useDispatch } from 'react-redux';
import {
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
} from '../store/slices/userSlice';

export const useUserRedux = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const updateUser = (user) => dispatch(setUser(user));
  const updateOrderData = (data) => dispatch(setOrderData(data));
  const updateSelectedLanguage = (lang) => dispatch(setSelectedLanguage(lang));
  const updateSelectedUserType = (type) => dispatch(setSelectedUserType(type));
  const updateSelectedPlan = (plan) => dispatch(setSelectedPlan(plan));
  const updateSelectedPaymentMethod = (method) => dispatch(setSelectedPaymentMethod(method));
  const updateDeliveryInfo = (info) => dispatch(setDeliveryInfo(info));
  const updateContractInfo = (info) => dispatch(setContractInfo(info));
  const updateConfirmationInfo = (info) => dispatch(setConfirmationInfo(info));
  const updateRating = (rating) => dispatch(setRating(rating));
  const clearUser = () => dispatch(clearUserData());

  return {
    ...userData,
    updateUser,
    updateOrderData,
    updateSelectedLanguage,
    updateSelectedUserType,
    updateSelectedPlan,
    updateSelectedPaymentMethod,
    updateDeliveryInfo,
    updateContractInfo,
    updateConfirmationInfo,
    updateRating,
    clearUser
  };
};