import api from './api';

export const submitReportData = async (data: any) => {
  const response = await api.post('/report', data);
  return response.data;
};

export const getReportsData = async () => {
  const response = await api.get('/reports');
  return response.data;
};
