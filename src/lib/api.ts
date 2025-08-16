import { getCookie } from 'cookies-next';

export function getAuthHeaders(): Record<string, string> {
  const token = getCookie('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Requested-From': 'frontend', // Add custom header
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}
