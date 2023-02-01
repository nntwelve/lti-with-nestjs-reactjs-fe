import Axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import { AppConfig } from './app-config';
import { getLtik } from './helpers/lti.helper';

const axios = Axios.create({
  baseURL: AppConfig.apiBase,
});

const cache = new LRU({ max: 10 });

// request interceptor to add ltik to request headers
axios.interceptors.request.use(
  async (config) => {
    const ltik = getLtik();
    if (ltik) {
      config.params = {
        ...config.params,
        ltik,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

configure({ axios, cache });
