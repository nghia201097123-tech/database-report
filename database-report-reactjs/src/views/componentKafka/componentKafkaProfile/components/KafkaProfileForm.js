import { Button, Checkbox, Input, Select } from "antd";
import React, { Component } from "react";

class KafkaProfileForm extends Component {
  render() {
    const {
      project_kafka_grpc,
      kafka_profile,
      input_project_id,
      input_kafka_profile_name,
      input_kafka_profile_host,
      input_kafka_profile_port,
      input_is_master,
      input_master_id,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <h3>{"Tạo Kafka Profile"}</h3>

          <Checkbox
            style={{ marginBottom: "10px" }}
            checked={input_is_master}
            onChange={(e) => handleInputChange(e, "input_is_master")}
          >
            Cluster
          </Checkbox>

          {!input_is_master && (
            <Select
              placeholder="Chọn project"
              style={{ width: "100%", marginBottom: "10px" }}
              value={input_project_id || undefined}
              onChange={(value) => handleSelectChange(value, "input_project_id")}
            >
              {project_kafka_grpc?.map((projectKafkaGrpc) => (
                <Select.Option
                  key={projectKafkaGrpc.id}
                  value={projectKafkaGrpc.id}
                >
                  {projectKafkaGrpc.name}
                </Select.Option>
              ))}
            </Select>
          )}

          {input_is_master && (
            <Select
              placeholder="Chọn master"
              style={{ width: "100%", marginBottom: "10px" }}
              value={input_master_id || undefined}
              onChange={(value) => handleSelectChange(value, "input_master_id")}
            >
              {kafka_profile?.map((kafkaProfile) => (
                <Select.Option key={kafkaProfile.id} value={kafkaProfile.id}>
                  {kafkaProfile.name}
                </Select.Option>
              ))}
            </Select>
          )}

          <Input
            placeholder="Nhập tên kafka profile"
            value={input_kafka_profile_name}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_name")}
          />

          <Input
            placeholder="Nhập host"
            value={input_kafka_profile_host}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_host")}
          />

          <Input
            placeholder="Nhập port"
            value={input_kafka_profile_port}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_port")}
          />

          <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
            Tạo mới
          </Button>
        </form>
      </div>
    );
  }
}

export default KafkaProfileForm;
