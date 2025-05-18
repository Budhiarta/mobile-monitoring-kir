import api from './api';

export const submitMonitoringData = async (data: any) => {
  try {
    const response = await api.post('/monitoring', data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.error || 'Gagal submit monitoring';
    throw new Error(message);
  }
};
