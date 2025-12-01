export interface RequestOptions extends UniNamespace.RequestOptions {}

export const apiBase = uni.getStorageSync('API_BASE') || 'https://api.example.com';

export function request<T = unknown>(options: RequestOptions) {
  return uni.request<T>({
    url: `${apiBase}${options.url}`,
    method: options.method ?? 'GET',
    header: {
      Authorization: `Bearer ${uni.getStorageSync('TOKEN')}`,
      ...options.header
    },
    data: options.data,
    timeout: options.timeout ?? 10000
  });
}

