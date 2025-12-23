import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

export const ProjectService = {
  createProject: async (projectName) => {
    return await axiosPOSTMethod("http://172.16.10.82:1999/api/project/create", {
      input_project_name: projectName,
    });
  },

  getProjects: async () => {
    return await axiosGETMethod("http://172.16.10.82:1999/api/project");
  },

  updateProject: async (id, name) => {
    return await axiosPOSTMethod("http://172.16.10.82:1999/api/project/update", {
      id,
      name,
    });
  },

  changeStatus: async (id, input_project_name) => {
    return await axiosPOSTMethod(
      "http://172.16.10.82:1999/api/project/change-status",
      { id, input_project_name }
    );
  },
};
