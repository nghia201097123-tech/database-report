import { Card, Col, Select } from "antd";
import React from "react";

class Consumer extends React.Component {
  constructor(props) {
    super(props);
    const { kafka_topic_key_info } = props;
    const serviceName = "consumer_service";

    this.state = {
      selectedService: kafka_topic_key_info?.[serviceName]?.id
        ? String(kafka_topic_key_info[serviceName].id)
        : undefined,
    };
  }

  componentDidUpdate(prevProps) {
    const { kafka_topic_key_info } = this.props;
    const serviceName = "consumer_service";

    if (prevProps.kafka_topic_key_info !== kafka_topic_key_info) {
      this.setState({
        selectedService: kafka_topic_key_info?.[serviceName]?.id
          ? String(kafka_topic_key_info[serviceName].id)
          : undefined,
      });
    }

    // Xử lý giá trị mặc định
    if (
      prevProps.kafka_topic_key_info !== kafka_topic_key_info ||
      prevProps.service_kafka_grpc !== this.props.service_kafka_grpc
    ) {
      if (kafka_topic_key_info?.[serviceName]?.id) {
        this.props.handleSelectChange(
          String(kafka_topic_key_info[serviceName].id),
          "consumer_service_id"
        );
      } else if (this.props.service_kafka_grpc?.length > 0) {
        this.props.handleSelectChange(
          String(this.props.service_kafka_grpc[0].id),
          "consumer_service_id"
        );
      }
    }
  }

  render() {
    const title = "Consumer";
    const serviceName = "consumer_service";
    const { project_id, service_kafka_grpc, kafka_topic_key_info } = this.props;
    const { selectedService } = this.state;

    return (
      <Col span={6}>
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{title}</span>
            </div>
          }
          bordered={true}
          size="small"
        >
          {project_id && parseInt(project_id) > 0 ? (
            <div>
              <h3>Thông tin {title}:</h3>
              <p>
                Tên project:{" "}
                <b>{kafka_topic_key_info?.project_service?.name}</b>
              </p>
              <p>
                Tên service: <b>{kafka_topic_key_info?.[serviceName]?.name}</b>
              </p>

              <div style={{ marginBottom: "16px" }}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn service"
                  options={service_kafka_grpc
                    ?.filter(
                      (service) =>
                        parseInt(service.project_id) === parseInt(project_id)
                    )
                    ?.map((serviceKafkaGrpc) => ({
                      value: String(serviceKafkaGrpc.id),
                      label: serviceKafkaGrpc.name,
                    }))}
                  onChange={(value) => {
                    this.setState({ selectedService: value });
                    this.props.handleSelectChange(
                      String(value),
                      "consumer_service_id"
                    );
                  }}
                  value={selectedService}
                />
              </div>
            </div>
          ) : null}
        </Card>
      </Col>
    );
  }
}

export default Consumer;
