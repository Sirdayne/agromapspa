import axios from 'axios';
import { Message } from 'element-ui';

let apiToken = axios.create({
  baseURL: 'http://agroplanapi-test.azurewebsites.net/',
  timeout: 180000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

let api = axios.create({
  baseURL: 'http://agroplanapi-test.azurewebsites.net/api/',
  timeout: 180000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  }
});

const pathLS = 'agromap.'

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
  getEntity(path){
    let data = this.getCache(path)
    if (data) {
      return data
    } else {
      this.get(path).then(res => {
        this.setCache(path, res)
        return res
      })
    }
  },
  getCache(path) {
    let entity = pathLS + path
    return JSON.parse(localStorage.getItem(entity))
  },
  setCache(path, data) {
    let entity = pathLS + path
    return localStorage.setItem(entity, JSON.stringify(data))
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
