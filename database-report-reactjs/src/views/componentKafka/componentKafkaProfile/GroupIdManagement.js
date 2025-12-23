import { Button, Form, Input, List, Modal } from "antd";
import React, { Component } from "react";
import { KafkaProfileGroupIdService } from "./../../../services/kafkaProfileGroupId";

class GroupIdManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingId: null,
      editingText: "",
    };
    this.formRef = React.createRef();
  }

  handleEdit = (item) => {
    this.setState({
      editingId: item.id,
      editingText: item.name,
    });
  };

  handleSave = async (item) => {
    await KafkaProfileGroupIdService.updateKafkaProfileGroupId(
      item.id,
      this.state.editingText
    );

    this.setState({
      editingId: null,
      editingText: "",
    });
    this.props.handleGroupIdManagementCancel();
  };

  onFinish = (values) => {
    this.props.handleAddNewGroupId(values);
    this.formRef.current.resetFields();
  };

  render() {
    const {
      isModalVisible,
      kafka_profile_group_ids,
      handleGroupIdManagementCancel,
    } = this.props;
    const { editingId, editingText } = this.state;

    return (
      <Modal
        title="Quản lý Group ID"
        open={isModalVisible}
        onCancel={() => handleGroupIdManagementCancel()}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => handleGroupIdManagementCancel()}>
            Hủy
          </Button>,
        ]}
      >
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item
            name="group_id_name"
            rules={[{ required: true, message: "Vui lòng nhập tên group" }]}
          >
            <Input placeholder="Nhập tên group mới" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>

        <List
          dataSource={kafka_profile_group_ids}
          renderItem={(item) => (
            <List.Item
              actions={[
                editingId === item.id ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => this.handleSave(item)}
                  >
                    Xác nhận
                  </Button>
                ) : (
                  <Button type="link" onClick={() => this.handleEdit(item)}>
                    Sửa
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={
                  editingId === item.id ? (
                    <Input
                      value={editingText}
                      onChange={(e) =>
                        this.setState({ editingText: e.target.value })
                      }
                      onPressEnter={() => this.handleSave(item)}
                    />
                  ) : (
                    item.name
                  )
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    );
  }
}

export default GroupIdManagement;
