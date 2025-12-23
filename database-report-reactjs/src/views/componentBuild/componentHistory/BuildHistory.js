import { Table } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BuildService } from "../../../services/BuildService";
import { fetchProject, fetchService } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import "./../../../assets/Scss/templates/TableRow.scss";
import { BuildColumns } from "./columns/BuildColumn";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
class BuildHistory extends Component {
  editorToolbarRef = React.createRef();

  state = {
    builds: [],
    build_item: {},
  };

  async componentDidMount() {
    await this.props.fetchService();
    if (this.props.project_kafka_grpc.length === 0) {
      await this.props.fetchProject();
    }
    let response = await BuildService.getBuild();
    this.setState({
      builds: response.data.data,
    });
  }

  handleChangeStatus = async (id, status) => {
    await BuildService.changeStatusBuild(id, status);

    let response = await BuildService.getBuild();
    this.setState({
      builds: response.data.data,
    });
  };

  handleEdit = async (item) => {
    if (!item) {
      console.warn("Không có dữ liệu bản build để chuyển hướng");
      return;
    }

    this.props.navigate(`/build/${item.id}`, {
      replace: false,
    });
  };

  render() {
    const buildColumns = new BuildColumns();
    buildColumns.setHandlers(this.handleChangeStatus, this.handleEdit);
    const columns = buildColumns.getColumns();

    return (
      <>
        <div className="project-section">
          <Table
            rowKey="id"
            dataSource={this.state.builds}
            columns={columns}
            className="build-table"
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

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(BuildHistory)
);
