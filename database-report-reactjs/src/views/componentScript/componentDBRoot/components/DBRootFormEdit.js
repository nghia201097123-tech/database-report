import { Button, Input, Select } from "antd";
import React, { Component } from "react";

class DBRootFormEdit extends Component {
  render() {
    const {
      input_name,
      input_env,
      handleInputChange,
      handleSelectChange,
      handleUpdateDBRoot,
      handleCancelEdit,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleUpdateDBRoot}>
          <h3>{"Cập Nhật Dự Án"}</h3>

          <div className="form-group">
            <label
              htmlFor="input_name"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Tên dự án
            </label>
            <Input
              placeholder="Type your name here"
              value={input_name}
              onChange={(e) => handleInputChange(e, "input_name")}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="input_env"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Môi trường
            </label>
            <Select
              defaultValue="beta"
              style={{ width: "100%", marginTop: "10px" }}
              value={input_env}
              onChange={(e) => handleSelectChange(e)}
            >
              <Select.Option value="beta">Beta</Select.Option>
              <Select.Option value="staging">Staging</Select.Option>
            </Select>
          </div>

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

export default DBRootFormEdit;
