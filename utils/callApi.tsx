import {accessToken} from '@/utils/localStorage';

async function http<T>(path: string, config: RequestInit) {
  let token = null;
  if (typeof window !== 'undefined') {
    token = accessToken();
  }
  const isLoggedIn = !!token;
  const headers = {
    'Content-Type': 'application/json',
    'Accept-language': 'en',
  };
  const request = new Request(path, {
    ...config,
    headers: isLoggedIn ? {...headers, Authorization: `Bearer ${token}`} : {...headers},
  });
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status === 401) {
    window?.localStorage?.removeItem('accessToken');
  }
  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {method: 'get', ...config};
  return await http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {method: 'post', body: JSON.stringify(body), ...config};
  return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {method: 'put', body: JSON.stringify(body), ...config};
  return await http<U>(path, init);
}
