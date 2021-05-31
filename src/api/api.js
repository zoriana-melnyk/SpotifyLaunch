import axios from 'axios';
import { baseURL } from '../config';

const REQUEST_METHODS = {
   get: 'GET',
   post: 'POST',
   delete: 'DELETE',
   update: 'PUT'
}

const axiosConfig = {
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 5000
};

const axiosInstance = axios.create(axiosConfig);

const api = {
   request(options) {
      return axiosInstance(options)
         .then(res => res.data)
         .catch(async error => {
            console.error(error);
         })
   }
};

export {
   api,
   REQUEST_METHODS
};
