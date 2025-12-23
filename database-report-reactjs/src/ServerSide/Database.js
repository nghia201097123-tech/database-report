const axios = require("axios");
const logger = require("../utils/logger.js");

console.log("process.env.API_GATEWAY: ", process.env.API_GATEWAY);

const getDbName = async () => {
  try {
    const resDbName = await axios.get(`http://172.16.10.82:1997/api/db-name`);
    return resDbName.data;
  } catch (error) {
    logger.error("Error fetching database:", error.message);
    throw error;
  }
};

const updateDbName = async (
  id,
  input_database_name,
  input_host,
  input_port,
  input_user,
  input_password,
  input_db_type
) => {
  try {
    if (!id || !input_database_name || !input_host) {
      throw new Error("Missing required parameters");
    }

    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-name/${id}/update`,
      {
        database: input_database_name,
        host: input_host,
        port: +input_port,
        user: input_user,
        password: input_password,
        db_type: input_db_type,
      }
    );

    logger.info(`Database ${id} updated successfully`);
    return response.data;
  } catch (error) {
    logger.error(`Error updating database ${id}: ${error.message}`);
    throw error;
  }
};

const createDbName = async (
  input_project_id,
  input_database_name,
  input_host,
  input_port,
  input_user,
  input_password,
  input_db_type
) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-name/create`,
      {
        db_root_id: +input_project_id,
        database: input_database_name,
        host: input_host || config.database.host,
        port: +input_port || config.database.port,
        user: input_user || config.database.user,
        password: input_password || config.database.password,
        db_type: input_db_type || config.database.type,
      }
    );
    return response.data;
  } catch (error) {
    logger.error("Error creating database:", error.message);
    throw error;
  }
};

const changeStatusDbName = async (id) => {
  try {
    const response = await axios.post(
      `http://172.16.10.82:1997/api/db-name/${id}/change-status`
    );
    return response.data;
  } catch (error) {
    logger.error(`Error changing status for database ${id}:`, error.message);
    throw error;
  }
};

module.exports = {
  getDbName,
  updateDbName,
  createDbName,
  changeStatusDbName,
};
