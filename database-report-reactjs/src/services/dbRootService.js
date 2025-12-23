import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

const BASE_URL = "http://172.16.10.82:1999/api/db-root";

export const DbRootService = {
  getDbRoots: async () => {
    return await axiosGETMethod(`${BASE_URL}`);
  },

  create: (name, env) => {
    return axiosPOSTMethod(`${BASE_URL}/create`, {
      input_name: name,
      input_env: env,
    });
  },

  update: (data) => {
    return axiosPOSTMethod(`${BASE_URL}/update`, {
      id: data.id,
      input_name: data.input_name,
      input_env: data.input_env,
    });
  },

  changeStatus: (id) => {
    return axiosPOSTMethod(`${BASE_URL}/change-status`, { id });
  },
};
