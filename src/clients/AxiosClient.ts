import { createAxiosInstance } from '@/config/axios';

export default class AxiosClient {
  protected axios;

  constructor() {
    this.axios = createAxiosInstance();
  }
}
