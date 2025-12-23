import { Button, Input } from "antd";
import React, { Component } from "react";

class ProjectForm extends Component {
  render() {
    const { input_project_name, handleInputChange, handleSubmit } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <h3>{"Tạo Dự Án Mới"}</h3>
          <Input
            placeholder="Nhập tên dự án"
            value={input_project_name}
            onChange={(e) => handleInputChange(e, "input_project_name")}
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

export default ProjectForm;
