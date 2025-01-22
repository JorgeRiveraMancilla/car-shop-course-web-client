import axios, { AxiosInstance } from "axios";

export interface IAxiosConfig {
  baseUrl: string;
}

export default class AxiosClient {
  protected axios: AxiosInstance;
  protected baseUrl: string;
  constructor(config: IAxiosConfig) {
    const { baseUrl } = config;

    this.baseUrl = baseUrl;
    this.axios = axios.create({ baseURL: baseUrl });

    this.axios.interceptors.request.use(
      async (config) => {
        if (!config.headers) throw new Error("Config is not defined");

        return config;
      },
      (error) => {
        throw error;
      }
    );

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) throw error;

        if (error.response.status === 401) {
          window.location.replace("/");
        }

        throw error;
      }
    );
  }
}
