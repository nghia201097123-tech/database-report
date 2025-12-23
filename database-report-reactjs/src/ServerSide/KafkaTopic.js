const axios = require("axios");

const getKafkaTopicLookUp = async (key, kafka_profile_id, project_id) => {
  try {
    const response = await axios.get(
      "http://172.16.10.82:1997/api/kafka-topic/look-up",
      {
        params: {
          key: key,
          kafka_profile_id: kafka_profile_id,
          project_id: project_id,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createKafkaTopic = async (
  project_id,
  producer_service_ids,
  consumer_service_id,
  kafka_profile_id,
  kafka_profile_group_id,
  key,
  json,
  note
) => {
  try {
    const response = await axios.post(
      "http://172.16.10.82:1997/api/kafka-topic/create",
      {
        project_id: project_id,
        producer_service_ids: producer_service_ids,
        consumer_service_id: consumer_service_id,
        kafka_profile_id: kafka_profile_id,
        kafka_profile_group_id: kafka_profile_group_id,
        key: key,
        json: json,
        note: note,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateKafkaTopic = async (
  id,
  producer_service_ids,
  consumer_service_id,
  kafka_profile_id,
  kafka_profile_group_id,
  key,
  json,
  note
) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/kafka-topic/${id}/update`,
      {
        producer_service_ids: producer_service_ids,
        consumer_service_id: consumer_service_id,
        kafka_profile_id: kafka_profile_id,
        kafka_profile_group_id: kafka_profile_group_id,
        key: key,
        json: json,
        note: note,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getKafkaTopic = async (kafka_profile_id) => {
  try {
    const response = await axios.get(
      `http://172.16.10.82:1997/api/kafka-topic?kafka_profile_id=${kafka_profile_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getKafkaTopicLookUp,
  createKafkaTopic,
  updateKafkaTopic,
  getKafkaTopic,
};
