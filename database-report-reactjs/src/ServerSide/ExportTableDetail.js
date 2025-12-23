const axios = require("axios");

const getTableDetails = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.get(
      `http://172.16.10.82:1997/api/export/table?table_name_id=${id}`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const exportTableDetails = async (db_name_id, history_id) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/export/table`,
      {
        db_name_id: db_name_id,
        history_id: history_id,
      }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

module.exports = {
  getTableDetails,
  exportTableDetails,
};
