import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_DATABASES_SUCCESS,
  FETCH_STORE_FUNC_NAME_SUCCESS,
  FETCH_TABLE_NAME_SUCCESS,
  FETCH_PROJECT_KAFKA_GRPC_SUCCESS,
  FETCH_SERVICE_KAFKA_GRPC_SUCCESS,
  FETCH_KAFKA_PROFILE_SUCCESS,
} from "./../action/actionTypes";

const initState = {
  projects: [],
  databases: [],
  store_func_name: [],
  table_name: [],
  project_kafka_grpc: [],
  service_kafka_grpc: [],
  kafka_profile: [],
};

export const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case FETCH_DATABASES_SUCCESS:
      return {
        ...state,
        databases: action.payload,
      };
    case FETCH_STORE_FUNC_NAME_SUCCESS:
      return {
        ...state,
        store_func_name: action.payload,
      };
    case FETCH_TABLE_NAME_SUCCESS:
      return {
        ...state,
        table_name: action.payload,
      };
    case FETCH_PROJECT_KAFKA_GRPC_SUCCESS:
      return {
        ...state,
        project_kafka_grpc: action.payload,
      };
    case FETCH_SERVICE_KAFKA_GRPC_SUCCESS:
      return {
        ...state,
        service_kafka_grpc: action.payload,
      };
    case FETCH_KAFKA_PROFILE_SUCCESS:
      return {
        ...state,
        kafka_profile: action.payload,
      };
    default:
      return state;
  }
};
