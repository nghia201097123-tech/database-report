import { Row } from "antd";
import "ckeditor5/ckeditor5.css";
import React from "react";
import { connect } from "react-redux";
import { BuildService } from "./../../../services/BuildService";
import { fetchProject, fetchService } from "./../../../store/action/actions";
import InputBuild from "./component/InputBuild";
import SelectProject from "./component/selectProject";
import SelectService from "./component/SelectService";

class CreateBuild extends React.Component {
  editorToolbarRef = React.createRef();

  state = {
    isMounted: false,
    inputBuildText: "",
    editorContent: "",
    project_id: 0,
    selectedClients: {},
    build_item: {},
  };

  async componentDidMount() {
    await this.props.fetchProject();
    await this.props.fetchService();
    this.setState({ isMounted: true });
  }

  handleSelectChange = (value, name) => {
    this.setState({
      [name]: value,
    });

    if (name === "project_id") {
      this.setState({
        selectedClients: {},
      });
    }
  };

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  handleEditorChange = (event, editor) => {
    const data = editor.getData();
    this.setState({ inputBuildText: data, editorContent: data });
  };

  handleSave = async () => {
    const { inputBuildText, project_id, selectedClients } = this.state;

    await BuildService.createBuild({
      project_id: parseInt(project_id),
      service_server_ids: selectedClients["service_client_ids"] || [],
      content: inputBuildText,
      build_at: new Date(),
    });
  };

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

  render() {
    return (
      <>
        <SelectProject
          project_kafka_grpc={this.props.project_kafka_grpc}
          project_id={this.state.project_id}
          handleSelectChange={this.handleSelectChange}
        />

        {parseInt(this.state.project_id) > 0 && (
          <Row gutter={16}>
            <InputBuild
              editorToolbarRef={this.editorToolbarRef}
              isMounted={true}
              inputBuildText={this.state.inputBuildText}
              handleEditorChange={this.handleEditorChange}
              handleSave={this.handleSave}
            />

            <SelectService
              service_kafka_grpc={this.props.service_kafka_grpc}
              project_id={this.state.project_id}
              selectedClients={this.state.selectedClients}
              build_item={this.state.build_item}
              handleClientsChange={this.handleClientsChange}
            />
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBuild);
