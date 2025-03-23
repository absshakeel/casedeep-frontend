import axiosInstance from './userServices';

// Create certification order
export const createCertification = async (formData) => {
  const response = await axiosInstance.post('api/certifications', formData);
  return response.data;
};

// Upload identity document
export const uploadIdentity = async (cenobase62, formData) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/uploadidentity`, formData);
  return response.data;
};

// Upload deal documents
export const uploadDeal = async (cenobase62, formData) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/uploaddeal`, formData);
  return response.data;
};

// Submit certification
export const submitCertification = async (cenobase62) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/submit`);
  return response.data;
};

// Sign certification
export const signCertification = async (cenobase62, signname) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/signname/${signname}`);
  return response.data;
};

// Reject certification
export const rejectCertification = async (cenobase62, comment) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/reject/${comment}`);
  return response.data;
};

// Process payment
export const processCertificationPayment = async (cenobase62, amount) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/payment/${amount}`);
  return response.data;
};

// Set fee code
export const setFeeCode = async (cenobase62, code) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/feecode/${code}`);
  return response.data;
};

// Set commission rate
export const setCommissionRate = async (cenobase62, rate) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/commissionrate/${rate}`);
  return response.data;
};

// Approve certification
export const approveCertification = async (cenobase62, score) => {
  const response = await axiosInstance.patch(`api/certifications/${cenobase62}/approve/${score}`);
  return response.data;
};

// Get certification by CE number
export const getCertification = async (cenobase62) => {
  const response = await axiosInstance.get(`api/certifications/${cenobase62}`);
  return response.data;
};

// Get submitted certifications
export const getSubmittedCertifications = async () => {
  const response = await axiosInstance.get('api/certifications/status/submit');
  return response.data;
};

// Get my certifications
export const getMyCertifications = async () => {
  const response = await axiosInstance.get('api/certifications/me');
  return response.data;
};