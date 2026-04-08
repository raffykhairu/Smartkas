import api from './api';

const financeService = {
  getReport: async () => {
    const response = await api.get('/finance/report');
    return response.data;
  },

  exportPdf: async () => {
    const response = await api.get('/finance/export/pdf', {
      responseType: 'blob',
    });
    return response.data;
  },

  exportExcel: async () => {
    const response = await api.get('/finance/export/excel', {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default financeService;
