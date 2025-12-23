import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { DatabaseService } from "../../../services/databaseService";
import { fetchDBRoot, fetchDatabases } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/TableRow.scss";
import DatabaseForm from "./components/DatabaseForm";
import DatabaseFormEdit from "./components/DatabaseFormEdit";
import { DatabaseColumns } from "./columns/DatabaseColumn";
import SelectDatabase from "./components/selectDatabase";

class Database extends React.Component {
  /** Xử lý cho DB ROOT */
  state = {
    db_root_id: 0,
    search: "",
    isCreatedModalVisible: true,
    isEditing: false,
    isToggleCreated: false,
    input_project_id: "",
    input_database_name: "",
    input_host: "172.16.10.145",
    input_port: "3306",
    input_user: "",
    input_password: "",
    input_db_type: "mariadb",
    database: {},
  };

  async componentDidMount() {
    await this.props.fetchDatabases();
    await this.props.fetchDBRoot();

    // this.setState({
    //   projects: this.props.projects.map((x) => ({
    //     id: x.id,
    //     name: `${x.name} (${x.env})`,
    //   })),
    // });
  }

  // Hàm để toggle thêm/bớt
  handleSetIsToggleCreated = () => {
    this.setState({
      isToggleCreated: this.state.isToggleCreated ? false : true,
      isEditing: false,
      database: {},
      input_database_name: "",
      input_host: "172.16.10.145",
      input_port: "3306",
      input_user: "",
      input_password: "",
      input_db_type: "mariadb",
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeStatus = async (id) => {
    try {
      await DatabaseService.changeStatusDatabase(id);
      this.props.fetchDatabases();
    } catch (error) {
      throw error;
    }
  };

  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      isToggleCreated: false,
      database: item,
      input_database_name: item.database,
      input_host: item.host,
      input_port: item.port,
      input_user: item.user,
      input_password: item.password,
      input_db_type: item.db_type,
    });
  };

  handleCreateDatabase = async (event) => {
    try {
      event.preventDefault();
      const {
        input_project_id,
        input_database_name,
        input_host,
        input_port,
        input_user,
        input_password,
        input_db_type,
      } = this.state;

      await DatabaseService.createDatabase({
        input_project_id: input_project_id,
        input_database_name: input_database_name,
        input_host: input_host,
        input_port: input_port,
        input_user: input_user,
        input_password: input_password,
        input_db_type: input_db_type,
      });

      this.setState({
        input_project_id: 0,
        input_database_name: "",
        input_host: "172.16.10.145",
        input_port: "3306",
        input_user: "",
        input_password: "",
        input_db_type: "mariadb",
      });
      this.props.fetchDatabases();
    } catch (error) {
      console.error("Lỗi khi tạo database:", error);
    }
  };

  handleUpdateDatabase = async (event) => {
    try {
      event.preventDefault();
      await DatabaseService.updateDatabase({
        id: this.state.database.id,
        input_database_name: this.state.input_database_name,
        input_host: this.state.input_host,
        input_port: this.state.input_port,
        input_user: this.state.input_user,
        input_password: this.state.input_password,
        input_db_type: this.state.input_db_type,
      });

      this.setState({
        isEditing: false,
        database: {},
        input_database_name: "",
        input_host: "172.16.10.145",
        input_port: "3306",
        input_user: "",
        input_password: "",
        input_db_type: "mariadb",
      });
      this.props.fetchDatabases();
    } catch (error) {
      console.error("Lỗi khi cập nhật database:", error);
    }
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      database: {},
      input_database_name: "",
      input_host: "172.16.10.145",
      input_port: "3306",
      input_user: "",
      input_password: "",
      input_db_type: "mariadb",
    });
  };

  render() {
    const {
      db_root_id,
      search,
      isCreatedModalVisible,
      isEditing,
      isToggleCreated,
      input_project_id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type,
    } = this.state;

    let filteredDatabases =
      db_root_id > 0
        ? this.props.databases.filter(
            (database) => +database.db_root_id === +db_root_id
          )
        : this.props.databases;

    if (search) {
      filteredDatabases = filteredDatabases.filter(
        (database) =>
          database.database.toLowerCase().includes(search.toLowerCase()) ||
          database.host.toLowerCase().includes(search.toLowerCase()) ||
          database.user.toLowerCase().includes(search.toLowerCase()) ||
          database.db_type.toLowerCase().includes(search.toLowerCase())
      );
    }

    const databaseColumns = new DatabaseColumns();
    databaseColumns.setHandlers(this.handleChangeStatus, this.handleEdit);
    const columns = databaseColumns.getColumns();

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
              <DatabaseForm
                projects={this.props.projects}
                input_project_id={input_project_id}
                input_database_name={input_database_name}
                input_host={input_host}
                input_port={input_port}
                input_user={input_user}
                input_password={input_password}
                input_db_type={input_db_type}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleCreateDatabase={this.handleCreateDatabase}
              />
            )}

            {/* Cập nhật dự án */}
            {isEditing && (
              <DatabaseFormEdit
                input_database_name={input_database_name}
                input_host={input_host}
                input_port={input_port}
                input_user={input_user}
                input_password={input_password}
                input_db_type={input_db_type}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleUpdateDatabase={this.handleUpdateDatabase}
                handleCancelEdit={this.handleCancelEdit}
              />
            )}
            <SelectDatabase
              projects={this.props.projects}
              databases={this.props.databases}
              db_root_id={db_root_id}
              search={search}
              handleSelectChange={this.handleSelectChange}
            />
          </div>
        )}

        {/* The table or content you want to render */}
        <Table
          rowKey="id"
          dataSource={filteredDatabases}
          columns={columns}
          style={{ marginTop: "16px" }}
          rowClassName="table-row"
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects, // Lấy projects từ Redux store
  databases: state.databases, // Sử dụng state.databases để lấy danh sách projects từ Redux store
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDBRoot: () => dispatch(fetchDBRoot()),
    fetchDatabases: () => dispatch(fetchDatabases()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Database);
