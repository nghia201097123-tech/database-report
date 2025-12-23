const axios = require("axios");

const CheckProtoAndGetInfo = async (input_proto_text) => {
  try {
    // Gọi API gốc
    const response = await axios.post(
      "http://172.16.10.82:1997/api/grpc-profile/check-proto-and-get-info",
      { proto_text: input_proto_text }
    );

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

const createGrpcProfile = async (
  project_id,
  service_server_id,
  proto_text_original,
  proto_text_validator,
  package_name
) => {
  try {
    const response = await axios.post(
      "http://172.16.10.82:1997/api/grpc-profile/create",
      {
        project_id,
        service_server_id,
        proto_text_original,
        proto_text_validator,
        package_name,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGrpcProfiles = async (project_id) => {
  try {
    const response = await axios.get(
      `http://172.16.10.82:1997/api/grpc-profile?project_id=${project_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGrpcProfileByPackage = async (package) => {
  try {
    const response = await axios.get(
      `http://172.16.10.82:1997/api/grpc-profile/get-by-package?package=${package}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xuất module đúng cách
module.exports = {
  CheckProtoAndGetInfo,
  createGrpcProfile,
  getGrpcProfiles,
  getGrpcProfileByPackage,
};
