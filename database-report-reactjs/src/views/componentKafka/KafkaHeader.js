import {
  AppstoreAddOutlined,
  FolderAddOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";

class KafkaHeader extends Component {
  render() {
    const {
      isProjectKafkaDisabled,
      handleProjectClick,
      isServiceKafkaDisabled,
      handleServiceClick,
      isKafkaProfileDisabled,
      handleKafkaProfileClick,
      isKafkaTopicDisabled,
      handleKafkaTopicClick,
      isLookupKafkaTopicDisabled,
      handleLookupKafkaTopicClick,
    } = this.props;

    return (
      <div className="template-header">
        <Button
          type="primary"
          className={`kafka-button ${isProjectKafkaDisabled ? "disabled" : ""}`}
          onClick={handleProjectClick}
          disabled={isProjectKafkaDisabled}
        >
          <FolderAddOutlined /> Cấu hình Dự Án
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isServiceKafkaDisabled ? "disabled" : ""}`}
          onClick={handleServiceClick}
          disabled={isServiceKafkaDisabled}
        >
          <AppstoreAddOutlined /> Cấu hình Service
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isKafkaProfileDisabled ? "disabled" : ""}`}
          onClick={handleKafkaProfileClick}
          disabled={isKafkaProfileDisabled}
        >
          <SettingOutlined /> Cấu hình Kafka
        </Button>

        <Button
          type="primary"
          className={`kafka-button ${isKafkaTopicDisabled ? "disabled" : ""}`}
          onClick={handleKafkaTopicClick}
          disabled={isKafkaTopicDisabled}
        >
          <SettingOutlined /> Thêm mới/Chỉnh sửa Topic
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${
            isLookupKafkaTopicDisabled ? "disabled" : ""
          }`}
          onClick={handleLookupKafkaTopicClick}
          disabled={isLookupKafkaTopicDisabled}
        >
          <SearchOutlined /> Tra cứu Topic
        </Button>
      </div>
    );
  }
}

export default KafkaHeader;
