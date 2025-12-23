import { Card, Col, Row } from "antd";
import React, { Component } from "react";

class ValidateSearch extends Component {
  render() {
    const {
      topicStatus,
      kafka_topic_key_info,
      handleCreateTopicInfo,
      handleUpdateTopicInfo,
    } = this.props;

    return (
      <>
        <Card style={{ marginBottom: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div
                style={{
                  padding: "20px",
                  backgroundColor:
                    topicStatus.status === "exists"
                      ? "#e6f7ff"
                      : topicStatus.status === "notfound"
                      ? "#f6ffed"
                      : "#fff1f0",
                  border: `1px solid ${
                    topicStatus.status === "exists"
                      ? "#91d5ff"
                      : topicStatus.status === "notfound"
                      ? "#b7eb8f"
                      : "#ffa39e"
                  }`,
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color:
                          topicStatus.status === "exists"
                            ? "#1890ff"
                            : topicStatus.status === "notfound"
                            ? "#52c41a"
                            : "#f5222d",
                        margin: 0,
                      }}
                    >
                      Trạng thái Topic Key:
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        margin: "10px 0 0 0",
                      }}
                    >
                      {topicStatus.message}
                    </p>
                  </div>
                  <button
                    onClick={
                      kafka_topic_key_info.id === 0
                        ? handleCreateTopicInfo
                        : handleUpdateTopicInfo
                    }
                    style={{
                      padding: "8px 16px",
                      borderRadius: "4px",
                      border: "none",
                      backgroundColor: "#1890ff",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {kafka_topic_key_info.id === 0 ? "Tạo mới" : "Cập nhật"}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default ValidateSearch;
