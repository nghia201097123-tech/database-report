const axios = require("axios");

const getDbRoot = async () => {
  try {
    // Gọi API gốc
    const response = await axios.get("http://172.16.10.82:1997/api/db-root");
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateDbRoot = async (id, input_name, input_env) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-root/${id}/update`,
      { name: input_name, env: input_env }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const createDbRoot = async (input_name, input_env) => {
  try {
    // Gọi API gốc

    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-root/create`,
      { name: input_name, env: input_env }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const changeStatusDbRoot = async (id) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-root/${id}/change-status`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Xuất module đúng cách
module.exports = {
  getDbRoot,
  updateDbRoot,
  createDbRoot,
  changeStatusDbRoot,
};
