const axios = require("axios");

// Lấy danh sách kafka profile group ids
const getKafkaProfileGroupIds = async (kafkaProfileId) => {
  try {
    const response = await axios.get(
      "http://172.16.10.82:1997/api/kafka-profile-group-id",
      {
        params: {
          kafka_profile_id: kafkaProfileId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Tạo mới kafka profile group id
const createKafkaProfileGroupId = async (name, kafkaProfileId) => {
  try {
    const response = await axios.post(
      "http://172.16.10.82:1997/api/kafka-profile-group-id/create",
      {
        kafka_profile_id: kafkaProfileId,
        name: name,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật kafka profile group id
const updateKafkaProfileGroupId = async (id, name) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/kafka-profile-group-id/${id}/update`,
      {
        name: name,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thay đổi trạng thái kafka profile group id
const changeKafkaProfileGroupIdStatus = async (id) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/kafka-profile-group-id/${id}/change-status`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getKafkaProfileGroupIds,
  createKafkaProfileGroupId,
  updateKafkaProfileGroupId,
  changeKafkaProfileGroupIdStatus,
};
