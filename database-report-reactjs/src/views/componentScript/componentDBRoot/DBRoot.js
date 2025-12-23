import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { DbRootService } from "../../../services/dbRootService";
import { fetchDBRoot } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/TableRow.scss";
import { DBRootColumns } from "./columns/DBRootColumn";
import DBRootForm from "./components/DBRootForm";
import DBRootFormEdit from "./components/DBRootFormEdit";
import SelectDBRoot from "./components/selectDBRoot";

class DBRoot extends React.Component {
  /** Xử lý cho DB ROOT */
  state = {
    search: "",
    isCreatedModalVisible: true,
    isToggleCreated: false,
    isEditing: false,
    dbRoot: {},
    input_name: "",
    input_env: "beta",
  };

  /**
   * Render
   */

  async componentDidMount() {
    this.props.fetchDBRoot();
  }

  handleChangeStatus = async (id) => {
    try {
      await DbRootService.changeStatus(id);
      this.props.fetchDBRoot();
    } catch (error) {
      throw error;
    }
  };

  // Hàm để toggle thêm/bớt DB ROOT
  handleSetIsToggleCreated = () => {
    this.setState({
      isToggleCreated: this.state.isToggleCreated ? false : true,
      isEditing: false,
      dbRoot: {},
      input_name: "",
      input_env: "beta",
    });
  };

  // Hàm để lấy dữ liệu từ input
  handleInputChange = (e, inputName) => {
    this.setState({ [inputName]: e.target.value });
  };

  handleSelectChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      dbRoot: {},
      input_name: "",
      input_env: "beta",
    });
  };

  handleCreateDBRoot = async (input_name, input_env) => {
    try {
      await DbRootService.create(input_name, input_env);

      this.setState({
        input_name: "",
        input_env: "beta",
        isToggleCreated: false,
      });
      this.props.fetchDBRoot();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  handleUpdateDBRoot = async (input_name, input_env) => {
    try {
      const { dbRoot } = this.state;

      await DbRootService.update({
        id: dbRoot.id,
        input_name,
        input_env,
      });

      this.setState({
        input_name: "",
        isEditing: false,
        dbRoot: {},
        input_env: "beta",
      });
      this.props.fetchDBRoot();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      isToggleCreated: false,
      dbRoot: item,
      input_name: item.name,
      input_env: item.env,
    });
  };

  render() {
    const {
      search,
      isEditing,
      isCreatedModalVisible,
      isToggleCreated,
      input_name,
      input_env,
    } = this.state;

    const { projects } = this.props;

    let filteredDBRoot = projects;
    if (search) {
      filteredDBRoot = filteredDBRoot.filter((dbRoot) =>
        dbRoot.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const dbRootColumns = new DBRootColumns();
    dbRootColumns.setHandlers(this.handleChangeStatus, this.handleEdit);
    const columns = dbRootColumns.getColumns();

    return (
      <>
        {/* Sẽ hiển thị DB ROOT */}
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
              <DBRootForm
                input_name={input_name}
                input_env={input_env}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleCreateDBRoot={this.handleCreateDBRoot}
              />
            )}

            {/* Cập nhật dự án */}
            {isEditing && (
              <DBRootFormEdit
                input_name={input_name}
                input_env={input_env}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleUpdateDBRoot={this.handleUpdateDBRoot}
                handleCancelEdit={this.handleCancelEdit}
              />
            )}

            <SelectDBRoot
              search={search}
              handleSelectChange={this.handleSelectChange}
            />
          </div>
        )}

        <Table
          rowKey="id"
          dataSource={filteredDBRoot}
          columns={columns}
          className="compact-table"
          bordered
          size="small"
          pagination={{
            pageSize: 10,
            pageSizeOptions: ["5", "10", "20", "50"],
            showSizeChanger: true,
            position: ["bottomRight"],
            showTotal: (total) => `Tổng số: ${total} phần tử`,
            size: "small",
          }}
          scroll={{
            x: "max-content",
            y: "calc(100vh - 350px)",
          }}
        />
      </>
    );
  }
}

// Sửa tên hàm từ mapStageToProps thành mapStateToProps
const mapStateToProps = (state) => {
  return {
    projects: state.projects, // Sử dụng state.projects để lấy danh sách projects từ Redux store
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDBRoot: () => dispatch(fetchDBRoot()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DBRoot);
