const axios = require("axios");

const getStoreFunc = async () => {
  try {
    // Gọi API gốc
    const response = await axios.get(
      "http://172.16.10.82:1997/api/store-func-name"
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateIsLatestVersion = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/store-func-name/${id}/change-is-latest-version`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const cloneExport = async (id, list_name) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/store-func-name/${id}/clone-export`,
      { list_name }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateNote = async (id, input_note) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/store-func-name/${id}/change-note`,
      { note: input_note }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const findOneStoreFuncName = async (id) => {
  try {
    // Gọi API gốc
    const response = await axios.get(
      `http://172.16.10.82:1997/api/store-func-name/${id}`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
module.exports = {
  getStoreFunc,
  updateIsLatestVersion,
  cloneExport,
  updateNote,
  findOneStoreFuncName,
};
