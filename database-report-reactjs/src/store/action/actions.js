// actions.js
import { axiosGETMethod } from "../../utils/Axios/HttpRequest";
import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_DATABASES_SUCCESS,
  FETCH_STORE_FUNC_NAME_SUCCESS,
  FETCH_TABLE_NAME_SUCCESS,
  FETCH_PROJECT_KAFKA_GRPC_SUCCESS,
  FETCH_SERVICE_KAFKA_GRPC_SUCCESS,
  FETCH_KAFKA_PROFILE_SUCCESS,
} from "./actionTypes";

export const fetchDBRoot = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/db-root");
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};

export const fetchDatabases = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/databases");
    dispatch({
      type: FETCH_DATABASES_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};

export const fetchStoreFuncName = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/store-func");
    dispatch({
      type: FETCH_STORE_FUNC_NAME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};

export const fetchTableName = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/table");

    dispatch({
      type: FETCH_TABLE_NAME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};

export const fetchProject = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/project");
    dispatch({
      type: FETCH_PROJECT_KAFKA_GRPC_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};

export const fetchService = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/service");
    dispatch({
      type: FETCH_SERVICE_KAFKA_GRPC_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};
export const fetchKafkaProfile = () => async (dispatch) => {
  try {
    const res = await axiosGETMethod("http://172.16.10.82:1999/api/kafka-profile");
    dispatch({
      type: FETCH_KAFKA_PROFILE_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.error("Failed to fetch projects", error);
  }
};
