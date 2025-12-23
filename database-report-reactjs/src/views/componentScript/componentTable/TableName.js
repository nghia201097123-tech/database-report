import { Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableNameService } from "../../../services/tableNameService";
import {
  fetchDBRoot,
  fetchDatabases,
  fetchTableName,
} from "../../../store/action/actions";
import "./../../../assets/Scss/templates/TableRow.scss";
import { TableNameColumns } from "./columns/TableNameColumn";
import SelectTable from "./components/selectTable";
import TableNameFormEditNote from "./components/TableNameFormEditNote";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class TableName extends React.Component {
  state = {
    db_root_id: 0,
    db_name_id: 0,
    databases: [],
    isCreatedModalVisible: true,
    isToggleCreated: false,
    isEditing: false,
    table_name_detail: {},
    input_note: "",
  };

  async componentDidMount() {
    await this.props.fetchTableName();
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

  handleRedirectTableNameDetail = (item) => {
    if (!item) {
      console.warn("Không có dữ liệu table name để chuyển hướng");
      return;
    }

    this.props.navigate(`/table-detail/${item.id}`, {
      state: {
        table_name: item,
      },
      replace: false,
    });
  };

  handleEdit = (item) => {
    this.setState({
      isEditing: true,
      isToggleCreated: false,
      table_name_detail: item,
      input_note: item.note,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      table_name_detail: {},
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
      const { input_note, table_name_detail } = this.state;
      await TableNameService.updateNote(table_name_detail.id, input_note);

      this.setState({
        input_note: "",
        table_name_detail: {},
        isEditing: false,
      });
      this.props.fetchTableName();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  render() {
    const { isEditing, input_note, table_name_detail, db_root_id, db_name_id } =
      this.state;

    let filteredTableName =
      db_root_id > 0
        ? this.props.table_name.filter(
            (database) => +database.db_root_id === +db_root_id
          )
        : this.props.table_name;

    filteredTableName =
      db_name_id > 0
        ? filteredTableName.filter(
            (database) => +database.db_name_id === +db_name_id
          )
        : filteredTableName;

    filteredTableName = filteredTableName.map((x) => ({
      ...x,
      db_type: this.state.databases.find((y) => +y.id === +x.db_name_id)
        ?.db_type,
    }));

    const tableColumns = new TableNameColumns(
      this.handleRedirectTableNameDetail,
      this.handleEditNote
    );
    const columns = tableColumns.getColumns();
    return (
      <>
        {isEditing && (
          <TableNameFormEditNote
            input_note={input_note}
            handleInputChange={this.handleInputChange}
            handleUpdateNote={this.handleUpdateNote}
            handleCancelEdit={this.handleCancelEdit}
            db_name={table_name_detail.db_name}
            env={table_name_detail.env}
            export_at={table_name_detail.export_at}
          />
        )}

        <SelectTable
          projects={this.props.projects}
          databases={this.state.databases}
          db_root_id={this.state.db_root_id}
          db_name_id={this.state.db_name_id}
          handleSelectChange={this.handleSelectChange}
        />

        <Table
          rowKey={(record) => `${record.id}`} // Tạo key duy nhất dựa trên id và name
          dataSource={filteredTableName}
          columns={columns}
          style={{ marginTop: "16px" }}
          rowClassName={(record) =>
            +record.is_latest_version === 0 ? "table-row-faded" : "table-row"
          } // Kiểm tra điều kiện để làm mờ
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
  table_name: state.table_name,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDBRoot: () => dispatch(fetchDBRoot()),
    fetchDatabases: () => dispatch(fetchDatabases()),
    fetchTableName: () => dispatch(fetchTableName()),
  };
};
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(TableName)
);
