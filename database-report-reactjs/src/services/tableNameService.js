import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const TableNameService = {
  getTableName: async () => {
    return await axiosGETMethod("http://172.16.10.82:1999/api/table");
  },

  updateIsLatestVersion: async (id) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/table/change-is-latest-version`,
      {
        id,
      }
    );
  },

  cloneExport: async (id, list_name) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/table/clone-export`,
      { id, list_name }
    );
  },

  updateNote: async (id, input_note) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/table/change-note`,
      {
        id,
        input_note,
      }
    );
  },

  getDetailTableName: async (id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/table/${id}/detail`
    );
  },
};
