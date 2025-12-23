import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const GrpcProfileService = {
  checkProtoAndGetInfo: async (input_proto_text) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/grpc-profile/check-proto-and-get-info",
      { input_proto_text }
    );
  },

  createGrpcProfile: async (
    project_id,
    service_server_id,
    proto_text_original,
    proto_text_validator,
    package_name
  ) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/grpc-profile/create",
      {
        project_id,
        service_server_id,
        proto_text_original,
        proto_text_validator,
        package_name,
      }
    );
  },

  getGrpcProfiles: async (project_id) => {
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/grpc-profile?project_id=${project_id}`
    );
  },

  getGrpcProfileByPackage: async (packageName) => {
    console.log("packageName: ", packageName);
    return await axiosGETMethod(
      `http://172.16.10.82:1999/api/grpc-profile/get-by-package?package=${packageName}`
    );
  },
};
