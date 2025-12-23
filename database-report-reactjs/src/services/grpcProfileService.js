import { axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const GrpcProfileServiceService = {
  createGrpcProfileService: async (grpc_profile_id, services) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/grpc-profile-services/create",
      { grpc_profile_id, services }
    );
  },
};
