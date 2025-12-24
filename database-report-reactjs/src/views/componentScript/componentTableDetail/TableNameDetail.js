import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Table, Spin, Button as AntButton } from "antd";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { TableNameDetailService } from "../../../services/tableNameDetailService";
import { TableNameService } from "../../../services/tableNameService";
import EnvStatusDetailEnum from "../../../utils/Enum/EnvStatusDetailEnum";
import { DateformatVNTimestamp } from "../../../utils/Moment/moment";
import "./../../../assets/Scss/templates/TableRow.scss";
import "./../../../assets/Scss/components/InfoBox.scss";
import "./../../../assets/Scss/components/DataTable.scss";
import "./../../../assets/Scss/components/EmptyState.scss";
import { TableNameDetailColumns } from "./columns/TableNameDetailColumns";
import TableNameDetailButton from "./components/TableNameDetailButton";
import TableNameViewDetail from "./components/TableNameViewDetail";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class TableNameDetail extends React.Component {
  state = {
    table_name_histories: [],
    disabled: false,
    loading: false,
    selectedRowKeys: [],
    visible: false,
    selectedRecord: [],
    table_name: {},
    search: "",
  };

  async componentDidMount() {
    await this.setState({ disabled: true, loading: true });

    let response = await TableNameService.getDetailTableName(
      parseInt(this.props.id)
    );

    await this.setState({
      table_name: response.data.data,
      disabled: response.data.data.is_latest_version === 1 ? false : true,
    });

    const res = await TableNameDetailService.getTableNameDetails(
      parseInt(this.props.id)
    );
    await this.setState({ table_name_histories: res.data.data });
    await this.setState({ disabled: false, loading: false });
  }

  handleCloneTableNameWithConfirmation = () => {
    Modal.confirm({
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "24px" }}>🔒</span>
          <span>Chốt Version Table</span>
        </div>
      ),
      icon: null,
      content: (
        <div>
          <p style={{ marginBottom: "12px", fontWeight: 500 }}>
            Khi bạn chốt version này:
          </p>
          <ul style={{ paddingLeft: "20px", marginTop: "12px", lineHeight: "1.8" }}>
            <li>✅ Các table bên dưới sẽ được khoá ngay lập tức</li>
            <li>✅ Hệ thống tạo version mới tự động</li>
            <li>✅ Chỉ ghi nhận thay đổi từ thời điểm xác nhận</li>
            <li style={{ color: "#f44336" }}>❌ Không thể hoàn tác sau khi chốt</li>
          </ul>
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#fff3cd",
              borderRadius: "4px",
              border: "1px solid #ffc107",
            }}
          >
            <strong>⚠️ Cảnh báo:</strong> Hành động này không thể hoàn tác!
          </div>
        </div>
      ),
      okText: "Xác nhận chốt",
      okType: "danger",
      cancelText: "Hủy bỏ",
      width: 520,
      onOk: () => {
        this.handleCloneTableName(parseInt(this.props.id));
      },
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });

    // Cập nhật selectedRowKeys khi tìm kiếm
    if (name === "search") {
      const { table_name_histories, selectedRowKeys } = this.state;
      const filteredKeys = table_name_histories
        .filter(history => 
          history.table_name.toLowerCase().includes(value.toLowerCase()) &&
          selectedRowKeys.includes(history.id)
        )
        .map(history => history.id);
      
      this.setState({ selectedRowKeys: filteredKeys });
    }
  };

  handleViewDetails = (record) => {
    this.setState({ visible: true, selectedRecord: record });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleExportTableName = async () => {
    try {
      await this.setState({
        disabled: true,
        loading: true,
      });

      await TableNameDetailService.exportTableNameDetails(
        this.state.table_name.db_name_id,
        parseInt(this.props.id)
      );

      // Fetch lại dữ liệu để load lại Table
      const res = await TableNameDetailService.getTableNameDetails(
        parseInt(this.props.id)
      );
      await this.setState({ table_name_histories: res.data.data });
    } catch (error) {
    } finally {
      await this.setState({ disabled: false, loading: false });
    }
  };

  handleExportFileTableName = async () => {
    try {
      await this.setState({
        disabled: true,
        loading: true,
      });
      const { table_name_histories, selectedRowKeys } = this.state;

      if (selectedRowKeys.length === 0) {
        toast.error("Bạn chưa chọn dữ liệu để export");
        return;
      }

      const tableNames = await table_name_histories
        .filter(
          (history) =>
            selectedRowKeys.includes(+history.id) &&
            history.env !== EnvStatusDetailEnum.DELETE
        )
        .map((history) => history.table_name);

      if (tableNames.length === 0) {
        toast.error("Table đã xoá bạn không thể export!");
        return;
      }

      let res = await TableNameDetailService.exportFileTableNameDetails(
        this.state.table_name.db_name_id,
        parseInt(this.props.id),
        tableNames
      );

      const fileUrl = `http://172.16.10.82:1997${res.data.data}`;
      const fileName = fileUrl.split("/").pop();

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Không thể tải file từ server");
      }
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("File đang được tải xuống!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tải file!");
    } finally {
      await this.setState({ disabled: false, loading: false });
    }
  };

  handleExportFileTableNameNotLastUpdate = async () => {
    try {
      this.setState({
        disabled: true,
        loading: true,
      });
      const { table_name_histories, selectedRowKeys } = this.state;

      if (selectedRowKeys.length === 0) {
        toast.error("Bạn chưa chọn dữ liệu để export");
        return;
      }

      const tableNames = table_name_histories
        .filter(
          (history) =>
            selectedRowKeys.includes(+history.id) &&
            history.env !== EnvStatusDetailEnum.DELETE
        )
        .map((history) => history.table_name);

      if (tableNames.length === 0) {
        toast.error("Table đã xoá bạn không thể export!");
        return;
      }

      let res = await TableNameDetailService.exportFileTableNameDetails(
        this.state.table_name.db_name_id,
        parseInt(this.props.id),
        tableNames
      );

      const fileUrl = `http://172.16.10.82:1997${res.data.data}`;
      const fileName = fileUrl.split("/").pop();

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Không thể tải file từ server");
      }
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("File đang được tải xuống!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tải file!");
    } finally {
      this.setState({ disabled: true, loading: false });
    }
  };

  handleCloneTableName = async () => {
    try {
      this.setState({
        disabled: true,
        loading: true,
      });

      const { table_name_histories, selectedRowKeys } = this.state;

      const tableNames = table_name_histories
        .filter((history) => selectedRowKeys.includes(+history.id))
        .map((history) => history.table_name);

      await TableNameService.cloneExport(parseInt(this.props.id), tableNames);
      await this.handleExportTableName();
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Có lỗi xảy ra khi clone!");
    } finally {
      this.setState({
        disabled: false,
        loading: false,
      });
      this.props.navigate("/script-database");
    }
  };

  render() {
    const {
      disabled,
      table_name_histories,
      loading,
      selectedRowKeys,
      visible,
      selectedRecord,
      search,
    } = this.state;

    let filteredTableNameHistories = table_name_histories;

    if (search) {
      filteredTableNameHistories = filteredTableNameHistories.filter(
        (tableNameHistory) =>
          tableNameHistory.table_name
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    const tableColumns = new TableNameDetailColumns(this.handleViewDetails);
    const columns = tableColumns.getColumns();

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      columnWidth: 5,
      onSelectAll: async (selected) => {
        this.setState({ loading: true });
        if (selected) {
          const allKeys = table_name_histories.map((row) => row.id);
          this.setState({
            selectedRowKeys: allKeys,
            loading: false,
          });
        } else {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }
      },
    };

    return (
      <>
        <div className="template-container">
          <div className="kafka-content">
            {/* Thông tin Table */}
            <div className="info-box">
              <h3 className="info-box__title">Thông tin Table</h3>
              <div className="info-box__grid">
                <div className="info-box__item">
                  <strong>Dự án</strong>
                  <span>{this.state.table_name.db_root_name || "N/A"}</span>
                </div>

                <div className="info-box__item">
                  <strong>Ngày xuất bản</strong>
                  <span>
                    {this.state.table_name.created_at
                      ? DateformatVNTimestamp(new Date(this.state.table_name.created_at))
                      : "N/A"}
                  </span>
                </div>

                <div className="info-box__item">
                  <strong>Tên database</strong>
                  <span>{this.state.table_name.db_name || "N/A"}</span>
                </div>

                <div className="info-box__item">
                  <strong>Phiên bản</strong>
                  <span
                    className={`info-box__badge info-box__badge--${
                      this.state.table_name.is_latest_version === 1 ? "latest" : "old"
                    }`}
                  >
                    {this.state.table_name.is_latest_version === 1 ? "Mới nhất" : "Cũ"}
                  </span>
                </div>
              </div>
            </div>

            {/* Load button */}
            <TableNameDetailButton
              disabled={disabled}
              table_name={this.state.table_name}
              handleExportTableName={this.handleExportTableName}
              handleExportFileTableName={this.handleExportFileTableName}
              handleExportFileTableNameNotLastUpdate={
                this.handleExportFileTableNameNotLastUpdate
              }
              handleCloneTableNameWithConfirmation={
                this.handleCloneTableNameWithConfirmation
              }
              handleSelectChange={this.handleSelectChange}
              search={search}
            />

            <div className="data-table-wrapper">
              <Table
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={filteredTableNameHistories}
                locale={{
                  emptyText: (
                    <div className="empty-state">
                      <div className="empty-state__icon">📋</div>
                      <h3 className="empty-state__title">Không có dữ liệu</h3>
                      <p className="empty-state__description">
                        Chưa có thay đổi nào được ghi nhận cho table này
                      </p>
                      <div className="empty-state__action">
                        <AntButton
                          type="primary"
                          size="large"
                          onClick={this.handleExportTableName}
                          disabled={disabled}
                          style={{
                            background: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
                            border: "none",
                          }}
                        >
                          <span style={{ marginRight: "8px" }}>🔍</span>
                          Kiểm tra ngay
                        </AntButton>
                      </div>
                    </div>
                  ),
                }}
                pagination={{
                  pageSize: 20,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showSizeChanger: true,
                  position: ["bottomRight"],
                  showTotal: (total) => `Tổng số: ${total} phần tử`,
                  size: "small",
                }}
                scroll={{ x: "max-content", y: "calc(100vh - 400px)" }}
                bordered
                rowClassName="table-row"
                loading={loading}
                size="small"
              />
            </div>

            {/* Load view details */}
            <TableNameViewDetail
              visible={visible}
              selectedRecord={selectedRecord}
              handleCancel={this.handleCancel}
            />
          </div>
        </div>
      </>
    );
  }
}

function withLocation(Component) {
  return (props) => {
    const location = useLocation();
    const { id } = useParams();
    return <Component {...props} location={location} id={id} />;
  };
}

export default withNavigation(withLocation(TableNameDetail));
