import { Card, Col, Row, Select, Input } from "antd";
import React, { Component } from "react";

class SelectDatabase extends Component {
  render() {
    const { projects, db_root_id, search, handleSelectChange } = this.props;

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
              <div style={{ marginBottom: "8px" }}>Tìm kiếm:</div>
              <Input
                placeholder="Nhập từ khóa tìm kiếm"
                style={{ width: "100%" }}
                onChange={(e) => handleSelectChange(e.target.value, "search")}
                value={search || ""}
              />
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default SelectDatabase;
