import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const ServiceService = {
  getService: async () => {
    return await axiosGETMethod("http://172.16.10.82:1999/api/service");
  },

  createService: async (input_project_id, input_service_name) => {
    return await axiosPOSTMethod("http://172.16.10.82:1999/api/service/create", {
      input_project_id,
      input_service_name,
    });
  },

  changeStatus: async (id) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/service/change-status",
      {
        id,
      }
    );
  },

  updateService: async (id, input_project_id, input_service_name) => {
    return await axiosPOSTMethod("http://172.16.10.82:1999/api/service/update", {
      id,
      input_project_id,
      input_service_name,
    });
  },
};
