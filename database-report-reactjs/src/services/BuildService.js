import { axiosGETMethod, axiosPOSTMethod } from "../utils/Axios/HttpRequest";

const BASE_URL = "http://172.16.10.82:1999/api/build";

export const BuildService = {
  // Lấy danh sách database
  getBuild: async () => {
    try {
      const response = await axiosGETMethod(`${BASE_URL}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getDetailBuild: async (id) => {
    try {
      const response = await axiosGETMethod(`${BASE_URL}/${id}/detail`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật thông tin database
  updateBuild: async (data) => {
    try {
      const response = await axiosPOSTMethod(`${BASE_URL}/update`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Tạo mới database
  createBuild: async (data) => {
    try {
      const response = await axiosPOSTMethod(`${BASE_URL}/create`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Thay đổi trạng thái database
  changeStatusBuild: async (id, status) => {
    try {
      const response = await axiosPOSTMethod(`${BASE_URL}/change-status`, {
        id,
        status,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
