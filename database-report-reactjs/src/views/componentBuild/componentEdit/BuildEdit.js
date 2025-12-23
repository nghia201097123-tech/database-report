import { Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BuildService } from "../../../services/BuildService";
import { fetchProject, fetchService } from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import "./../../../assets/Scss/templates/TableRow.scss";
import InputBuild from "./component/InputBuild";
import SelectService from "./component/SelectService";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
class BuildEdit extends Component {
  editorToolbarRef = React.createRef();

  state = {
    build_item: {},
    selectedClients: {},
    inputBuildText: "",
  };

  async componentDidMount() {
    await this.props.fetchService();
    if (this.props.project_kafka_grpc.length === 0) {
      await this.props.fetchProject();
    }
    let res = await BuildService.getDetailBuild(parseInt(this.props.id));
    this.setState({
      build_item: res.data.data,
      selectedClients: {
        service_server_ids: res.data.data.service_server_ids,
      },
      inputBuildText: res.data.data.content,
    });
  }

  handleClientsChange = (methodName, values) => {
    const key = `${methodName}`;

    // Đảm bảo values là một mảng và loại bỏ các giá trị trùng lặp
    const uniqueValues = Array.from(new Set(values));

    // Sử dụng Promise để đảm bảo state được cập nhật đồng bộ
    return new Promise((resolve) => {
      this.setState(
        (prevState) => {
          const newSelectedClients = {
            ...prevState.selectedClients,
            [key]: uniqueValues,
          };

          return {
            selectedClients: newSelectedClients,
          };
        },
        () => {
          resolve();
        }
      );
    });
  };

  handleEditorChange = (event, editor) => {
    const data = editor.getData();

    this.setState({ inputBuildText: data, editorContent: data });
  };

  handleSave = async () => {
    await BuildService.updateBuild({
      id: parseInt(this.state.build_item.id),
      project_id: parseInt(this.state.build_item.project_id),
      service_server_ids:
        this.state.selectedClients["service_server_ids"] || [],
      content: this.state.inputBuildText,
      build_at: new Date(),
    });
  };

  render() {
    return (
      <>
        <Row gutter={16}>
          <InputBuild
            editorToolbarRef={this.editorToolbarRef}
            isMounted={true}
            inputBuildText={this.state.inputBuildText}
            handleEditorChange={this.handleEditorChange}
            handleSave={this.handleSave}
            build_item={this.state.build_item}
          />

          <SelectService
            service_kafka_grpc={this.props.service_kafka_grpc}
            selectedClients={this.state.selectedClients}
            build_item={this.state.build_item}
            handleClientsChange={this.handleClientsChange}
          />
        </Row>
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

function withLocation(Component) {
  return (props) => {
    const location = useLocation();
    const { id } = useParams();
    return <Component {...props} location={location} id={id} />;
  };
}
export default withNavigation(
  withLocation(connect(mapStateToProps, mapDispatchToProps)(BuildEdit))
);
