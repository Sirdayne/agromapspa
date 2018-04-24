import axios from 'axios';
import { Message } from 'element-ui';

const BASE_URL = `http://agroplanapi-test.azurewebsites.net/`

let apiToken = axios.create({
  baseURL: BASE_URL,
  timeout: 180000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

let api = axios.create({
  baseURL: BASE_URL + 'api/',
  timeout: 180000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('agromap.token')
  return config;
}, function (error) {
  return Promise.reject(error);
});
//let AUTH_TOKEN = 'Bearer '+ localStorage.getItem('agromap.token')
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default{
  get(path) {
    return api.get(path)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError()
      });
  },
  postToken(path, data) {
    return apiToken.post(path, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.showError()
      });
  },
  showError() {
    Message({
      message: 'Ошибка',
      type: "error",
      duration: 5000,
      showClose: true,
    });
  }
}
