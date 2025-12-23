import { Row } from "antd";
import { HttpStatusCode } from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { KafkaProfileGroupIdService } from "../../../services/kafkaProfileGroupId";
import { KafkaTopicService } from "../../../services/kafkaTopicService";
import {
  fetchKafkaProfile,
  fetchProject,
  fetchService,
} from "../../../store/action/actions";
import "./../../../assets/Scss/templates/Header.scss";
import Consumer from "./components/Consumer";
import KeyTopicDetail from "./components/KeyTopicDetail";
import Producer from "./components/Producer";
import SelectKafkaTopic from "./components/SelectKafkaTopic";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class KafkaTopicLookUp extends Component {
  state = {
    project_id: 0,
    kafka_profile_id: 0,
    service_id: 0,
    kafka_topic_key: "",
    kafka_topic_key_info: {},
    topicStatus: null,
    kafka_topic_json: "",
    kafka_topic_note: "",
    is_edit: false,
    kafka_profile_group_ids: [],
    kafka_profile_group_id: 0,
    kafka_topic_list: [],
  };

  async componentDidMount() {
    try {
      // Chờ URL được cập nhật
      let searchParams = new URLSearchParams(window.location.search);
      let project_id = searchParams.get("project_id");
      let kafka_profile_id = searchParams.get("kafka_profile_id");
      let kafka_topic_key = searchParams.get("kafka_topic_key");

      if (!isNaN(parseInt(project_id))) {
        await this.setState({
          project_id: parseInt(project_id),
          kafka_profile_id: parseInt(kafka_profile_id),
          kafka_topic_key: kafka_topic_key,
        });
      }

      // Fetch data nếu chưa có
      if (this.props.project_kafka_grpc.length === 0) {
        await this.props.fetchProject();
      }
      if (this.props.kafka_profile.length === 0) {
        await this.props.fetchKafkaProfile();
      }
      if (this.props.service_kafka_grpc.length === 0) {
        await this.props.fetchService();
      }
      // Lấy danh sách Kafka topics từ service
      const response = await KafkaTopicService.getKafkaTopic(
        this.state.kafka_profile_id
      );

      await this.setState({
        kafka_topic_list: response.data.data,
        kafka_topic_key_info:
          this.state.kafka_topic_key === ""
            ? {}  
            : response.data.data.find(
                (item) => item.key === this.state.kafka_topic_key
              ) || {},
        kafka_profile_group_id:
          this.state.kafka_topic_key === ""
            ? {}
            : response.data.data.find(
                (item) => item.key === this.state.kafka_topic_key
              )[0]?.kafka_profile_group_id || 0,
      });

      if (!isNaN(parseInt(project_id))) {
        await this.handleSearch(this.state.kafka_topic_key);
      }
    } catch (error) {
      console.error("Error in componentDidMount:", error);
    }
  }

  handleInputChange = (e, key) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [key]: value });
  };

  handleSelectChange = async (value, key) => {
    await this.setState({
      [key]: value,
    });

    if (key === "project_id") {
      this.setState({
        kafka_profile_id: 0,
        kafka_topic_key: "",
        kafka_topic_key_info: {},
      });
    }

    if (key === "kafka_profile_id") {
      this.setState({
        kafka_topic_key: "",
        kafka_topic_key_info: {},
      });
    }
  };

  handleSearch = async (key) => {
    if (!key) {
      this.setState({
        topicStatus: {
          status: "invalid",
          message: "Vui lòng nhập key topic",
        },
      });
      return;
    }

    let queryParams = `project_id=${this.state.project_id}&kafka_profile_id=${this.state.kafka_profile_id}&kafka_topic_key=${key}`;
    this.props.navigate(`/kafka-search?${queryParams}`, {
      replace: false,
    });

    // Trích xuất giá trị từ queryParams (không dùng window.location)
    let searchParams = new URLSearchParams(queryParams);
    let project_id = searchParams.get("project_id");
    let kafka_profile_id = searchParams.get("kafka_profile_id");
    let kafka_topic_key = searchParams.get("kafka_topic_key");

    const response = await KafkaTopicService.getKafkaTopicLookUp(
      kafka_topic_key,
      parseInt(kafka_profile_id),
      parseInt(project_id)
    );

    if (response.data.status !== HttpStatusCode.Ok) {
      toast.error(response.data.message);
      return;
    }

    if (response.data.data.id === 0) {
      this.setState({
        topicStatus: {
          status: "notfound",
          message: "Key topic không tồn tại, bạn có thể tạo mới.",
        },
      });
    }

    if (response.data.data.id !== 0) {
      this.setState({
        topicStatus: {
          status: "exists",
          message: "Key topic đã tồn tại, bạn có thể cập nhật.",
        },
      });
    }

    const responseKafkaProfileGroupIds =
      await KafkaProfileGroupIdService.getKafkaProfileGroupIds(-1);

    this.setState({
      project_id: parseInt(project_id),
      kafka_topic_key_info: response.data.data,
      kafka_profile_group_ids: responseKafkaProfileGroupIds.data.data,
    });
  };

  handleUpdateTopicInfo = async () => {
    this.setState({ is_edit: true });
    try {
      await KafkaTopicService.updateKafkaTopic(
        parseInt(this.state.kafka_topic_key_info.id),
        this.state.producer_service_ids,
        parseInt(this.state.consumer_service_id),
        parseInt(this.state.kafka_profile_id),
        parseInt(this.state.kafka_profile_group_id),
        this.state.kafka_topic_key,
        this.state.kafka_topic_json,
        this.state.kafka_topic_note
      );
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.setState({ is_edit: false });
    }
  };

  handleCreateTopicInfo = async () => {
    try {
      await KafkaTopicService.createKafkaTopic(
        parseInt(this.state.project_id),
        this.state.producer_service_ids,
        parseInt(this.state.consumer_service_id),
        parseInt(this.state.kafka_profile_id),
        parseInt(this.state.kafka_profile_group_id),
        this.state.kafka_topic_key,
        this.state.kafka_topic_json,
        this.state.kafka_topic_note
      );
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.setState({ is_edit: false });
    }
  };

  render() {
    const { project_kafka_grpc, kafka_profile, service_kafka_grpc } =
      this.props;
    const { kafka_profile_group_ids } = this.state;

    return (
      <>
        {console.log(this.state)}
        <SelectKafkaTopic
          project_kafka_grpc={project_kafka_grpc}
          kafka_profile={kafka_profile}
          project_id={this.state.project_id}
          kafka_profile_id={this.state.kafka_profile_id}
          kafka_topic_key={this.state.kafka_topic_key}
          kafka_topic_list={this.state.kafka_topic_list}
          handleSelectChange={this.handleSelectChange}
          handleSearch={this.handleSearch}
        />

        {this.state.kafka_topic_key !== "" && (
          <>
            <Row gutter={[16, 16]}>
              <Producer
                project_id={this.state.project_id}
                kafka_topic_key_info={this.state.kafka_topic_key_info}
                service_kafka_grpc={service_kafka_grpc}
                handleSelectChange={this.handleSelectChange}
              />

              <Consumer
                project_id={this.state.project_id}
                kafka_topic_key_info={this.state.kafka_topic_key_info}
                service_kafka_grpc={service_kafka_grpc}
                handleSelectChange={this.handleSelectChange}
              />

              <KeyTopicDetail
                kafka_topic_key={this.state.kafka_topic_key}
                kafka_topic_key_info={this.state.kafka_topic_key_info}
                kafka_profile_group_ids={kafka_profile_group_ids}
                kafka_profile_group_id={this.state.kafka_profile_group_id}
                kafka_profile_id={this.state.kafka_profile_id}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
              />
            </Row>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project_kafka_grpc: state.project_kafka_grpc,
    kafka_profile: state.kafka_profile,
    service_kafka_grpc: state.service_kafka_grpc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: () => dispatch(fetchProject()),
    fetchKafkaProfile: () => dispatch(fetchKafkaProfile()),
    fetchService: () => dispatch(fetchService()),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(KafkaTopicLookUp)
);
