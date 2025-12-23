import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const KafkaProfileGroupIdService = {
  getKafkaProfileGroupIds: async (kafka_profile_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/kafka-profile-group-id?kafka_profile_id=${kafka_profile_id}`
    );
  },

  createNewKafkaProfileGroupId: async (name, kafka_profile_id) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile-group-id/create",
      { name, kafka_profile_id }
    );
  },

  updateKafkaProfileGroupId: async (id, name) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile-group-id/update",
      { id, name }
    );
  },

  changeKafkaProfileGroupIdStatus: async (id) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/kafka-profile-group-id/change-status",
      { id }
    );
  },
};
