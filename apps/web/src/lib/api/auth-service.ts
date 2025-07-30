import { ApiClient } from './client';

export const authMe = async () => ApiClient.get<AuthMeResponse>('/api/auth/me');

export const authLogout = async () => ApiClient.post('/api/auth/logout');
