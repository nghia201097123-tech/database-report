const axios = require("axios");
const logger = require("../utils/logger.js");

const getBuild = async () => {
  try {
    const resBuild = await axios.get(`http://172.16.10.82:1997/api/build`);
    return resBuild.data;
  } catch (error) {
    logger.error("Error fetching database:", error.message);
    throw error;
  }
};

const getDetailBuild = async (id) => {
  try {
    const resBuild = await axios.get(
      `http://172.16.10.82:1997/api/build/${id}/detail`
    );
    return resBuild.data;
  } catch (error) {
    logger.error("Error fetching database:", error.message);
    throw error;
  }
};

const createBuild = async (
  project_id,
  service_server_ids,
  content,
  build_at
) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/build/create`,
      {
        project_id: +project_id,
        service_server_ids: service_server_ids,
        content: content,
        build_at: build_at,
      }
    );
    return response.data;
  } catch (error) {
    logger.error("Error creating database:", error.message);
    throw error;
  }
};

const updateBuild = async (
  id,
  project_id,
  service_server_ids,
  content,
  build_at
) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/build/${id}/update`,
      {
        project_id: +project_id,
        service_server_ids: service_server_ids,
        content: content,
        build_at: build_at,
      }
    );
    return response.data;
  } catch (error) {
    logger.error("Error creating database:", error.message);
    throw error;
  }
};

const changeStatusBuild = async (id, status) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/build/${id}/change-status`,
      {
        status: status,
      }
    );
    return response.data;
  } catch (error) {
    logger.error("Error creating database:", error.message);
    throw error;
  }
};

module.exports = {
  getBuild,
  createBuild,
  updateBuild,
  getDetailBuild,
  changeStatusBuild,
};
