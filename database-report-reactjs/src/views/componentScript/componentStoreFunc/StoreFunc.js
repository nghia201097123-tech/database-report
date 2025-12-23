import { Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchDBRoot,
  fetchDatabases,
  fetchStoreFuncName,
} from "../../../store/action/actions";
import "./../../../assets/Scss/templates/TableRow.scss";
import { StoreFuncService } from "./../../../services/storeFuncService";
import { StoreFuncColumns } from "./columns/StoreFuncColumn";
import SelectStoreFunc from "./components/selectStoreFunc";
import StoreFuncFormEditNote from "./components/StoreFuncFormEditNote";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class StoreFunc extends React.Component {
  state = {
    db_root_id: 0,
    db_name_id: 0,
    databases: [],
    isCreatedModalVisible: true,
    isToggleCreated: false,
    isEditing: false,
    store_func_name_detail: {},
    input_note: "",
  };

  async componentDidMount() {
    await this.props.fetchStoreFuncName();
    await this.props.fetchDatabases();
    await this.props.fetchDBRoot();

    // Xử lý databases
    const dbData =
      this.props.databases.length === 0
        ? (await this.props.fetchDatabases()) || []
        : this.props.databases;

    this.setState({
      databases: dbData.map((x) => ({
        id: x.id,
        db_root_id: x.db_root_id,
        database: x.database,
        host: x.host,
        port: x.port,
        db_type: x.db_type,
      })),
    });
  }

  handleRedirectStoreFuncDetail = (item) => {
    if (!item) {
      console.warn("Không có dữ liệu store func để chuyển hướng");
      return;
    }

    this.props.navigate(`/store-func-detail/${item.id}`, {
      state: {
        store_func_name: item,
      },
      replace: false,
    });
  };

  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      isToggleCreated: false,
      store_func_name_detail: item,
      input_note: item.note,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      store_func_name_detail: {},
      input_note: "",
    });
  };

  // Hàm để lấy dữ liệu từ input
  handleInputChange = (e, inputName) => {
    this.setState({ [inputName]: e.target.value });
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });

    if (name === "db_root_id") {
      this.setState({ db_name_id: 0 });
    }
  };

  handleUpdateNote = async (event) => {
    try {
      event.preventDefault();
      const { input_note, store_func_name_detail } = this.state;
      await StoreFuncService.updateNote(store_func_name_detail.id, input_note);

      this.setState({
        input_note: "",
        store_func_name_detail: {},
        isEditing: false,
      });
      this.props.fetchStoreFuncName();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  render() {
    const {
      isEditing,
      input_note,
      store_func_name_detail,
      db_root_id,
      db_name_id,
    } = this.state;

    let filteredStoreFuncName =
      db_root_id > 0
        ? this.props.store_func_name.filter(
            (database) => +database.db_root_id === +db_root_id
          )
        : this.props.store_func_name;

    filteredStoreFuncName =
      db_name_id > 0
        ? filteredStoreFuncName.filter(
            (database) => +database.db_name_id === +db_name_id
          )
        : filteredStoreFuncName;

    filteredStoreFuncName = filteredStoreFuncName.map((x) => ({
      ...x,
      db_type: this.state.databases.find((y) => +y.id === +x.db_name_id)
        ?.db_type,
    }));

    const columnsInstance = new StoreFuncColumns(
      this.handleRedirectStoreFuncDetail,
      this.handleEditNote
    );
    const columns = columnsInstance.getColumns();
    return (
      <>
        {isEditing && (
          <StoreFuncFormEditNote
            input_note={input_note}
            handleInputChange={this.handleInputChange}
            handleUpdateNote={this.handleUpdateNote}
            handleCancelEdit={this.handleCancelEdit}
            db_name={store_func_name_detail.db_name}
            env={store_func_name_detail.env}
            export_at={store_func_name_detail.export_at}
          />
        )}

        <SelectStoreFunc
          projects={this.props.projects}
          databases={this.state.databases}
          db_root_id={this.state.db_root_id}
          db_name_id={this.state.db_name_id}
          handleSelectChange={this.handleSelectChange}
        />

        <Table
          rowKey={(record) => `${record.id}`}
          dataSource={filteredStoreFuncName}
          columns={columns}
          style={{ marginTop: "16px" }}
          rowClassName={(record) =>
            +record.is_latest_version === 0 ? "table-row-faded" : "table-row"
          }
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
          scroll={{ x: "max-content", y: "calc(100vh - 320px)" }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects, // Lấy projects từ Redux store
  databases: state.databases, // Sử dụng state.databases để lấy danh sách projects từ Redux store
  store_func_name: state.store_func_name,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDBRoot: () => dispatch(fetchDBRoot()),
    fetchDatabases: () => dispatch(fetchDatabases()),
    fetchStoreFuncName: () => dispatch(fetchStoreFuncName()),
  };
};
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(StoreFunc)
);
