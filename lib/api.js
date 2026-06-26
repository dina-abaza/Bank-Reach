import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({ baseURL: BASE_URL });

// ---- حالة الـ refresh ----
let isRefreshing = false;
let failedQueue  = []; // طلبات انتظرت أثناء التجديد

function processQueue(error, token = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
}

function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

// ---- Request interceptor: يضيف التوكن ----
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Response interceptor: يتعامل مع 401 ----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (typeof window === 'undefined') return Promise.reject(error);

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      clearSession();
      return Promise.reject(error);
    }

    // لو في refresh جاري، أضف الطلب للقايمة وانتظر
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      });
    }

    original._retry  = true;
    isRefreshing     = true;

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
      const newAccess  = data.data.accessToken;
      const newRefresh = data.data.refreshToken;

      localStorage.setItem('accessToken',  newAccess);
      localStorage.setItem('refreshToken', newRefresh);

      api.defaults.headers.Authorization  = `Bearer ${newAccess}`;
      original.headers.Authorization      = `Bearer ${newAccess}`;

      processQueue(null, newAccess);
      return api(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export function parsePaginatedResponse(result) {
  const meta = result.meta ?? {};
  return {
    data: Array.isArray(result.data) ? result.data : [],
    pagination: {
      page:        meta.page        ?? 1,
      limit:       meta.limit       ?? 20,
      totalDocs:   meta.total       ?? 0,
      totalPages:  meta.totalPages  ?? 1,
      hasNextPage: meta.hasNextPage ?? false,
      hasPrevPage: meta.hasPrevPage ?? false,
    },
  };
}

export default api;
