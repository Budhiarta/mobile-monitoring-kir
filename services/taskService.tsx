import api from './api';

export type AgendaItem = {
  id: string;
  tester: string;
  device: string;
  documentation: string;
  signature: string;
  details: string[];
  tasks: string[];
  height?: number;
};

export type AgendaItems = Record<string, AgendaItem[]>;

const taskService = {
  getCheckedTaskByDate: async (date: string): Promise<AgendaItems> => {
    const response = await api.get('/task/checkedBydate', {
      params: { date },
    });

    const rawData = response.data;

    if (!rawData || typeof rawData !== 'object') {
      throw new Error('Data dari server tidak valid');
    }
    return rawData;
  },
};

export default taskService;
