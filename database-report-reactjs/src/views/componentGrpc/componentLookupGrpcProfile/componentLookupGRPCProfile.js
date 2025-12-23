import { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GrpcProfileService } from "../../../services/grpcProfile";
import { fetchProject, fetchService } from "../../../store/action/actions";
import GrpcLookup from "./components/grpcLookup";
import SelectLookupGrpc from "./components/selectLookupGrpc";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class LookupGRPCProfile extends Component {
  state = {
    project_id: 0,
    service_kafka_grpc_id: 0,
    service_server_id: "",
    grpc_package_key: "",
    grpc_profiles: [],
    grpc_profile_item: {},
  };

  async componentDidMount() {
    // Chờ URL được cập nhật
    let searchParams = new URLSearchParams(window.location.search);
    let project_id = searchParams.get("project_id");
    let grpc_package_key = searchParams.get("grpc_package_key");

    if (!isNaN(parseInt(project_id))) {
      await this.setState({
        project_id: parseInt(project_id),
        grpc_package_key: grpc_package_key,
      });
    }

    await this.props.fetchProject();
    await this.props.fetchService();

    let response = await GrpcProfileService.getGrpcProfiles(
      this.state.project_id
    );
    this.setState({ grpc_profiles: response.data.data });

    if (!isNaN(parseInt(project_id))) {
      await this.handleGetGrpcProfileByPackage();
    }
  }

  handleGetGrpcProfileByPackage = async () => {
    let queryParams = `project_id=${this.state.project_id}&grpc_package_key=${this.state.grpc_package_key}`;

    this.props.navigate(`/grpc-search?${queryParams}`, {
      replace: false,
    });

    // Trích xuất giá trị từ queryParams (không dùng window.location)
    let searchParams = new URLSearchParams(queryParams);
    let grpc_package_key = searchParams.get("grpc_package_key");

    let response = await GrpcProfileService.getGrpcProfileByPackage(
      grpc_package_key
    );

    this.setState({
      service_server_id: response.data.data.service_server_id,
      grpc_profile_item: response.data.data,
    });
  };

  handleInputChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleSelectChange = async (value, key) => {
    await this.setState({
      [key]: value,
    });

    if (key === "grpc_package_key") {
      this.handleGetGrpcProfileByPackage();
    }
  };

  render() {
    const { project_kafka_grpc } = this.props;
    return (
      <>
        <SelectLookupGrpc
          project_kafka_grpc={project_kafka_grpc}
          project_id={parseInt(this.state.project_id)}
          service_kafka_grpc_id={this.state.service_kafka_grpc_id}
          grpc_package_key={this.state.grpc_package_key}
          grpc_profiles={this.state.grpc_profiles}
          service_kafka_grpc={this.props.service_kafka_grpc}
          handleSelectChange={this.handleSelectChange}
        />

        <GrpcLookup
          project_id={this.state.project_id}
          service_server_id={this.state.service_server_id}
          grpc_profile_item={this.state.grpc_profile_item}
          service_kafka_grpc={this.props.service_kafka_grpc}
          handleSelectChange={this.handleSelectChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project_kafka_grpc: state.project_kafka_grpc,
    service_kafka_grpc: state.service_kafka_grpc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => dispatch(fetchProject()),
    fetchService: () => dispatch(fetchService()),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(LookupGRPCProfile)
);
