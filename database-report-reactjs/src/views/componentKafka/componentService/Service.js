import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { ServiceService } from "../../../services/serviceService";
import { fetchProject, fetchService } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import EditProjectForm from "./components/EditServiceForm";
import ProjectForm from "./components/ServiceForm";
import "./../../../assets/Scss/templates/TableRow.scss";
import ServiceColumns from "./columns/ServiceColumn"; // Thay vì import { ServiceColumns }
import SelectService from "./components/selectService";

class Service extends Component {
  state = {
    search: "",
    project_id: 0,
    service_kafka_grpc: [],
    service_kafka_grpc_item: {},
    input_service_name: "",
    input_project_id: "",
    isToggleCreated: false,
    isCreatedModalVisible: true,
    isDisable: true,
    isEditMode: false,
  };

  async componentDidMount() {
    await this.props.fetchService();

    if (this.props.project_kafka_grpc.length === 0) {
      await this.props.fetchProject();
    }
  }

  // Hàm mở Modal
  showCreatedModal = () => {
    this.setState({
      isToggleCreated: false,
      isCreatedModalVisible: true,
    });
  };

  handleSetIsToggleCreated = () => {
    this.setState({
      isToggleCreated: this.state.isToggleCreated ? false : true,
      isEditMode: false,
      service_kafka_grpc_item: {},
    });
  };

  handleInputChange = (e, inputProjectName) => {
    this.setState({ [inputProjectName]: e.target.value });
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // không cho load lại
    const { input_project_id, input_service_name } = this.state;
    await ServiceService.createService(+input_project_id, input_service_name);
    this.setState({
      input_service_name: "",
      input_project_id: "",
    });
    this.props.fetchService();
  };

  handleChangeStatus = async (id) => {
    try {
      await ServiceService.changeStatus(id);

      this.props.fetchService(); // Reload dữ liệu từ Redux sau khi tạo mới
    } catch (error) {
      throw error;
    }
  };

  handleEdit = (record) => {
    this.setState({
      isEditMode: true,
      service_kafka_grpc_item: record,
      input_service_name: record.name,
      isToggleCreated: false,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditMode: false,
      service_kafka_grpc_item: {},
      input_service_name: "",
    });
  };

  handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const { service_kafka_grpc_item, input_service_name } = this.state;

      await ServiceService.updateService(
        service_kafka_grpc_item.id,
        service_kafka_grpc_item.project_id,
        input_service_name
      );
      this.setState({
        isEditMode: false,
        service_kafka_grpc_item: {},
        input_service_name: "",
      });
      this.props.fetchService(); // Reload dữ liệu từ Redux sau khi tạo mới
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  render() {
    const {
      search,
      project_id,
      input_project_id,
      input_service_name,
      isCreatedModalVisible,
      isToggleCreated,
      isEditMode,
    } = this.state;

    let filteredService =
      project_id > 0
        ? this.props.service_kafka_grpc.filter(
            (service) => +service.project_id === +project_id
          )
        : this.props.service_kafka_grpc;

    if (search) {
      filteredService = filteredService.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const serviceColumns = new ServiceColumns();
    serviceColumns.setHandlers(this.handleChangeStatus, this.handleEdit);
    const columns = serviceColumns.getColumns();

    return (
      <>
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
              <ProjectForm
                project_kafka_grpc={this.props.project_kafka_grpc}
                input_project_id={input_project_id}
                input_service_name={input_service_name}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
              />
            )}

            {/* Cập nhật dự án */}
            {isEditMode && (
              <EditProjectForm
                input_service_name={input_service_name}
                handleInputChange={this.handleInputChange}
                handleUpdate={this.handleUpdate}
                handleCancelEdit={this.handleCancelEdit}
              />
            )}

            <SelectService
              project_kafka_grpc={this.props.project_kafka_grpc}
              project_id={project_id}
              search={search}
              handleSelectChange={this.handleSelectChange}
            />

            <Table
              rowKey="id"
              dataSource={filteredService}
              columns={columns}
              className="project-table"
              bordered
              size="small"
              pagination={{
                pageSize: 20,
                pageSizeOptions: ["10", "20", "50", "100"],
                showSizeChanger: true,
                position: ["bottomRight"],
                showTotal: (total) => `Tổng số: ${total} phần tử`,
                size: "small",
              }}
              scroll={{ x: "max-content", y: "calc(100vh - 350px)" }}
            />
          </div>
        )}
      </>
    );
  }
}

// Sửa tên hàm từ mapStageToProps thành mapStateToProps
const mapStateToProps = (state) => {
  return {
    project_kafka_grpc: state.project_kafka_grpc, // Sử dụng state.projects để lấy danh sách projects từ Redux store
    service_kafka_grpc: state.service_kafka_grpc, // Sử dụng state.projects để lấy danh sách projects từ Redux store
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => dispatch(fetchProject()),
    fetchService: () => dispatch(fetchService()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
