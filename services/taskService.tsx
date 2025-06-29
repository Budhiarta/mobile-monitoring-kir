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
    try {
      const response = await api.get('/task/checkedBydate', {
        params: { date },
        headers: {
          'Cache-Control': 'no-cache', // ✅ Hindari cache 304
        },
      });

      const rawData = response.data;

      if (!rawData || typeof rawData !== 'object' || Array.isArray(rawData)) {
        throw new Error('Data dari server tidak valid (format object diharapkan)');
      }

      console.log('📅 Agenda Diterima:', Object.keys(rawData));

      return rawData as AgendaItems;
    } catch (error: any) {
      console.error('❌ Gagal fetch agenda:', error?.message);
      throw new Error(error?.message || 'Gagal mengambil data agenda');
    }
  },
};

export default taskService;
