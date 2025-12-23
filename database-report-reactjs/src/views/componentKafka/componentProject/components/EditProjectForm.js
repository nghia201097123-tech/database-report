import React, { Component } from "react";
import { Button, Input } from "antd";

class EditProjectForm extends Component {
  render() {
    const {
      input_project_name,
      handleInputChange,
      handleUpdate,
      handleCancelEdit,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleUpdate}>
          <h3>Cập Nhật Dự Án</h3>
          <Input
            placeholder="Nhập tên dự án"
            value={input_project_name}
            onChange={(e) => handleInputChange(e, "input_project_name")}
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

export default EditProjectForm;
