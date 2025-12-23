import {
  axiosGETMethod,
  axiosPOSTMethod,
  axiosExportFilePOSTMethod,
} from "../utils/Axios/HttpRequest";

export const StoreFuncDetailService = {
  getStoreFuncDetails: async (store_func_name_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/store-func-details?store_func_name_id=${store_func_name_id}`
    );
  },

  exportStoreFuncDetails: async (db_name_id, history_id) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/export/store-func-details`,
      {
        db_name_id,
        history_id,
      }
    );
  },

  /**
   *
   * @param {*} db_name_id
   * @param {*} history_id
   * @param {*} list_name
   * @returns
   */
  exportFileStoreFuncDetails: async (db_name_id, history_id, list_name) => {
    return await axiosExportFilePOSTMethod(
      `http://172.16.10.82:1999/api/export/file-store-func-details`,
      {
        db_name_id,
        history_id,
        list_name,
      }
    );
  },
};
