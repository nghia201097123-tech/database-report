import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const StoreFuncService = {
  getStoreFunc: async () => {
    return await axiosGETMethod("http://172.16.10.82:1999/api/store-func");
  },

  updateIsLatestVersion: async (id) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/store-func/change-is-latest-version`,
      {
        id,
      }
    );
  },

  cloneExport: async (id, list_name) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/store-func/clone-export`,
      { id, list_name }
    );
  },

  updateNote: async (id, input_note) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/store-func/change-note`,
      {
        id,
        input_note,
      }
    );
  },

  getDetailStoreFunc: async (id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/store-func/${id}/detail`
    );
  },
};
