import {
  axiosGETMethod,
  axiosPOSTMethod,
  axiosExportFilePOSTMethod,
} from "../utils/Axios/HttpRequest";

export const TableDetailService = {
  // Get table change history
  getTableDetails: async (table_name_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/table-details?table_name_id=${table_name_id}`
    );
  },

  // KIỂM TRA - Detect and export table changes
  exportTableDetails: async (db_name_id, history_id) => {
    return await axiosPOSTMethod(
      `http://172.16.10.82:1999/api/export/table-details`,
      {
        db_name_id,
        history_id,
      }
    );
  },

  // XUẤT FILE - Export changes to SQL file
  /**
   * @param {number} db_name_id - Database ID
   * @param {number} history_id - Table snapshot ID
   * @param {string[]} list_name - Array of table names to export
   * @returns {Promise} - File download
   */
  exportFileTableDetails: async (db_name_id, history_id, list_name) => {
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
