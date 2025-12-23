import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const KafkaTopicService = {
  getKafkaTopicLookUp: async (key, kafka_profile_id, project_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/kafka-topic/look-up?key=${key}&kafka_profile_id=${kafka_profile_id}&project_id=${project_id}`
    );
  },

  createKafkaTopic: async (
    project_id,
    producer_service_ids,
    consumer_service_id,
    kafka_profile_id,
    kafka_profile_group_id,
    key,
    json,
    note
  ) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-topic/create",
      {
        project_id,
        producer_service_ids,
        consumer_service_id,
        kafka_profile_id,
        kafka_profile_group_id,
        key,
        json,
        note,
      }
    );
  },

  updateKafkaTopic: async (
    id,
    producer_service_ids,
    consumer_service_id,
    kafka_profile_id,
    kafka_profile_group_id,
    key,
    json,
    note
  ) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-topic/update",
      {
        id,
        producer_service_ids,
        consumer_service_id,
        kafka_profile_id,
        kafka_profile_group_id,
        key,
        json,
        note,
      }
    );
  },

  getKafkaTopic: async (kafka_profile_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/kafka-topic?kafka_profile_id=${kafka_profile_id}`
    );
  },
};
