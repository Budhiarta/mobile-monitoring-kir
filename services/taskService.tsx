import api from './api';

export type AgendaItem = {
  id: string;
  tester: string;
  device: string;
  documentation: string;
  signature: string;
  details: string[];
  tasks: string[];
  sumary: string; // ✅ Tambahan: ringkasan hasil monitoring
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

      if (!rawData || typeof rawData !== 'object') {
        throw new Error('Data dari server tidak valid');
      }

      // Pastikan data yang dikembalikan sesuai struktur AgendaItem[]
      const items: AgendaItem[] = (rawData[date] || []).map((item: any) => ({
        id: item.id,
        tester: item.tester,
        device: item.device,
        documentation: item.documentation,
        signature: item.signature,
        details: item.details || [],
        tasks: item.tasks || [],
        sumary: item.sumary || '', // ✅ Ambil sumary jika ada
      }));

      return { [date]: items };
    } catch (error: any) {
      console.error('❌ Gagal fetch agenda dari API:', error);
      throw new Error(error?.message || 'Gagal mengambil data agenda');
    }
  },
};

export default taskService;
