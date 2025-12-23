import { Card, Col, Input, Row, Select } from "antd";
import React, { Component } from "react";

class SelectKafkaTopic extends Component {
  render() {
    const {
      project_kafka_grpc,
      kafka_profile,
      project_id,
      kafka_profile_id,
      kafka_topic_key,
      handleInputChange,
      handleSelectChange,
      handleSearch,
    } = this.props;

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

            {project_id > 0 && (
              <>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <div style={{ marginBottom: "8px" }}>Kafka Profile:</div>
                  <Select
                    placeholder="Chọn Kafka Profile"
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleSelectChange(value, "kafka_profile_id")
                    }
                    value={
                      kafka_profile?.length > 0 && kafka_profile_id
                        ? kafka_profile_id
                        : undefined
                    }
                  >
                    {kafka_profile && kafka_profile.length > 0
                      ? kafka_profile
                          .filter(
                            (profile) =>
                              parseInt(profile.project_id) ===
                              parseInt(project_id)
                          )
                          .map((profile) => (
                            <Select.Option key={profile.id} value={profile.id}>
                              {profile.name}
                              <small style={{ color: "#888" }}>
                                ({profile.host})
                              </small>
                            </Select.Option>
                          ))
                      : null}
                  </Select>
                </Col>
                {kafka_profile_id > 0 && (
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <div style={{ marginBottom: "8px" }}>Topic Key:</div>
                    <Input.Search
                      placeholder="Nhập key topic cần tìm"
                      value={kafka_topic_key}
                      onChange={(e) => handleInputChange(e, "kafka_topic_key")}
                      onSearch={handleSearch}
                      enterButton="Tìm kiếm"
                      style={{ width: "100%" }}
                    />
                  </Col>
                )}
              </>
            )}
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectKafkaTopic;
