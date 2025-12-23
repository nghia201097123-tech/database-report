import { Button, Input, Select } from "antd";
import React, { Component } from "react";

class ServiceForm extends Component {
  render() {
    const {
      project_kafka_grpc,
      input_project_id,
      input_service_name,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <h3>{"Tạo Service Mới"}</h3>

          <Select
            placeholder="Chọn project"
            style={{ width: "100%", marginBottom: "10px" }}
            value={input_project_id}
            onChange={(value) => handleSelectChange(value, "input_project_id")}
            defaultValue={project_kafka_grpc[0]?.id}
          >
            {project_kafka_grpc.map((projectKafkaGrpc) => (
              <Select.Option
                key={projectKafkaGrpc.id}
                value={projectKafkaGrpc.id}
              >
                {projectKafkaGrpc.name}
              </Select.Option>
            ))}
          </Select>

          <Input
            placeholder="Nhập tên service"
            value={input_service_name}
            onChange={(e) => handleInputChange(e, "input_service_name")}
          />
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Tạo mới
          </Button>
        </form>
      </div>
    );
  }
}

export default ServiceForm;
