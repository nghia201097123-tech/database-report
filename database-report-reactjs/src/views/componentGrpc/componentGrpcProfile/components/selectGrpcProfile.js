import { Card, Col, Row, Select } from "antd";
import React, { Component } from "react";

class SelectGrpcProfile extends Component {
  render() {
    const { project_kafka_grpc, project_id, handleSelectChange } = this.props;

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
                {project_kafka_grpc?.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectGrpcProfile;
