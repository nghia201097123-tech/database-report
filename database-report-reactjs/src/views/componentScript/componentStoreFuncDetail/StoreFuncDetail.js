import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { StoreFuncDetailService } from "../../../services/storeFuncDetailService";
import { StoreFuncService } from "../../../services/storeFuncService";
import EnvStatusDetailEnum from "../../../utils/Enum/EnvStatusDetailEnum";
import { DateformatVNTimestamp } from "../../../utils/Moment/moment";
import "./../../../assets/Scss/templates/TableRow.scss";
import { StoreFuncDetailColumns } from "./columns/StoreFuncDetailColumns";
import StoreFuncNameDetailButton from "./components/StoreFuncNameDetailButton";
import StoreFuncNameViewDetail from "./components/StoreFuncNameViewDetail";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class StoreFuncDetail extends React.Component {
  state = {
    store_func_name_histories: [],
    disabled: false,
    loading: false,
    selectedRowKeys: [],
    visible: false,
    selectedRecord: [],
    store_func_name: {},
    search: "",
  };

  async componentDidMount() {
    await this.setState({ disabled: true, loading: true });
    let response = await StoreFuncService.getDetailStoreFunc(
      parseInt(this.props.id)
    );

    await this.setState({
      store_func_name: response.data.data,
      disabled:
        parseInt(response.data.data.is_latest_version) === 1 ? false : true,
    });

    const res = await StoreFuncDetailService.getStoreFuncDetails(
      parseInt(this.props.id)
    );

    await this.setState({ store_func_name_histories: res.data.data });
    await this.setState({ disabled: false, loading: false });
  }

  handleCloneStoreFuncWithConfirmation = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn chốt Store/Func này không?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Khi bạn chốt version này thì ngay lập tức sẽ khoá các store/func bên dưới và tạo ra version mới và chỉ ghi nhận các thay đổi tính từ thời điểm bạn xác nhận!",
      okText: "Chốt",
      cancelText: "Hủy",
      onOk: () => {
        this.handleCloneStoreFunc(parseInt(this.props.id)); // Perform the actual action if confirmed
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
  };

  handleViewDetails = (record) => {
    this.setState({ visible: true, selectedRecord: record });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleExportStoreFunc = async () => {
    try {
      await this.setState({
        disabled: true,
        loading: true,
      });

      await StoreFuncDetailService.exportStoreFuncDetails(
        this.state.store_func_name.db_name_id,
        parseInt(this.props.id)
      );

      // Fetch lại dữ liệu để load lại Table
      const res = await StoreFuncDetailService.getStoreFuncDetails(
        parseInt(this.props.id)
      );

      await this.setState({ store_func_name_histories: res.data.data });
    } catch (error) {
    } finally {
      this.setState({ disabled: false, loading: false });
    }
  };

  handleExportFileStoreFunc = async () => {
    try {
      await this.setState({
        disabled: true,
        loading: true,
      });
      const { store_func_name_histories, selectedRowKeys } = this.state;

      if (selectedRowKeys.length === 0) {
        toast.error("Bạn chưa chọn dữ liệu để export");
        return;
      }

      const storeFuncNames = await store_func_name_histories
        .filter(
          (history) =>
            selectedRowKeys.includes(+history.id) &&
            history.env !== EnvStatusDetailEnum.DELETE
        )
        .map((history) => history.store_func_name);

      if (storeFuncNames.length === 0) {
        toast.error("Store/Func đã xoá bạn không thể export!");
        return;
      }

      let res = await StoreFuncDetailService.exportFileStoreFuncDetails(
        this.state.store_func_name.db_name_id,
        parseInt(this.props.id),
        storeFuncNames
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

  handleExportFileStoreFuncNotLastUpdate = async () => {
    try {
      this.setState({
        disabled: true,
        loading: true,
      });
      const { store_func_name_histories, selectedRowKeys } = this.state;

      if (selectedRowKeys.length === 0) {
        toast.error("Bạn chưa chọn dữ liệu để export");
        return;
      }

      const storeFuncNames = store_func_name_histories
        .filter(
          (history) =>
            selectedRowKeys.includes(+history.id) &&
            history.env !== EnvStatusDetailEnum.DELETE
        )
        .map((history) => history.store_func_name);

      if (storeFuncNames.length === 0) {
        toast.error("Store/Func đã xoá bạn không thể export!");
        return;
      }

      let res = await StoreFuncDetailService.exportFileStoreFuncDetails(
        this.state.store_func_name.db_name_id,
        parseInt(this.props.id),
        storeFuncNames
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

  handleCloneStoreFunc = async () => {
    try {
      await this.setState({
        disabled: true,
        loading: true,
      });

      const { store_func_name_histories, selectedRowKeys } = this.state;
      const storeFuncNames = store_func_name_histories
        .filter((history) => selectedRowKeys.includes(+history.id))
        .map((history) => history.store_func_name);

      await StoreFuncService.cloneExport(
        parseInt(this.props.id),
        storeFuncNames
      );

      await this.handleExportFileStoreFunc();
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Có lỗi xảy ra khi clone!");
    } finally {
      await this.setState({
        disabled: false,
        loading: false,
      });
      this.props.navigate("/script-database");
    }
  };

  render() {
    const {
      disabled,
      store_func_name_histories,
      loading,
      selectedRowKeys,
      visible,
      selectedRecord,
      store_func_name,
      search,
    } = this.state;

    let filteredStoreFuncNameHistories = store_func_name_histories;

    if (search) {
      filteredStoreFuncNameHistories = filteredStoreFuncNameHistories.filter(
        (storeFuncNameHistory) =>
          storeFuncNameHistory.store_func_name
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    const columnsInstance = new StoreFuncDetailColumns(this.handleViewDetails);
    const columns = columnsInstance.getColumns();
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      columnWidth: 5,
      type: 'checkbox',
      preserveSelectedRowKeys: true,
      onSelectAll: async (selected) => {
        this.setState({ loading: true });
        if (selected) {
          const allKeys = store_func_name_histories.map((row) => row.id);
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
            {/* Thông tin Store/Func */}
            <div className="store-func-info" style={{ marginBottom: "20px" }}>
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <h2 style={{ marginBottom: "10px" }}>Thông tin Store/Func</h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <div>
                    <strong>Dự án: </strong>
                    {this.state.store_func_name.db_root_name}
                  </div>

                  <div>
                    <strong>Ngày xuất bản: </strong>
                    {DateformatVNTimestamp(
                      new Date(this.state.store_func_name.created_at)
                    )}
                  </div>

                  <div>
                    <strong>Tên database: </strong>
                    {this.state.store_func_name.db_name}
                  </div>

                  <div>
                    <strong>Phiên bản: </strong>
                    {this.state.store_func_name.is_latest_version === 1
                      ? "Mới nhất"
                      : "Cũ"}
                  </div>
                </div>
              </div>
            </div>

            {/* Load button */}
            <StoreFuncNameDetailButton
              disabled={disabled}
              store_func_name={store_func_name}
              handleExportStoreFunc={this.handleExportStoreFunc}
              handleExportFileStoreFunc={this.handleExportFileStoreFunc}
              handleExportFileStoreFuncNotLastUpdate={
                this.handleExportFileStoreFuncNotLastUpdate
              }
              handleCloneStoreFuncWithConfirmation={
                this.handleCloneStoreFuncWithConfirmation
              }
              handleSelectChange={this.handleSelectChange}
              search={search}
            />

            <Table
              rowSelection={rowSelection}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={filteredStoreFuncNameHistories}
              className="custom-table"
              pagination={{
                pageSize: store_func_name_histories.length,
                pageSizeOptions: ["10", "20", "50", "100"],
                showSizeChanger: true,
                position: ["bottomRight"],
                showTotal: (total) => `Tổng số: ${total} phần tử`,
                size: "small",
              }}
              scroll={{ x: "max-content", y: "calc(100vh - 300px)" }}
              bordered
              size="small"
              rowClassName="table-row"
              loading={loading}
            />

            {/* Load view details */}
            <StoreFuncNameViewDetail
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

export default withNavigation(withLocation(StoreFuncDetail));
