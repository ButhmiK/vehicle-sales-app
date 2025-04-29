import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  };

  export const register = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  };
  
  
export const fetchVehicles = async (filters: { price?: string; year?: string; type?: string }) => {
  const response = await api.get('/vehicles', { params: filters });
  return response.data;
};

export const createVehicle = async (vehicle: any) => {
  const response = await api.post('/vehicles', vehicle);
  return response.data;
};

export const updateVehicle = async (id: string, vehicle: any) => {
  const response = await api.put(`/vehicles/${id}`, vehicle);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  await api.delete(`/vehicles/${id}`);
};

export const fetchCustomers = async (filters: { name?: string }) => {
  const response = await api.get('/customers', { params: filters });
  return response.data;
};

export const createCustomer = async (customer: any) => {
  const response = await api.post('/customers', customer);
  return response.data;
};

export const updateCustomer = async (id: string, customer: any) => {
  const response = await api.put(`/customers/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  await api.delete(`/customers/${id}`);
};

export const fetchPayments = async () => {
  const response = await api.get('/payments');
  return response.data;
};

export const createPayment = async (payment: any) => {
  const response = await api.post('/payments', payment);
  return response.data;
};

export const updatePayment = async (id: string, payment: any) => {
  const response = await api.put(`/payments/${id}`, payment);
  return response.data;
};

export const deletePayment = async (id: string) => {
  await api.delete(`/payments/${id}`);
};

export const fetchSales = async (filters: { startDate?: string; endDate?: string }) => {
    const response = await api.get('/sales', { params: filters });
    return response.data;
 };
  
  
export const deleteSale = async (id: string) => {
    await api.delete(`/sales/${id}`);
  };
  export const createSale = async (sale: any) => {
    const response = await api.post('/sales', sale);
    return response.data;
  };
  
  export const updateSale = async (id: string, sale: any) => {
    const response = await api.put(`/sales/${id}`, sale);
    return response.data;
  };
  