import { getCookie } from 'cookies-next';

export function getAuthHeaders() {
  const token = getCookie('token');
  if (token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  return { 'Content-Type': 'application/json' };
}
