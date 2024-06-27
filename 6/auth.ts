import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});
authInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["authorization"] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await authInstance.get("auth/token/refresh/");
        localStorage.setItem("access_token", response.headers["authorization"]);
        originalRequest.headers["authorization"] = response.headers["authorization"];
        return authInstance(originalRequest);
      } catch (e: any) {
        if (e.response.status === 400 || e.response.status === 500) {
          localStorage.removeItem("access_token");
          const response = await authInstance.post("auth/logout/");
          if (response.status === 200) {
            // localStorage.removeItem("access_token");
            window.dispatchEvent(new Event("storage"));
          }
        }
        console.log(e);
      }
    }

    return Promise.reject(error);
  },
);

export default authInstance;