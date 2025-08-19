import axios from "axios";

export const API_BASE_URL = "https://748eed7a67e3.ngrok-free.app/api/v1";

const api = axios.create({
  // baseURL from here was removed to prevent duplicate URLs.
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

/**
 * Safely retrieves the user object from localStorage.
 * This function ensures we always get the latest user data.
 * @returns {object|null} The parsed user object or null if not found/invalid.
 */
const getUserFromStorage = () => {
  try {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

/**
 * A collection of functions to generate API endpoints dynamically.
 * This ensures the most current school_id is used for every request.
 */
export const endpoints = {
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  schools: `${API_BASE_URL}/schools`,
  docs: `${API_BASE_URL}/docs`,
  meets: `${API_BASE_URL}/sessions`,
  cheques: `${API_BASE_URL}/sessions`,

  
  // Endpoints that depend on school_id are now functions.
  teachers: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/teachers`;
  },
  hozor: () => { const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/teacher/current-attendance-sheet`;
  },
  weekday: () => { const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/classes/${schoolId}/schedule-builder`;
  },
    getScheduleData: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/classes/${schoolId}/schedule-builder`;
  },
  alert: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/time-slots?school_id=${schoolId}`;
  },
  timeslot: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/time-slots`;
  },
  students: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/students`;
  },
  dashboard: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/dashboard-stats`;
  },
  classes: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/classes`;
  },
  getmajor: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/offered-fields`;
  },
  getacademic: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/academic-levels`;
  },
  getgrade: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools/${schoolId}/grade-levels`;
  },
  getSchools: () => {
    const schoolId = getUserFromStorage()?.school_id;
    return `${API_BASE_URL}/schools`;
  },
  updateclass: (classId) => `${API_BASE_URL}/classes/${classId}`,

  // Location endpoints
  locations: {
    getProvinces: `${API_BASE_URL}/locations/provinces`,
    getCities: (provinceId) => `${API_BASE_URL}/locations/${provinceId}/cities`,
    getSectors: (cityId) => `${API_BASE_URL}/locations/${cityId}/sectors`,
    getZones: (sectorId) => `${API_BASE_URL}/locations/${sectorId}/zones`,
  },
};

/**
 * Sets or removes the Authorization token header for all API requests.
 * @param {string|null} token - The JWT token.
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/**
 * Sets or removes the X-School-ID header.
 * @param {string|number|null} schoolId
 */
export const setSchoolIdHeader = (schoolId) => {
  if (schoolId) {
    api.defaults.headers.common["X-School-ID"] = schoolId;
  } else {
    delete api.defaults.headers.common["X-School-ID"];
  }
};

/**
 * Sets up a global response interceptor to handle common HTTP errors like 401 and 403.
 * @param {function} navigate - The navigate function from React Router.
 */
export const setupResponseInterceptor = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        localStorage.removeItem("user");
        setAuthToken(null);
        navigate("/login", { state: { reason: "session-expired" } });
      } else if (status === 403) {
        navigate("/ErrorAccess", { state: { reason: "access-denied" } });
      }

      return Promise.reject(error);
    }
  );
};

export default api;