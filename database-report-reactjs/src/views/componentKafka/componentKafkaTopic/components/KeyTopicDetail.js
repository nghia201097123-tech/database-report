import { Card, Col, Select } from "antd";
import React, { Component } from "react";

class KeyTopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroupId:
        props.kafka_topic_key_info?.kafka_profile_group_id?.id ||
        props.kafka_profile_group_id,
    };
  }

  componentDidMount() {
    const { kafka_topic_key_info, handleInputChange, handleSelectChange } =
      this.props;

    if (kafka_topic_key_info?.note) {
      handleInputChange(
        { target: { value: kafka_topic_key_info.note } },
        "kafka_topic_note"
      );
    }

    if (kafka_topic_key_info?.json) {
      handleInputChange(
        {
          target: {
            value: JSON.stringify(kafka_topic_key_info.json, null, 2),
          },
        },
        "kafka_topic_json"
      );
    }

    if (kafka_topic_key_info?.kafka_profile_group_id?.id) {
      const defaultId = kafka_topic_key_info.kafka_profile_group_id.id;
      this.setState({ selectedGroupId: defaultId });
      handleSelectChange(defaultId, "kafka_profile_group_id");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.kafka_topic_key_info !== this.props.kafka_topic_key_info) {
      // Thực hiện lại các xử lý tương tự như trong componentDidMount
      const { kafka_topic_key_info, handleInputChange, handleSelectChange } =
        this.props;

      if (kafka_topic_key_info?.note) {
        handleInputChange(
          { target: { value: kafka_topic_key_info.note } },
          "kafka_topic_note"
        );
      }

      if (kafka_topic_key_info?.json) {
        handleInputChange(
          {
            target: {
              value: JSON.stringify(kafka_topic_key_info.json, null, 2),
            },
          },
          "kafka_topic_json"
        );
      }

      if (kafka_topic_key_info?.kafka_profile_group_id?.id) {
        const defaultId = kafka_topic_key_info.kafka_profile_group_id.id;
        this.setState({ selectedGroupId: defaultId });
        handleSelectChange(defaultId, "kafka_profile_group_id");
      }
    }
  }

  render() {
    const {
      kafka_topic_key,
      kafka_topic_key_info,
      kafka_profile_group_ids,
      kafka_profile_id,
      handleInputChange,
      handleSelectChange,
    } = this.props;
    const { selectedGroupId } = this.state;

    return (
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        style={{
          height: "100%",
          position: "sticky",
          top: 0,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Thông tin Topic Key</span>
            </div>
          }
          bordered={true}
          size="small"
          styles={{
            body: {
              padding: "16px",
              overflowX: "hidden",
            },
          }}
        >
          <div
            style={{
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            <h3>Chi tiết Topic Key:</h3>
            <table
              style={{
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <colgroup>
                <col style={{ width: "120px" }} />
                <col style={{ width: "calc(100% - 120px)" }} />
              </colgroup>
              <tbody>
                <tr>
                  <td style={{ padding: "8px 0" }}>
                    <strong>Key:</strong>
                  </td>
                  <td>{kafka_topic_key || "Chưa có"}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0" }}>
                    <strong>Group Id:</strong>
                  </td>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Chọn service"
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={kafka_profile_group_ids
                        ?.filter(
                          (item) =>
                            typeof item.kafka_profile_id === "number" &&
                            typeof kafka_profile_id === "number" &&
                            item.kafka_profile_id === kafka_profile_id
                        )
                        .map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                      onChange={(value) => {
                        const newValue =
                          value ||
                          kafka_topic_key_info?.kafka_profile_group_id?.id;
                        this.setState({ selectedGroupId: newValue });
                        handleSelectChange(newValue, "kafka_profile_group_id");
                      }}
                      value={
                        selectedGroupId ||
                        kafka_topic_key_info?.kafka_profile_group_id?.id
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                    <strong>Ghi chú:</strong>
                  </td>
                  <td>
                    <textarea
                      style={{
                        width: "100%",
                        minHeight: "100px",
                        maxWidth: "100%",
                        background: "#f5f5f5",
                        padding: "8px",
                        borderRadius: "4px",
                        margin: "4px 0",
                        fontFamily: "monospace",
                        resize: "vertical",
                        border: "1px solid #d9d9d9",
                        boxSizing: "border-box",
                      }}
                      placeholder="Nhập dữ liệu ghi chú"
                      defaultValue={kafka_topic_key_info?.note || ""}
                      onChange={(e) => {
                        handleInputChange(e, "kafka_topic_note");
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                    <strong>Key-Value:</strong>
                  </td>
                  <td>
                    <textarea
                      style={{
                        width: "100%",
                        minHeight: "200px",
                        maxWidth: "100%",
                        background: "#f5f5f5",
                        padding: "8px",
                        borderRadius: "4px",
                        margin: "4px 0",
                        fontFamily: "monospace",
                        resize: "vertical",
                        border: "1px solid #d9d9d9",
                        boxSizing: "border-box",
                      }}
                      placeholder="Nhập dữ liệu JSON key-value"
                      defaultValue={
                        kafka_topic_key_info?.json
                          ? JSON.stringify(kafka_topic_key_info.json, null, 2)
                          : ""
                      }
                      onChange={(e) => {
                        handleInputChange(e, "kafka_topic_json");
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </Col>
    );
  }
}

export default KeyTopicDetail;
