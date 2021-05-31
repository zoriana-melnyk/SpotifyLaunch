
import {
   api,
   REQUEST_METHODS
} from './api';

const baseUrl = '/users';

const githubApi = {
   getUser: (userName) => {
      return api.request({
         url: `${baseUrl}/${userName}`,
         method: REQUEST_METHODS.get
      })
   }
};

export {
   githubApi
}