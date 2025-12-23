import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

/**
 * @param {string} url - API endpoint URL
 * @returns {Promise<AxiosResponse|undefined>}
 */
export const axiosGETMethod = async (url) => {
  try {
    let res = await axios.get(url, {
      timeout: 120000, // timeout 60s
    });

    if (res.status !== 200) {
      toast.error(res.data.message || "Có lỗi xảy ra");
      return;
    }
    return res;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timeout, vui lòng thử lại");
    } else if (error.message === "Network Error") {
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn."
      );
    } else {
      toast.error(`Đã xảy ra lỗi: ${error.message}`);
    }
  }
  return;
};

/**
 * @param {string} url - API endpoint URL
 * @param {object} json - Request body
 * @returns {Promise<AxiosResponse|undefined>}
 */
export const axiosPOSTMethod = async (url, json) => {
  try {
    let res = await axios.post(url, json, {
      timeout: 120000, // timeout 60s
    });

    if (res.status === 200) {
      if (res.data.status === HttpStatusCode.Ok) {
        toast.success(res.data.message);
        return res;
      }
      toast.error(res.data.message || "Có lỗi xảy ra");
      return;
    }

    toast.error("Có lỗi xảy ra từ server");
    return;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timeout, vui lòng thử lại");
    } else if (error.message === "Network Error") {
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn."
      );
    } else {
      toast.error(`Đã xảy ra lỗi1: ${error.message}`);
    }
  }
  return;
};

/**
 * @param {string} url - API endpoint URL
 * @param {object} json - Request body
 * @returns {Promise<AxiosResponse|undefined>}
 */
export const axiosExportFilePOSTMethod = async (url, json) => {
  try {
    let res = await axios.post(url, json, {
      timeout: 120000, // timeout 60s
    });

    return res;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timeout, vui lòng thử lại");
    } else if (error.message === "Network Error") {
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn."
      );
    } else {
      toast.error(`Đã xảy ra lỗi: ${error.message}`);
    }
  }
  return;
};
