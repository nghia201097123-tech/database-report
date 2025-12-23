const axios = require("axios");

const getKafkaProfile = async (projectId, leaderProfileId) => {
  try {
    const response = await axios.get(
      "http://172.16.10.82:1997/api/kafka-profile",
      {
        params: {
          project_id: projectId,
          kafka_profile_leader_id: leaderProfileId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createKafkaProfile = async (
  projectId,
  leaderProfileId,
  name,
  host,
  port
) => {
  try {
    const response = await axios.post(
      "http://172.16.10.82:1997/api/kafka-profile/create",
      {
        project_id: projectId,
        kafka_profile_leader_id: leaderProfileId,
        name: name,
        host: host,
        port: port,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateKafkaProfile = async (
  id,
  projectId,
  leaderProfileId,
  name,
  host,
  port
) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/kafka-profile/${id}/update`,
      {
        project_id: projectId,
        kafka_profile_leader_id: leaderProfileId,
        name: name,
        host: host,
        port: port,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changeKafkaProfileStatus = async (id) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/kafka-profile/${id}/change-status`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getKafkaProfile,
  createKafkaProfile,
  updateKafkaProfile,
  changeKafkaProfileStatus,
};
