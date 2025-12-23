const axios = require("axios");

const getProject = async () => {
  try {
    // Gọi API gốc
    const response = await axios.get("http://172.16.10.82:1997/api/project");
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const createProject = async (input_project_name) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      `http://172.16.10.82:1997/api/project/create`,
      { name: input_project_name }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const changeStatusProject = async (id) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/project/${id}/change-status`
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const updateProject = async (id, input_project_name) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/project/${id}/update`,
      { name: input_project_name }
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Xuất module đúng cách
module.exports = {
  getProject,
  createProject,
  changeStatusProject,
  updateProject,
};
