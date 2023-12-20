import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const { REACT_APP_API_URL } = process.env;

class Api {
  private api: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: REACT_APP_API_URL,
    });
    axiosInstance.interceptors.response.use(
      (res) => {
        // console.log(`axios response => ${JSON.stringify(res.data, null, 2)}`);
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.api = axiosInstance;
  }

  private async get(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.api.get(url, config);
    return data;
  }

  public async fetchFeed(appId: string, countryCode: string, config?: AxiosRequestConfig) {
    const result = await this.get(`/feed/${appId}/${countryCode}/entries`, config);
    return result;
  }
}

export const api = new Api();
