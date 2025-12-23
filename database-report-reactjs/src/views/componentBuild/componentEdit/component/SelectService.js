import { Card, Col, Select } from "antd";
import "ckeditor5/ckeditor5.css";
import React from "react";

class SelectService extends React.Component {
  render() {
    const {
      service_kafka_grpc,
      selectedClients,
      build_item,
      handleClientsChange,
    } = this.props;
    return (
      <>
        <Col span={8} style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Card title="Chọn danh sách service" style={{ marginBottom: 16 }}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn các mục"
              value={selectedClients["service_server_ids"] || []}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={service_kafka_grpc
                .filter(
                  (x) =>
                    parseInt(x.project_id) === parseInt(build_item.project_id)
                )
                .map((x) => {
                  return {
                    label: x.name,
                    value: x.id,
                  };
                })}
              onChange={(values) => {
                const validValues = values.filter(
                  (v) => v !== null && v !== undefined
                );
                handleClientsChange("service_server_ids", validValues);
              }}
            />
          </Card>
        </Col>
      </>
    );
  }
}

export default SelectService;
