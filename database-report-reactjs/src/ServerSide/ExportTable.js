const axios = require("axios");

const getTable = async () => {
  try {
    // Gọi API gốc
    const response = await axios.get("http://172.16.10.82:1997/api/table-name");
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateTableIsLatestVersion = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/table-name/${id}/change-is-latest-version`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateTableNote = async (id, input_note) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/table-name/${id}/change-note`,
      { note: input_note }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const cloneTableExport = async (id, list_name) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/table-name/${id}/clone-export`,
      { list_name }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const findOneTableName = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.get(
      `http://172.16.10.82:1997/api/table-name/${id}`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

module.exports = {
  getTable,
  updateTableIsLatestVersion,
  updateTableNote,
  cloneTableExport,
  findOneTableName,
};
