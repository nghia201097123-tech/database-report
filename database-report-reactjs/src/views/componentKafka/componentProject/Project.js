import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { ProjectService } from "../../../services/projectService";
import { fetchProject } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import "./../../../assets/Scss/templates/TableRow.scss";
import ProjectColumns from "./columns/ProjectColumn";
import EditProjectForm from "./components/EditProjectForm";
import ProjectForm from "./components/ProjectForm";
import SelectProject from "./components/selectProject";

class Project extends Component {
  state = {
    search: "",
    project_kafka_grpc_item: {},
    input_project_name: "",
    isToggleCreated: false,
    isCreatedModalVisible: true,
    isEditMode: false,
  };

  async componentDidMount() {
    await this.props.fetchProject();
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
      project_kafka_grpc_item: {},
    });
  };

  handleInputChange = (e, inputProjectName) => {
    this.setState({ [inputProjectName]: e.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // không cho load lại
    const { input_project_name } = this.state;

    await ProjectService.createProject(input_project_name);
    this.setState({
      input_project_name: "",
    });
    this.props.fetchProject();
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeStatus = async (id) => {
    try {
      await ProjectService.changeStatus(id);

      // Cập nhật dữ liệu vào Redux
      this.props.fetchProject(); // Reload dữ liệu từ Redux sau khi tạo mới
    } catch (error) {
      throw error;
    }
  };

  handleEdit = (record) => {
    this.setState({
      isEditMode: true,
      project_kafka_grpc_item: record,
      input_project_name: record.name,
      isToggleCreated: false,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditMode: false,
      project_kafka_grpc_item: {},
      input_project_name: "",
    });
  };

  handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const { project_kafka_grpc_item, input_project_name } = this.state;

      await ProjectService.updateProject(
        project_kafka_grpc_item.id,
        input_project_name
      );
      this.setState({
        isEditMode: false,
        project_kafka_grpc_item: {},
        input_project_name: "",
      });
      // Cập nhật dữ liệu vào Redux
      this.props.fetchProject(); // Reload dữ liệu từ Redux sau khi tạo mới
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  render() {
    const {
      input_project_name,
      isCreatedModalVisible,
      isToggleCreated,
      isEditMode,
      search,
    } = this.state;

    let filteredProject = this.props.project_kafka_grpc;
    if (search) {
      filteredProject = filteredProject.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const projectColumns = new ProjectColumns();
    projectColumns.setHandlers(this.handleChangeStatus, this.handleEdit);
    const columns = projectColumns.getColumns();
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
                input_project_name={input_project_name}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
              />
            )}

            {/* Cập nhật dự án */}
            {isEditMode && (
              <EditProjectForm
                input_project_name={input_project_name}
                handleInputChange={this.handleInputChange}
                handleUpdate={this.handleUpdate}
                handleCancelEdit={this.handleCancelEdit}
              />
            )}

            <SelectProject
              search={this.state.search}
              handleSelectChange={this.handleSelectChange}
            />

            <Table
              rowKey="id"
              dataSource={filteredProject}
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
              size="small"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => dispatch(fetchProject()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
