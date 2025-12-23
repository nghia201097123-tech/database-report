import { Card, Col, Row, Select } from "antd";
import React, { Component } from "react";

class SelectStoreFunc extends Component {
  render() {
    const { projects, databases, db_root_id, db_name_id, handleSelectChange } =
      this.props;

    return (
      <>
        <Card className="card-filter" style={{ marginBottom: "16px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div style={{ marginBottom: "8px" }}>Dự án:</div>
              <Select
                placeholder="Chọn Dự án"
                style={{ width: "100%" }}
                onChange={(value) => handleSelectChange(value, "db_root_id")}
                value={db_root_id || undefined}
              >
                <Select.Option key="all" value={0}>
                  ALL
                </Select.Option>
                {projects?.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                    <small style={{ color: "#888" }}>({project.env})</small>
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div style={{ marginBottom: "8px" }}>Database:</div>
              <Select
                placeholder="Chọn Database"
                style={{ width: "100%" }}
                onChange={(value) => handleSelectChange(value, "db_name_id")}
                value={db_name_id || undefined}
              >
                <Select.Option key="all" value={0}>
                  ALL
                </Select.Option>
                {databases
                  ?.filter(
                    (x) => parseInt(x.db_root_id) === parseInt(db_root_id)
                  )
                  .map((database) => (
                    <Select.Option key={database.id} value={database.id}>
                      {database.database}
                      <small style={{ color: "#888" }}>
                        {" "}
                        ({database.host})
                      </small>
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectStoreFunc;
