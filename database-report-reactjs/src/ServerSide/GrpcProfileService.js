const axios = require("axios");

const createGrpcProfileService = async (grpc_profile_id, services) => {
  try {
    const response = await axios.post(
      "http://172.16.10.82:1997/api/grpc-profile-services/create",
      {
        grpc_profile_id,
        services,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xuất module đúng cách
module.exports = {
  createGrpcProfileService,
};
