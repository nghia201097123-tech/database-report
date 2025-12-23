import { Button, Input, Select } from "antd";
import { Formik } from "formik";
import React, { Component } from "react";
import { DBRootFormValidator } from "../validator/DBRootFormValidator";

class DBRootForm extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      input_name: "",
      input_env: "beta",
    };
  }

  handleSubmit = (values) => {
    this.props.handleCreateDBRoot(values.input_name, values.input_env);
  };

  render() {
    return (
      <div className="project-form">
        <Formik
          initialValues={this.initialValues}
          validationSchema={DBRootFormValidator}
          onSubmit={this.handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <h3>{"Tạo Dự Án Mới"}</h3>

              <div className="form-group">
                <label
                  htmlFor="input_name"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Tên dự án
                </label>
                {formik.touched.input_name && formik.errors.input_name && (
                  <div
                    className="error-message"
                    style={{ color: "red", marginBottom: "10px" }}
                  >
                    {formik.errors.input_name}
                  </div>
                )}
                <Input
                  id="input_name"
                  name="input_name"
                  placeholder="Type your name here"
                  value={formik.values.input_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.input_name && formik.errors.input_name
                      ? "error"
                      : ""
                  }
                  style={{ marginBottom: "10px" }}
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
                  id="input_env"
                  name="input_env"
                  placeholder="Chọn môi trường"
                  style={{ width: "100%", marginBottom: "10px" }}
                  value={formik.values.input_env}
                  onChange={(value) => formik.setFieldValue("input_env", value)}
                  onBlur={formik.handleBlur}
                  status={
                    formik.touched.input_env && formik.errors.input_env
                      ? "error"
                      : ""
                  }
                >
                  <Select.Option value="beta">Beta</Select.Option>
                  <Select.Option value="staging">Staging</Select.Option>
                </Select>
                {formik.touched.input_env && formik.errors.input_env && (
                  <div
                    className="error-message"
                    style={{ color: "red", marginBottom: "10px" }}
                  >
                    {formik.errors.input_env}
                  </div>
                )}
              </div>

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
          )}
        </Formik>
      </div>
    );
  }
}

export default DBRootForm;
