import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Normalizes a paginated API response into a consistent shape.
 * API shape: { data: [], meta: { page, limit, total, totalPages, hasNextPage, hasPrevPage } }
 */
export function parsePaginatedResponse(result) {
  const meta = result.meta ?? {};
  return {
    data: Array.isArray(result.data) ? result.data : [],
    pagination: {
      page: meta.page ?? 1,
      limit: meta.limit ?? 20,
      totalDocs: meta.total ?? 0,
      totalPages: meta.totalPages ?? 1,
      hasNextPage: meta.hasNextPage ?? false,
      hasPrevPage: meta.hasPrevPage ?? false,
    },
  };
}

export default api;
