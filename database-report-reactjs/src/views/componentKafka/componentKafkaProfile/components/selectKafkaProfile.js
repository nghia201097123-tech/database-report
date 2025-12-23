import { Card, Col, Row, Select, Input } from "antd";
import React, { Component } from "react";

class SelectKafkaProfile extends Component {
  render() {
    const { project_kafka_grpc, project_id, search, handleSelectChange } =
      this.props;

    return (
      <>
        <Card className="card-filter" style={{ marginBottom: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div style={{ marginBottom: "8px" }}>Project:</div>
              <Select
                placeholder="Chọn Project"
                style={{ width: "100%" }}
                onChange={(value) => handleSelectChange(value, "project_id")}
                value={project_id || undefined}
              >
                <Select.Option key="all" value={0}>
                  ALL
                </Select.Option>
                {project_kafka_grpc?.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div style={{ marginBottom: "8px" }}>Tìm kiếm:</div>
              <Input
                placeholder="Nhập từ khóa tìm kiếm"
                style={{ width: "100%" }}
                onChange={(e) => handleSelectChange(e.target.value, "search")}
                value={search || ""}
              />
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectKafkaProfile;
