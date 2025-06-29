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
      });

      const rawData = response.data;

      // Validasi tipe response
      if (!rawData || typeof rawData !== 'object') {
        throw new Error('Data dari server tidak valid');
      }

      // Jika data untuk tanggal tertentu tidak ditemukan, kembalikan kosong
      return {
        [date]: rawData[date] || [],
      };
    } catch (error: any) {
      console.error('❌ Gagal fetch agenda dari API:', error);
      throw new Error(error?.message || 'Gagal mengambil data agenda');
    }
  },
};

export default taskService;
