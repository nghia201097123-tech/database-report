import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const KafkaProfileService = {
  getKafkaProfiles: async () => {
    return await axiosGETMethod("http://172.16.10.82:1999/api/kafka-profile");
  },

  createNewKafkaProfile: async (
    input_project_id,
    input_kafka_profile_name,
    input_kafka_profile_host,
    input_kafka_profile_port,
    input_master_id
  ) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile/create",
      {
        project_id: parseInt(input_project_id),
        kafka_profile_leader_id: input_master_id ? 1 : 0,
        name: input_kafka_profile_name,
        host: input_kafka_profile_host,
        port: parseInt(input_kafka_profile_port),
      }
    );
  },

  changeKafkaProfileStatus: async (id) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile/change-status",
      {
        id: parseInt(id),
      }
    );
  },

  updateKafkaProfile: async (
    input_id,
    input_project_id,
    input_kafka_profile_leader_id,
    input_kafka_profile_name,
    input_kafka_profile_host,
    input_kafka_profile_port
  ) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile/update",
      {
        id: parseInt(input_id),
        project_id: parseInt(input_project_id),
        kafka_profile_leader_id: input_kafka_profile_leader_id ? 1 : 0,
        name: input_kafka_profile_name,
        host: input_kafka_profile_host,
        port: parseInt(input_kafka_profile_port),
      }
    );
  },
};
