import { FolderAddOutlined, HistoryOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";

class BuildHeader extends Component {
  render() {
    const {
      isCreateBuildDisabled,
      handleCreateBuildClick,
      isHistoryBuildDisabled,
      handleHistoryBuildClick,
    } = this.props;

    return (
      <div className="template-header">
        <Button
          type="primary"
          className={`kafka-button ${isCreateBuildDisabled ? "disabled" : ""}`}
          onClick={handleCreateBuildClick}
          disabled={isCreateBuildDisabled}
        >
          <FolderAddOutlined /> Tạo bản build
        </Button>

        <Button
          type="primary"
          className={`kafka-button ${isHistoryBuildDisabled ? "disabled" : ""}`}
          onClick={handleHistoryBuildClick}
          disabled={isHistoryBuildDisabled}
        >
          <HistoryOutlined /> Lịch sử
        </Button>
      </div>
    );
  }
}

export default BuildHeader;
