import axios, { AxiosRequestConfig } from "axios";
import { useNotificationStore } from "../store/notification.store";
import { useAppStore } from "../store/app.store";
import { localStorageToken } from "../types/constants";
axios.defaults.baseURL = "http://localhost:4200/";
const useAxios = () => {
  const { setError } = useNotificationStore();
  const { setLoading } = useAppStore();
  const fetchData = async (
    url: string,
    method: AxiosRequestConfig["method"],
    body: object | null = null,
    headers: AxiosRequestConfig["headers"] = {},
    defaultLoader: boolean = true
  ) => {
    try {
      setLoading(true && defaultLoader);
      headers["Authorization"] = `Bearer ${localStorage.getItem(
        localStorageToken
      )}`;
      const config: AxiosRequestConfig = { method, url, headers };
      if (body) {
        config.data = body;
      }
      const res = await axios(config);
      return res.data;
    } catch (err: any) {
      setLoading(false);
      setError((err.response.data.message || "something went wrong") as string);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData };
};

export default useAxios;
