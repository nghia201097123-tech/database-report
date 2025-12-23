import { Row } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { GrpcProfileService } from "../../../services/grpcProfile";
import { GrpcProfileServiceService } from "../../../services/grpcProfileService";
import { fetchProject, fetchService } from "../../../store/action/actions";
import GrpcProfileLeft from "./components/grpcProfileLeft";
import GrpcProfileRight from "./components/grpcProfileRight";
import SelectGrpcProfile from "./components/selectGrpcProfile";

class GRPCProfile extends Component {
  state = {
    input_proto_text: "",
    project_id: 0,
    service_server_id: "",
    disabled: false,
    id_reset_disabled: true,
    protoInfo: {},
    selectedClients: {},
  };

  async componentDidMount() {
    if (this.props.project_kafka_grpc.length === 0) {
      await this.props.fetchProject();
    }

    if (this.props.service_kafka_grpc.length === 0) {
      await this.props.fetchService();
    }
  }

  handleInputChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleSelectChange = async (value, key) => {
    await this.setState({
      [key]: value,
    });

    if (key === "project_id") {
      this.setState({
        service_server_id: "",
        protoInfo: {},
        selectedClients: {},
        disabled: false,
        id_reset_disabled: true,
      });
    }
  };

  handleCheck = async () => {
    try {
      let response = await GrpcProfileService.checkProtoAndGetInfo(
        this.state.input_proto_text
      );

      const initialSelectedClients = {};
      response.data.data.services.forEach((service) => {
        service.rpcs.forEach((rpc) => {
          const key = `${rpc.rpcName}`;
          initialSelectedClients[key] = rpc.service_client_ids || [];
        });
      });

      this.setState({
        protoInfo: response.data.data,
        disabled: true,
        id_reset_disabled: false,
        selectedClients: initialSelectedClients,
      });
    } catch (error) {
      console.error("Lỗi khi parse JSON:", error);
    }
  };

  handleServerChange = (value) => {
    this.setState({ selectedServer: value });
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

  handleReset = () => {
    this.setState({
      disabled: false,
      id_reset_disabled: true,
      protoInfo: {},
      service_server_id: 0,
      selectedClients: {},
    });
  };

  handleSubmit = async () => {
    try {
      const {
        protoInfo,
        selectedClients,
        project_id,
        service_server_id,
        input_proto_text,
      } = this.state;

      // Đảm bảo tất cả các giá trị được giữ nguyên
      const servicesWithClients = await protoInfo.services.map((service) => ({
        ...service,
        rpcs: service.rpcs.map((rpc) => {
          const key = `${rpc.rpcName}`;

          const clientIds = [...(selectedClients[key] || [])];

          return {
            ...rpc,
            service_client_ids: clientIds,
          };
        }),
      }));

      protoInfo["services"] = servicesWithClients;

      let response = await GrpcProfileService.createGrpcProfile(
        parseInt(project_id),
        parseInt(service_server_id),
        input_proto_text,
        protoInfo,
        protoInfo["package"]
      );

      await GrpcProfileServiceService.createGrpcProfileService(
        parseInt(response.data.data.id),
        servicesWithClients
      );
    } catch (error) {
      console.error("Lỗi khi tạo profile:", error);
    }
  };

  render() {
    return (
      <>
        <SelectGrpcProfile
          project_kafka_grpc={this.props.project_kafka_grpc}
          project_id={this.state.project_id}
          handleSelectChange={this.handleSelectChange}
        />

        {this.state.project_id !== 0 && (
          <Row gutter={16}>
            <GrpcProfileLeft
              disabled={this.state.disabled}
              id_reset_disabled={this.state.id_reset_disabled}
              input_proto_text={this.state.input_proto_text}
              handleInputChange={this.handleInputChange}
              handleCheck={this.handleCheck}
              handleReset={this.handleReset}
            />

            <GrpcProfileRight
              project_id={this.state.project_id}
              protoInfo={this.state.protoInfo}
              service_kafka_grpc={this.props.service_kafka_grpc}
              service_server_id={this.state.service_server_id}
              selectedClients={this.state.selectedClients}
              handleServerChange={this.handleServerChange}
              handleClientsChange={this.handleClientsChange}
              handleSubmit={this.handleSubmit}
              handleSelectChange={this.handleSelectChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(GRPCProfile);
