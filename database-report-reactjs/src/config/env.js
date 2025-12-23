require("dotenv").config();

const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "3000";
const REACT_APP_IP_PUBLIC_HOST =
  process.env.REACT_APP_IP_PUBLIC_HOST || "172.16.10.82";
const REACT_APP_PORT = process.env.REACT_APP_PORT || "3000";
const REACT_APP_API_GATEWAY =
  process.env.REACT_APP_API_GATEWAY || "http://172.16.10.82:3000";

module.exports = {
  REACT_APP_SERVER_PORT,
  REACT_APP_IP_PUBLIC_HOST,
  REACT_APP_PORT,
  REACT_APP_API_GATEWAY,
};
