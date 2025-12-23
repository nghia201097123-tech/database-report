import { Card, Col, Select } from "antd";
import React from "react";

class Producer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producers: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.kafka_topic_key_info !== this.props.kafka_topic_key_info) {
      if (this.props.kafka_topic_key_info?.producer_services?.length > 0) {
        const newProducers =
          this.props.kafka_topic_key_info.producer_services.map(
            (producerService) => ({
              id: producerService.id,
              selectedService: producerService.id,
              producer_service_name: producerService.name,
            })
          );

        this.setState({ producers: newProducers });

        this.props.handleSelectChange(
          Array.from(
            new Set(
              newProducers.map((p) => p.selectedService).filter((id) => id > 0)
            )
          ),
          "producer_service_ids"
        );
      }
    }
  }

  addProducer = () => {
    this.setState((prevState) => ({
      producers: [
        ...prevState.producers,
        {
          id: prevState.producers.length + 1,
          selectedService: "",
          producer_service_name: "",
        },
      ],
    }));
  };

  removeProducer = (producerId) => {
    this.setState((prevState) => ({
      producers: prevState.producers.filter((p) => p.id !== producerId),
    }));
  };

  render() {
    const { project_id, service_kafka_grpc, kafka_topic_key_info } = this.props;
    const { producers } = this.state;

    return (
      <>
        <Col span={6} style={{ minWidth: "250px" }}>
          <Card
            size="small"
            styles={{
              body: { padding: "8px" },
              header: { padding: "0 8px" },
            }}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Producer</span>
                <button
                  style={{
                    padding: "1px 4px",
                    fontSize: "11px",
                    lineHeight: "1",
                  }}
                  onClick={this.addProducer}
                >
                  +
                </button>
              </div>
            }
            bordered={true}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                maxHeight: "600px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {producers.map((producer) => (
                <div
                  key={producer.id}
                  style={{
                    padding: "4px",
                    border: "1px solid #e8e8e8",
                    borderRadius: "4px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginBottom: "2px",
                    }}
                  >
                    {producer.producer_service_name === "" && (
                      <button
                        onClick={() => this.removeProducer(producer.id)}
                        style={{
                          padding: "0 3px",
                          fontSize: "10px",
                          lineHeight: "1",
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: "11px",
                      lineHeight: "1.2",
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Project:
                      <b>{kafka_topic_key_info?.project_service?.name}</b>
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Service:{" "}
                      <b>{producer.producer_service_name || "Chưa chọn"}</b>
                    </div>
                  </div>

                  <div style={{ marginTop: "3px" }}>
                    <Select
                      size="small"
                      style={{ width: "100%" }}
                      placeholder="Chọn service"
                      popupMatchSelectWidth={false}
                      options={service_kafka_grpc
                        ?.filter(
                          (service) =>
                            parseInt(service.project_id) ===
                            parseInt(project_id)
                        )
                        ?.map((serviceKafkaGrpc) => ({
                          value: String(serviceKafkaGrpc.id),
                          label: serviceKafkaGrpc.name,
                        }))}
                      value={String(producer.selectedService) || undefined}
                      onChange={(value) => {
                        this.setState((prevState) => {
                          const newProducers = prevState.producers.map((p) =>
                            p.id === producer.id
                              ? {
                                  ...p,
                                  selectedService: parseInt(value),
                                  producer_service_name:
                                    service_kafka_grpc.find(
                                      (s) => String(s.id) === value
                                    )?.name,
                                }
                              : p
                          );

                          this.props.handleSelectChange(
                            Array.from(
                              new Set(
                                newProducers
                                  .map((p) => p.selectedService)
                                  .filter((id) => id > 0)
                              )
                            ),
                            "producer_service_ids"
                          );

                          return { producers: newProducers };
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </>
    );
  }
}

export default Producer;
