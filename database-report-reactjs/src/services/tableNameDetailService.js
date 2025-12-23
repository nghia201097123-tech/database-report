import {
  axiosGETMethod,
  axiosPOSTMethod,
  axiosExportFilePOSTMethod,
} from "../utils/Axios/HttpRequest";

export const TableNameDetailService = {
  getTableNameDetails: async (table_name_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/table-details?table_name_id=${table_name_id}`
    );
  },

  exportTableNameDetails: async (db_name_id, history_id) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/export/table-details`,
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
  exportFileTableNameDetails: async (db_name_id, history_id, list_name) => {
    return await axiosExportFilePOSTMethod(
      `http://172.16.10.82:1999/api/export/file-table-details`,
      {
        db_name_id,
        history_id,
        list_name,
      }
    );
  },
};
