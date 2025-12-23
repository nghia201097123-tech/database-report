import { Button, Card, Col, Input } from "antd";
import { Component } from "react";
import PropTypes from "prop-types";

class GrpcProfileLeft extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id_reset_disabled: PropTypes.bool,
    input_proto_text: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    handleCheck: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <Col span={12}>
          <Card
            title="Nhập dữ liệu"
            extra={
              <div>
                <Button
                  type="primary"
                  onClick={this.props.handleReset}
                  style={{ marginRight: 10 }}
                  disabled={this.props.id_reset_disabled}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  onClick={this.props.handleCheck}
                  disabled={this.props.disabled || this.props.isLoading}
                >
                  Kiểm tra
                </Button>
              </div>
            }
          >
            <Input.TextArea
              disabled={this.props.disabled}
              rows={25}
              value={this.props.input_text}
              onChange={(e) =>
                this.props.handleInputChange(e, "input_proto_text")
              }
              placeholder="Sao chép toàn bộ nội dung file proto vào đây..."
            />
          </Card>
        </Col>
      </>
    );
  }
}

export default GrpcProfileLeft;
