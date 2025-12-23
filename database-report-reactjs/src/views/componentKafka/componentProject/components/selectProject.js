import { Card, Col, Input, Row } from "antd";
import React, { Component } from "react";

class SelectProject extends Component {
  render() {
    const { search, handleSelectChange } = this.props;

    return (
      <>
        <Card className="card-filter" style={{ marginBottom: "16px" }}>
          <Row gutter={[16, 16]}>
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

export default SelectProject;
