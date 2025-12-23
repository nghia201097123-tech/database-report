import { Button, Input, Select } from "antd";
import React, { Component } from "react";

class DatabaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  validateForm = () => {
    const newErrors = {};
    const {
      input_project_id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type,
    } = this.props;

    if (input_project_id === 0 || input_project_id === "") {
      newErrors.project = "Vui lòng chọn project";
    }
    if (!input_database_name) {
      newErrors.database_name = "Vui lòng nhập tên database";
    }
    if (!input_host) {
      newErrors.host = "Vui lòng nhập host";
    }
    if (input_port === 0 || input_port === "") {
      newErrors.port = "Vui lòng nhập port";
    }
    if (!input_user) {
      newErrors.user = "Vui lòng nhập username";
    }
    if (!input_password) {
      newErrors.password = "Vui lòng nhập password";
    }
    if (!input_db_type) {
      newErrors.db_type = "Vui lòng chọn loại database";
    }

    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  handleInputValidation = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      let validatedValue = value;

      if (name === "input_port") {
        validatedValue = Math.max(0, parseInt(value) || 0);
      }

      this.props.handleInputChange({ target: { name, value: validatedValue } });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.handleCreateDatabase(e);
    }
  };

  render() {
    const { errors } = this.state;
    const {
      projects,
      input_project_id,
      input_database_name,
      input_host,
      input_port,
      input_user,
      input_password,
      input_db_type,
      handleSelectChange,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={this.handleSubmit}>
          <h3>{"Tạo Database"}</h3>

          {errors.project && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.project}
            </div>
          )}

          <Select
            placeholder="Chọn project"
            style={{ width: "100%", marginBottom: "10px" }}
            value={input_project_id}
            onChange={(value) => handleSelectChange(value, "input_project_id")}
            defaultValue={projects[0]?.id}
            status={errors.project ? "error" : ""}
          >
            {projects.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
                <small style={{ color: "#888" }}>({project.env})</small>
              </Select.Option>
            ))}
          </Select>

          {errors.database_name && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.database_name}
            </div>
          )}

          <Input
            name="input_database_name"
            placeholder="Nhập tên database"
            value={input_database_name}
            onChange={this.handleInputValidation}
            style={{ marginBottom: "10px" }}
            status={errors.database_name ? "error" : ""}
          />

          {errors.host && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.host}
            </div>
          )}
          <Input
            name="input_host"
            placeholder="Nhập host"
            value={input_host}
            onChange={this.handleInputValidation}
            style={{ marginBottom: "10px" }}
            status={errors.host ? "error" : ""}
          />

          {errors.port && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.port}
            </div>
          )}
          <Input
            name="input_port"
            type="number"
            placeholder="Nhập port"
            value={input_port}
            onChange={this.handleInputValidation}
            style={{ marginBottom: "10px" }}
            status={errors.port ? "error" : ""}
          />

          {errors.user && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.user}
            </div>
          )}
          <Input
            name="input_user"
            placeholder="Nhập username"
            value={input_user}
            onChange={this.handleInputValidation}
            style={{ marginBottom: "10px" }}
            status={errors.user ? "error" : ""}
          />

          {errors.password && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.password}
            </div>
          )}
          <Input.Password
            name="input_password"
            placeholder="Nhập password"
            value={input_password}
            onChange={this.handleInputValidation}
            style={{ marginBottom: "10px" }}
            status={errors.password ? "error" : ""}
          />

          {errors.db_type && (
            <div style={{ color: "red", marginBottom: "5px" }}>
              {errors.db_type}
            </div>
          )}
          <Select
            placeholder="Chọn loại database"
            style={{ width: "100%", marginBottom: "10px" }}
            value={input_db_type}
            onChange={(value) => handleSelectChange(value, "input_db_type")}
            status={errors.db_type ? "error" : ""}
          >
            <Select.Option value="singlestore">Singstore</Select.Option>
            <Select.Option value="mariadb">Mariadb</Select.Option>
          </Select>

          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Tạo mới
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default DatabaseForm;
