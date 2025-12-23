import { Card, Col, Select } from "antd";
import "ckeditor5/ckeditor5.css";
import React from "react";

class SelectService extends React.Component {
  render() {
    const { service_kafka_grpc, project_id, selectedClients, build_item } =
      this.props;
    return (
      <>
        <Col span={8} style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Card title="Chọn danh sách service" style={{ marginBottom: 16 }}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn các mục"
              options={service_kafka_grpc
                .filter((x) => parseInt(x.project_id) === parseInt(project_id))
                .map((x) => {
                  return {
                    label: x.name,
                    value: x.id,
                  };
                })}
              value={
                selectedClients["service_client_ids"] ||
                build_item["service_client_ids"] ||
                []
              }
              onChange={(values) => {
                const validValues = values.filter(
                  (v) => v !== null && v !== undefined
                );
                this.props.handleClientsChange(
                  "service_client_ids",
                  validValues
                );
              }}
            />
          </Card>
        </Col>
      </>
    );
  }
}

export default SelectService;
