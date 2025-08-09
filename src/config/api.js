import axios from "axios";

export const API_BASE_URL = "https://072a891c5f8f.ngrok-free.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export const endpoints = {
  login: `${API_BASE_URL}/auth/login`,
  teachers: `${API_BASE_URL}/teachers`,
  alert: `${API_BASE_URL}/time-slots?school_id=1`,
  students: `${API_BASE_URL}/students`,
  schools: `${API_BASE_URL}/schools`,
  logout: `${API_BASE_URL}/auth/logout`,
  dashboard : `${API_BASE_URL}/schools/1/dashboard-stats`,
  classes: `${API_BASE_URL}/schools/1/classes`,
  getmajor: `${API_BASE_URL}/schools/1/offered-fields`,
  getgrade: `${API_BASE_URL}/schools/1/academic-levels`,
};


// توکن ست یا حذف کن
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const setSchoolIdHeader = (schoolId) => {
  if (schoolId) {
    api.defaults.headers.common["X-School-ID"] = schoolId;
  } else {
    delete api.defaults.headers.common["X-School-ID"];
  }
};
// ✅ هندل کردن 401 از بیرون:

export const setupResponseInterceptor = (navigate, setUser) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        
        navigate("/login", { state: { reason: "session-expired" } }); // 👈 همین لحظه ری‌دایرکت میشه

      }
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        localStorage.removeItem("user");
        
        navigate("/ErorrAccess", { state: { reason: "session-expired" } }); 

      }
      return Promise.reject(error);
    }
  );
};

export default api;
