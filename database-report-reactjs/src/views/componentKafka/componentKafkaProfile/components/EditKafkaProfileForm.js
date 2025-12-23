import React, { Component } from "react";
import { Button, Checkbox, Input, Select } from "antd";

class EditKafkaProfileForm extends Component {
  render() {
    const {
      project_kafka_grpc_item,
      kafka_profile,
      kafka_profile_item,
      input_kafka_profile_name,
      input_kafka_profile_host,
      input_kafka_profile_port,
      input_is_master,
      input_master_id,
      handleInputChange,
      handleSelectChange,
      handleUpdate,
      handleCancelEdit,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleUpdate}>
          <h3>Cập Nhật Kafka Profile</h3>

          <Checkbox
            style={{ marginBottom: "10px" }}
            checked={
              kafka_profile_item.kafka_profile_leader_id > 0 ? true : false
            }
            disabled
          >
            Cluster
          </Checkbox>

          {!input_is_master && (
            <Input
              disabled
              value={project_kafka_grpc_item.name}
              style={{ marginBottom: "10px" }}
            />
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
            value={input_kafka_profile_name || kafka_profile_item?.name}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_name")}
          />

          <Input
            placeholder="Nhập host"
            value={input_kafka_profile_host || kafka_profile_item?.host}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_host")}
          />

          <Input
            placeholder="Nhập port"
            value={input_kafka_profile_port || kafka_profile_item?.port}
            onChange={(e) => handleInputChange(e, "input_kafka_profile_port")}
          />

          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Cập Nhật
            </Button>
            <Button onClick={handleCancelEdit}>Hủy</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditKafkaProfileForm;
