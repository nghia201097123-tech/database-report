const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Thêm dòng này
require("dotenv").config();
const {
  REACT_APP_SERVER_PORT,
  REACT_APP_IP_PUBLIC_HOST,
} = require("../config/env");
let {
  getDbRoot,
  updateDbRoot,
  createDbRoot,
  changeStatusDbRoot,
} = require("./dbRoot");

let {
  getDbName,
  updateDbName,
  createDbName,
  changeStatusDbName,
} = require("./Database");

let {
  getStoreFunc,
  updateIsLatestVersion,
  cloneExport,
  updateNote,
  findOneStoreFuncName,
} = require("./StoreFunc");

let {
  getStoreFuncDetails,
  exportStoreFuncDetails,
  exportFileStoreFuncDetails,
} = require("./StoreFuncDetail");

let {
  getTable,
  updateTableIsLatestVersion,
  updateTableNote,
  cloneTableExport,
  findOneTableName,
} = require("./ExportTable");

let { getTableDetails, exportTableDetails } = require("./ExportTableDetail");

let {
  getProject,
  createProject,
  changeStatusProject,
  updateProject,
} = require("./Kafka");

let {
  getService,
  createService,
  changeStatus,
  updateService,
} = require("./Service");

let {
  getKafkaProfile,
  createKafkaProfile,
  changeKafkaProfileStatus,
  updateKafkaProfile,
} = require("./KafkaProfile");

let {
  getKafkaTopicLookUp,
  createKafkaTopic,
  updateKafkaTopic,
  getKafkaTopic,
} = require("./KafkaTopic");

let {
  getKafkaProfileGroupIds,
  createKafkaProfileGroupId,
  updateKafkaProfileGroupId,
  changeKafkaProfileGroupIdStatus,
} = require("./kafkaProfileGroupId");

let {
  CheckProtoAndGetInfo,
  createGrpcProfile,
  getGrpcProfiles,
  getGrpcProfileByPackage,
} = require("./GrpcProfile");

let { createGrpcProfileService } = require("./GrpcProfileService");

let {
  changeStatusBuild,
  createBuild,
  getBuild,
  getDetailBuild,
  updateBuild,
} = require("./Build");

const app = express();

// // Middleware
const corsOptions = {
  origin: ["*"], // Thêm 172.16.10.82 và địa chỉ IP của bạn vào đây
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/**
 *
 *
 * =======================PROJECT =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/db-root", async (req, res) => {
  try {
    const response = await getDbRoot();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/db-root/update", async (req, res) => {
  try {
    let { id, input_name, input_env } = req.body;
    const response = await updateDbRoot(id, input_name, input_env);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/db-root/create", async (req, res) => {
  try {
    let { input_name, input_env } = req.body;
    const response = await createDbRoot(input_name, input_env);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/db-root/change-status", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await changeStatusDbRoot(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * =======================DATABASE =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/databases", async (req, res) => {
  try {
    const response = await getDbName();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/databases/update", async (req, res) => {
  try {
    let {
      id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type,
    } = req.body;

    const response = await updateDbName(
      id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/databases/create", async (req, res) => {
  try {
    let {
      input_project_id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type,
    } = req.body;

    const response = await createDbName(
      input_project_id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/databases/change-status", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await changeStatusDbName(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * =======================STORE FUNC =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/store-func", async (req, res) => {
  try {
    const response = await getStoreFunc();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/store-func/change-is-latest-version", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await updateIsLatestVersion(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/store-func/clone-export", async (req, res) => {
  try {
    let { id, list_name } = req.body;
    const response = await cloneExport(id, list_name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/store-func/change-note", async (req, res) => {
  try {
    let { id, input_note } = req.body;
    const response = await updateNote(id, input_note);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/store-func/:id/detail", async (req, res) => {
  try {
    let { id } = req.params;
    const response = await findOneStoreFuncName(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * =======================STORE FUNC DETAILS =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/store-func-details", async (req, res) => {
  try {
    let { store_func_name_id } = req.query;
    const response = await getStoreFuncDetails(store_func_name_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/export/store-func-details", async (req, res) => {
  try {
    let { db_name_id, history_id } = req.body;
    const response = await exportStoreFuncDetails(db_name_id, history_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/export/file-store-func-details", async (req, res) => {
  try {
    let { db_name_id, history_id, list_name } = req.body;
    const response = await exportFileStoreFuncDetails(
      db_name_id,
      history_id,
      list_name
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * =======================TABLE =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/table", async (req, res) => {
  try {
    const response = await getTable();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/table/change-is-latest-version", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await updateTableIsLatestVersion(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/table/change-note", async (req, res) => {
  try {
    let { id, input_note } = req.body;
    const response = await updateTableNote(id, input_note);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/table/clone-export", async (req, res) => {
  try {
    let { id, list_name } = req.body;
    const response = await cloneTableExport(id, list_name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/table/:id/detail", async (req, res) => {
  try {
    let { id } = req.params;
    const response = await findOneTableName(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * =======================TABLE DETAILS =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/table-details", async (req, res) => {
  try {
    let { table_name_id } = req.query;
    const response = await getTableDetails(table_name_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/export/table-details", async (req, res) => {
  try {
    let { db_name_id, history_id } = req.body;
    const response = await exportTableDetails(db_name_id, history_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= PROJECTS =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/project", async (req, res) => {
  try {
    const response = await getProject();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/project/create", async (req, res) => {
  try {
    let { input_project_name } = req.body;
    const response = await createProject(input_project_name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/project/change-status", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await changeStatusProject(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/project/update", async (req, res) => {
  try {
    let { id, name } = req.body;
    const response = await updateProject(id, name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= SERVICE =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/service", async (req, res) => {
  try {
    const response = await getService();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/service/create", async (req, res) => {
  try {
    let { input_project_id, input_service_name } = req.body;
    const response = await createService(input_project_id, input_service_name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/service/change-status", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await changeStatus(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/service/update", async (req, res) => {
  try {
    let { id, input_project_id, input_service_name } = req.body;
    const response = await updateService(
      id,
      input_project_id,
      input_service_name
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= KAFKA PROFILE =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/kafka-profile", async (req, res) => {
  try {
    const response = await getKafkaProfile();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile/create", async (req, res) => {
  try {
    let { project_id, kafka_profile_leader_id, name, host, port } = req.body;
    const response = await createKafkaProfile(
      project_id,
      kafka_profile_leader_id,
      name,
      host,
      port
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile/change-status", async (req, res) => {
  try {
    let { id } = req.body;
    const response = await changeKafkaProfileStatus(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile/update", async (req, res) => {
  try {
    let { id, project_id, kafka_profile_leader_id, name, host, port } =
      req.body;
    const response = await updateKafkaProfile(
      id,
      project_id,
      kafka_profile_leader_id,
      name,
      host,
      port
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= KAFKA TOPIC =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/kafka-topic/look-up", async (req, res) => {
  try {
    const response = await getKafkaTopicLookUp(
      req.query.key,
      req.query.kafka_profile_id,
      req.query.project_id
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-topic/create", async (req, res) => {
  try {
    let {
      project_id,
      producer_service_ids,
      consumer_service_id,
      kafka_profile_id,
      kafka_profile_group_id,
      key,
      json,
      note,
    } = req.body;

    const response = await createKafkaTopic(
      project_id,
      producer_service_ids,
      consumer_service_id,
      kafka_profile_id,
      kafka_profile_group_id,
      key,
      json,
      note
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-topic/update", async (req, res) => {
  try {
    let {
      id,
      producer_service_ids,
      consumer_service_id,
      kafka_profile_id,
      kafka_profile_group_id,
      key,
      json,
      note,
    } = req.body;
    const response = await updateKafkaTopic(
      id,
      producer_service_ids,
      consumer_service_id,
      kafka_profile_id,
      kafka_profile_group_id,
      key,
      json,
      note
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/kafka-topic", async (req, res) => {
  try {
    const response = await getKafkaTopic(req.query.kafka_profile_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= KAFKA PROFILE GROUP ID =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/kafka-profile-group-id", async (req, res) => {
  try {
    const response = await getKafkaProfileGroupIds(req.query.kafka_profile_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile-group-id/create", async (req, res) => {
  try {
    const { name, kafka_profile_id } = req.body;

    const response = await createKafkaProfileGroupId(name, kafka_profile_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile-group-id/update", async (req, res) => {
  try {
    let { id, name } = req.body;
    const response = await updateKafkaProfileGroupId(id, name);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/kafka-profile-group-id/change-status", async (req, res) => {
  try {
    const response = await changeKafkaProfileGroupIdStatus();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= GRPC PROFILE =========================
 *
 *
 */

// Route để frontend gọi
app.post("/api/grpc-profile/check-proto-and-get-info", async (req, res) => {
  try {
    const { input_proto_text } = req.body;

    const response = await CheckProtoAndGetInfo(input_proto_text);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/grpc-profile/create", async (req, res) => {
  try {
    const {
      project_id,
      service_server_id,
      proto_text_original,
      proto_text_validator,
      package_name,
    } = req.body;

    const response = await createGrpcProfile(
      project_id,
      service_server_id,
      proto_text_original,
      proto_text_validator,
      package_name
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/grpc-profile", async (req, res) => {
  try {
    const response = await getGrpcProfiles(req.query.project_id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/grpc-profile/get-by-package", async (req, res) => {
  try {
    const response = await getGrpcProfileByPackage(req.query.package);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= GRPC PROFILE SERVICES =========================
 *
 *
 */

// Route để frontend gọi
app.post("/api/grpc-profile-services/create", async (req, res) => {
  try {
    const { grpc_profile_id, services } = req.body;
    const response = await createGrpcProfileService(grpc_profile_id, services);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 *
 *
 * ======================= BUILD =========================
 *
 *
 */

// Route để frontend gọi
app.get("/api/build", async (req, res) => {
  try {
    const response = await getBuild();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.get("/api/build/:id/detail", async (req, res) => {
  try {
    let { id } = req.params;
    const response = await getDetailBuild(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/build/create", async (req, res) => {
  try {
    const { project_id, service_server_ids, content, build_at } = req.body;

    const response = await createBuild(
      project_id,
      service_server_ids,
      content,
      build_at
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/build/update", async (req, res) => {
  try {
    const { id, project_id, service_server_ids, content, build_at } = req.body;

    const response = await updateBuild(
      id,
      project_id,
      service_server_ids,
      content,
      build_at
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route để frontend gọi
app.post("/api/build/change-status", async (req, res) => {
  try {
    const { id, status } = req.body;

    const response = await changeStatusBuild(id, status);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

app.listen(1999, "0.0.0.0", () =>
  console.log(`Server đang chạy tại ${1999}:${"0.0.0.0"}`)
);
