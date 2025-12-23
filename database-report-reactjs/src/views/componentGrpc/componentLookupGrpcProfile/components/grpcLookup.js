import { Card, Col, Collapse, Row, Select } from "antd";
import PropTypes from "prop-types";
import { Component } from "react";

const { Panel } = Collapse;
const { Option } = Select;

class GrpcLookup extends Component {
  static propTypes = {
    project_id: PropTypes.number,
    service_server_id: PropTypes.number,
    grpc_profile_item: PropTypes.array,
    service_kafka_grpc: PropTypes.array,
    handleSelectChange: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.grpc_profile_item?.service_server_id !==
        this.props.grpc_profile_item?.service_server_id &&
      parseInt(this.props.grpc_profile_item?.service_server_id) > 0 &&
      (!this.props.service_server_id || this.props.service_server_id === 0)
    ) {
      this.props.handleSelectChange(
        parseInt(this.props.grpc_profile_item.service_server_id),
        "service_server_id"
      );
    }
  }

  renderField = (field, indent = 0) => {
    const repeated = field.repeated ? "repeated " : "";

    if (field.fields) {
      return (
        <>
          <div style={{ marginLeft: indent }}>
            {repeated}message {field.type} {field.name} = {field.number} {"{"}
          </div>
          {field.fields.map((f, i) => this.renderField(f, indent + 20))}
          <div style={{ marginLeft: indent }}>{"}"}</div>
        </>
      );
    }

    return (
      <div style={{ marginLeft: indent }}>
        {repeated}
        {field.type} {field.name} = {field.number};
      </div>
    );
  };

  render() {
    const { grpc_profile_item } = this.props;

    return (
      grpc_profile_item?.package?.length > 0 && (
        <>
          <Col span={24} style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Card title="Thông tin Proto" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ width: 120, fontWeight: "bold" }}>
                      Package:
                    </div>
                    <div>{grpc_profile_item.package}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: 120, fontWeight: "bold" }}>
                      Server:
                    </div>

                    <Select
                      disabled={true}
                      style={{ width: "100%" }}
                      value={
                        parseInt(grpc_profile_item.service_server_id) > 0 &&
                        (this.props.service_server_id === "" ||
                          this.props.service_server_id === 0)
                          ? parseInt(grpc_profile_item.service_server_id)
                          : this.props.service_server_id
                      }
                      onChange={(value) =>
                        this.props.handleSelectChange(
                          value,
                          "service_server_id"
                        )
                      }
                      placeholder="Chọn server"
                    >
                      {this.props.service_kafka_grpc
                        .filter(
                          (server) =>
                            parseInt(server.project_id) ===
                            parseInt(this.props.project_id)
                        )
                        .map((server) => (
                          <Option key={server.id} value={server.id}>
                            {server.name}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card title="Danh sách Service">
              {Array.isArray(grpc_profile_item.proto_text_validator.services) &&
                grpc_profile_item.proto_text_validator.services.map(
                  (service, serviceIndex) => (
                    <Card
                      key={serviceIndex}
                      type="inner"
                      title={service.serviceName}
                      style={{ marginBottom: 16 }}
                    >
                      {service.rpcs.map((method, methodIndex) => (
                        <Card
                          key={methodIndex}
                          type="inner"
                          title={method.rpcName}
                          style={{ marginBottom: 8 }}
                        >
                          <div style={{ marginBottom: 16 }}>
                            <Select
                              mode="multiple"
                              style={{ width: "100%" }}
                              placeholder="Chọn clients cho method này"
                              value={
                                this.props.selectedClients?.[method.rpcName] ||
                                method.service_client_ids ||
                                []
                              }
                              onChange={(values) => {
                                const validValues = values.filter(
                                  (v) => v !== null && v !== undefined
                                );
                                this.props.handleClientsChange(
                                  method.rpcName,
                                  validValues
                                );
                              }}
                              disabled={true}
                              allowClear
                              showSearch
                              optionFilterProp="children"
                            >
                              {this.props.service_kafka_grpc
                                .filter(
                                  (client) =>
                                    parseInt(client.project_id) ===
                                    parseInt(this.props.project_id)
                                )
                                .map((client) => (
                                  <Option key={client.id} value={client.id}>
                                    {client.name}
                                  </Option>
                                ))}
                            </Select>
                          </div>

                          <Collapse ghost>
                            <Panel header="Request" key="1">
                              <pre
                                style={{
                                  backgroundColor: "#f6f8fa",
                                  padding: "12px",
                                  borderRadius: "6px",
                                  fontFamily: "monospace",
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                }}
                              >
                                {method.request ? (
                                  <>
                                    message {method.request.name} {"{"}
                                    {method.request.details.map((detail) =>
                                      this.renderField(detail, 20)
                                    )}
                                    {"}"}
                                  </>
                                ) : (
                                  "Không có dữ liệu"
                                )}
                              </pre>
                            </Panel>
                            <Panel header="Response" key="2">
                              <pre
                                style={{
                                  backgroundColor: "#f6f8fa",
                                  padding: "12px",
                                  borderRadius: "6px",
                                  fontFamily: "monospace",
                                  fontSize: "14px",
                                  lineHeight: "1.5",
                                }}
                              >
                                {method.response ? (
                                  <>
                                    message {method.response.name} {"{"}
                                    {method.response.details.map((detail) =>
                                      this.renderField(detail, 20)
                                    )}
                                    {"}"}
                                  </>
                                ) : (
                                  "Không có dữ liệu"
                                )}
                              </pre>
                            </Panel>
                          </Collapse>
                        </Card>
                      ))}
                    </Card>
                  )
                )}
            </Card>
          </Col>
        </>
      )
    );
  }
}

export default GrpcLookup;
