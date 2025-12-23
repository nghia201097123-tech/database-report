const axios = require("axios");

const getService = async () => {
  try {
    // Gọi API gốc
    const response = await axios.get("http://172.16.10.82:1997/api/service");
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const createService = async (projectId, serviceName) => {
  const response = await axios.post(
    "http://172.16.10.82:1997/api/service/create",
    {
      project_id: parseInt(projectId),
      name: serviceName,
    }
  );
  return response.data; // Chỉ trả về data từ response
};

const changeStatus = async (id) => {
  const response = await axios.post(
    `http://172.16.10.82:1997/api/service/${id}/change-status`
  );
  return response.data; // Trả về data từ response
};

const updateService = async (id, projectId, serviceName) => {
  const response = await axios.post(
    `http://172.16.10.82:1997/api/service/${id}/update`,
    {
      project_id: projectId,
      name: serviceName,
    }
  );
  return response.data; // Trả về data từ response
};

module.exports = {
  getService,
  createService,
  changeStatus,
  updateService,
};
