import api from './api';

export type AgendaItem = {
  id: string;
  tester: string;
  device: string;
  documentation: string;
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

    // Grup berdasarkan tester + device
    const grouped: Record<string, AgendaItem> = {};

    for (const item of rawData) {
      const key = `${item.monitoring.Tester}-${item.task.device.devicename}`;
      if (!grouped[key]) {
        grouped[key] = {
          id: key,
          tester: item.monitoring.Tester,
          device: item.task.device.devicename,
          documentation: item.monitoring.documentation,
          details: [item.task.activity],
          tasks: [item.task.activity], // ✅ ubah ke string
        };
      } else {
        grouped[key].details.push(item.task.activity);
        grouped[key].tasks.push(item.task.activity); // ✅ tambahkan task-nya
      }
    }

    // Format ke dalam { [date]: AgendaItem[] }
    const agendaItems: AgendaItems = {
      [date]: Object.values(grouped),
    };

    return agendaItems;
  },
};

export default taskService;
