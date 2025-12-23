import { Card, Col, Row, Select } from "antd";
import React, { Component } from "react";

class SelectLookupGrpc extends Component {
  render() {
    const {
      project_kafka_grpc,
      project_id,
      service_kafka_grpc_id,
      grpc_package_key,
      grpc_profiles,
      service_kafka_grpc,
      handleSelectChange,
    } = this.props;

    return (
      <>
        <Card className="card-filter" style={{ marginBottom: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={4} xl={4}>
              <div style={{ marginBottom: "8px" }}>Project:</div>
              <Select
                placeholder="Chọn Project"
                style={{ width: "100%" }}
                onChange={(value) => handleSelectChange(value, "project_id")}
                value={parseInt(project_id) || undefined}
              >
                {project_kafka_grpc?.map((project) => (
                  <Select.Option
                    key={parseInt(project.id)}
                    value={parseInt(project.id)}
                  >
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>

            {parseInt(project_id) > 0 && (
              <>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <div style={{ marginBottom: "8px" }}>Service:</div>

                  <Select
                    showSearch
                    placeholder="Nhập key service cần tìm"
                    value={"" || undefined}
                    onChange={(value) => {
                      handleSelectChange(value, "service_kafka_grpc_id");
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                  >
                    {service_kafka_grpc
                      ?.filter(
                        (item) =>
                          parseInt(item.project_id) === parseInt(project_id)
                      )
                      .map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div style={{ marginBottom: "8px" }}>Package:</div>

                  <Select
                    showSearch
                    placeholder="Nhập key package cần tìm"
                    value={grpc_package_key || undefined}
                    onChange={(value) => {
                      handleSelectChange(value, "grpc_package_key");
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                  >
                    {grpc_profiles
                      ?.filter(
                        (item) =>
                          parseInt(item.project_id) === parseInt(project_id) &&
                          parseInt(item.service_server_id) ===
                            parseInt(service_kafka_grpc_id)
                      )
                      .map((item) => (
                        <Select.Option key={item.id} value={item.package}>
                          {item.package}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              </>
            )}
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectLookupGrpc;
