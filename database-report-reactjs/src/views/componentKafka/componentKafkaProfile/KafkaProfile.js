import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { KafkaProfileGroupIdService } from "../../../services/kafkaProfileGroupId";
import { KafkaProfileService } from "../../../services/kafkaProfileService";
import {
  fetchKafkaProfile,
  fetchProject,
  fetchService,
} from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import "./../../../assets/Scss/templates/TableRow.scss";
import KafkaProfileColumns from "./columns/KafkaProfileColumn";
import EditKafkaProfileForm from "./components/EditKafkaProfileForm";
import KafkaProfileForm from "./components/KafkaProfileForm";
import GroupIdManagement from "./GroupIdManagement";
import SelectKafkaProfile from "./components/selectKafkaProfile";

class KafkaProfile extends Component {
  state = {
    search: "",
    project_id: 0,
    kafka_profile_item: {},
    kafka_profile_group_ids: [],
    input_project_id: "",
    input_kafka_profile_name: "",
    input_kafka_profile_host: "",
    input_kafka_profile_port: "",
    input_is_master: false,
    input_master_id: "",
    isToggleCreated: false,
    isCreatedModalVisible: true,
    isDisable: true,
    isEditMode: false,
    isModalVisible: false,
    selectedRecord: {},
  };

  async componentDidMount() {
    await this.props.fetchKafkaProfile();
    await this.props.fetchProject();
  }

  handleSetIsToggleCreated = () => {
    this.setState({
      isToggleCreated: this.state.isToggleCreated ? false : true,
      isEditMode: false,
      kafka_profile_item: {},
      input_kafka_profile_name: "",
      input_kafka_profile_host: "",
      input_kafka_profile_port: "",
      input_is_master: false,
      input_master_id: "",
    });
  };

  handleInputChange = (e, inputProjectName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [inputProjectName]: value });
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault(); // không cho load lại
      const {
        input_project_id,
        input_kafka_profile_name,
        input_kafka_profile_host,
        input_kafka_profile_port,
        input_is_master,
        input_master_id,
      } = this.state;

      await KafkaProfileService.createNewKafkaProfile(
        input_project_id,
        input_kafka_profile_name,
        input_kafka_profile_host,
        input_kafka_profile_port,
        input_is_master,
        input_master_id
      );
    } catch (error) {
    } finally {
      this.props.fetchKafkaProfile();
      this.setState({
        isCreatedModalVisible: false,
        isToggleCreated: false,
        kafka_profile_item: {},
        input_kafka_profile_name: "",
        input_kafka_profile_host: "",
        input_kafka_profile_port: "",
        input_is_master: false,
        input_master_id: "",
      });
    }
  };

  handleEdit = (record) => {
    this.setState({
      isEditMode: true,
      kafka_profile_item: record,
      input_kafka_profile_name: record.name,
      input_kafka_profile_host: record.host,
      input_kafka_profile_port: record.port,
      input_is_master: record.is_master,
      input_master_id: record.master_id,
      isToggleCreated: false,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditMode: false,
      kafka_profile_item: {},
      input_kafka_profile_name: "",
      input_kafka_profile_host: "",
      input_kafka_profile_port: "",
      input_is_master: false,
      input_master_id: "",
      isToggleCreated: false,
    });
  };

  handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const {
        kafka_profile_item,
        input_kafka_profile_name,
        input_kafka_profile_host,
        input_kafka_profile_port,
        input_master_id,
      } = this.state;

      await KafkaProfileService.updateKafkaProfile(
        kafka_profile_item.id,
        kafka_profile_item.project_id,
        input_master_id,
        input_kafka_profile_name,
        input_kafka_profile_host,
        input_kafka_profile_port
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    } finally {
      this.props.fetchKafkaProfile();
      this.setState({
        isEditMode: false,
        kafka_profile_item: {},
        input_kafka_profile_name: "",
        input_kafka_profile_host: "",
        input_kafka_profile_port: "",
        input_is_master: false,
        input_master_id: "",
      });
    }
  };

  handleChangeStatus = async (id) => {
    try {
      await KafkaProfileService.changeKafkaProfileStatus(id);
      this.props.fetchKafkaProfile();
    } catch (error) {
      throw error;
    }
  };

  handleGroupIdManagement = async (record) => {
    const response = await KafkaProfileGroupIdService.getKafkaProfileGroupIds(
      record.id
    );

    this.setState({
      kafka_profile_group_ids: response.data.data,
      isModalVisible: true,
      selectedRecord: record,
    });
  };

  handleGroupIdManagementCancel = () => {
    this.setState({
      isModalVisible: false,
      selectedRecord: {},
    });
  };

  handleAddNewGroupId = async (data) => {
    await KafkaProfileGroupIdService.createNewKafkaProfileGroupId(
      data.group_id_name,
      this.state.selectedRecord.id
    );

    this.setState({
      isModalVisible: false,
      selectedRecord: {},
    });
  };

  render() {
    const {
      search,
      project_id,
      kafka_profile_group_ids,
      isCreatedModalVisible,
      isToggleCreated,
      input_project_id,
      input_kafka_profile_name,
      input_kafka_profile_host,
      input_kafka_profile_port,
      input_is_master,
      input_master_id,
      isEditMode,
      kafka_profile_item,
      isModalVisible,
      selectedRecord,
    } = this.state;

    let filteredKafkaProfile =
      project_id > 0
        ? this.props.kafka_profile.filter(
            (kafkaProfile) => +kafkaProfile.project_id === +project_id
          )
        : this.props.kafka_profile;

    if (search) {
      filteredKafkaProfile = filteredKafkaProfile.filter((kafkaProfile) =>
        kafkaProfile.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const kafkaColumns = new KafkaProfileColumns(
      this.handleChangeStatus,
      this.handleEdit,
      this.handleGroupIdManagement
    );
    const columns = kafkaColumns.getColumns();

    return (
      <>
        {/* Your existing table component */}
        <GroupIdManagement
          visible={isModalVisible}
          onCancel={() => this.setState({ isModalVisible: false })}
          record={selectedRecord}
          onSave={(data) => {
            this.setState({ isModalVisible: false });
          }}
          isModalVisible={isModalVisible}
          kafka_profile_group_ids={kafka_profile_group_ids}
          handleGroupIdManagementCancel={this.handleGroupIdManagementCancel}
          handleAddNewGroupId={this.handleAddNewGroupId}
        />

        {isCreatedModalVisible && (
          <div className="project-section">
            <div
              className="toggle-button"
              onClick={this.handleSetIsToggleCreated}
            >
              {isToggleCreated ? (
                <MinusCircleOutlined />
              ) : (
                <PlusCircleOutlined />
              )}
            </div>

            {/* Tạo dự án */}
            {isToggleCreated && (
              <KafkaProfileForm
                project_kafka_grpc={this.props.project_kafka_grpc}
                kafka_profile={this.props.kafka_profile}
                input_project_id={input_project_id}
                input_kafka_profile_name={input_kafka_profile_name}
                input_kafka_profile_host={input_kafka_profile_host}
                input_kafka_profile_port={input_kafka_profile_port}
                input_is_master={input_is_master}
                input_master_id={input_master_id}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
              />
            )}

            {/* Cập nhật dự án */}
            {isEditMode && (
              <EditKafkaProfileForm
                project_kafka_grpc_item={
                  this.props.project_kafka_grpc.find(
                    (project) =>
                      parseInt(project.id) === kafka_profile_item.project_id
                  ) || {}
                }
                kafka_profile_item={kafka_profile_item}
                input_kafka_profile_name={input_kafka_profile_name}
                input_kafka_profile_host={input_kafka_profile_host}
                input_kafka_profile_port={input_kafka_profile_port}
                input_is_master={input_is_master}
                input_master_id={input_master_id}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleUpdate={this.handleUpdate}
                handleCancelEdit={this.handleCancelEdit}
              />
            )}

            <SelectKafkaProfile
              project_kafka_grpc={this.props.project_kafka_grpc}
              project_id={input_project_id}
              search={search}
              handleSelectChange={this.handleSelectChange}
            />
          </div>
        )}

        <Table
          rowKey="id"
          dataSource={filteredKafkaProfile}
          columns={columns}
          className="project-table"
          bordered
          pagination={{
            pageSize: 20,
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            position: ["bottomRight"],
            showTotal: (total) => `Tổng số: ${total} phần tử`,
            size: "small",
          }}
          scroll={{ x: "max-content", y: "calc(100vh - 350px)" }}
          size="small"
        />
      </>
    );
  }
}

// Sửa tên hàm từ mapStageToProps thành mapStateToProps
const mapStateToProps = (state) => {
  return {
    project_kafka_grpc: state.project_kafka_grpc, // Sử dụng state.projects để lấy danh sách projects từ Redux store
    service_kafka_grpc: state.service_kafka_grpc, // Sử dụng state.projects để lấy danh sách projects từ Redux store
    kafka_profile: state.kafka_profile, // Sử dụng state.projects để lấy danh sách projects từ Redux store
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => dispatch(fetchProject()),
    fetchService: () => dispatch(fetchService()),
    fetchKafkaProfile: () => dispatch(fetchKafkaProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KafkaProfile);
