import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getBalance = (userId: number) => api.get(`/users/${userId}/balance`).then(res => res.data);
export const getUsers = () => api.get('/users').then(res => res.data);
export const createExpense = (data: any) => api.post('/expenses', data).then(res => res.data);