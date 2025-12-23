const axios = require("axios");

const getStoreFuncDetails = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.get(
      `http://172.16.10.82:1997/api/export/store-func?store_func_name_id=${id}`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const exportStoreFuncDetails = async (db_name_id, history_id) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/export/store-func`,
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

const exportFileStoreFuncDetails = async (
  db_name_id,
  history_id,
  list_name
) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/export/file-store-func`,
      {
        db_name_id: db_name_id,
        history_id: history_id,
        list_name: list_name,
      }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

module.exports = {
  getStoreFuncDetails,
  exportStoreFuncDetails,
  exportFileStoreFuncDetails,
};
