import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Card, Col } from "antd";
import {
  Alignment,
  BlockQuote,
  Bold,
  Code,
  DecoupledEditor,
  Essentials,
  FindAndReplace,
  Heading,
  Indent,
  Italic,
  Link,
  List,
  MediaEmbed,
  PageBreak,
  Paragraph,
  SourceEditing,
  SpecialCharacters,
  Table,
  Widget,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import React from "react";

class InputBuild extends React.Component {
  render() {
    const { editorToolbarRef, isMounted, handleEditorChange, handleSave } =
      this.props;
    return (
      <>
        <Col span={16}>
          <Card
            title="Nhập dữ liệu"
            extra={
              <div>
                <Button type="primary" onClick={handleSave}>
                  Tạo bản build
                </Button>
              </div>
            }
          >
            <div ref={editorToolbarRef}></div>
            <div
              style={{
                height: "calc(100vh - 200px)",
                overflowY: "auto", // Thêm thanh cuộn dọc
                border: "1px solid #d9d9d9", // Thêm viền để dễ nhận biết
                borderRadius: "4px",
              }}
            >
              {isMounted && (
                <>
                  <CKEditor
                    editor={DecoupledEditor}
                    data="<h2><strong>BẢN BUILD NGÀY 7/12/2024</strong></h2><ol><li><h3><strong>Nội dung bản build</strong></h3><p>- Bản build này để fix các lỗi cũng như các service ABC</p><p>-&nbsp;</p></li><li><h3><strong>Các script bản build</strong></h3><ol><li><p>Link script:</p><p>-&nbsp;</p><p>-&nbsp;</p><p>-&nbsp;</p></li><li><p>Link KAfka</p><p>-</p><p>-</p><p>-</p></li><li><p>Link gRPC</p><p>-&nbsp;</p><p>-&nbsp;</p><p>-&nbsp;</p></li></ol></li><li><h3><strong>Ghi chú bản build</strong></h3><p>- Ghi chú ABC</p><p>-&nbsp;</p><p>-&nbsp;</p></li></ol><p>&nbsp;</p>"
                    config={{
                      licenseKey: "GPL", // Or 'GPL'.
                      height: "450px", // Giảm chiều cao để phù hợp với container
                      plugins: [
                        Bold,
                        Italic,
                        Paragraph,
                        Essentials,
                        Heading,
                        BlockQuote,
                        List,
                        Table,
                        Link,
                        Indent,
                        Alignment,
                        SpecialCharacters,
                        Code,
                        SourceEditing,
                        FindAndReplace,
                        MediaEmbed,
                        Widget,
                        PageBreak,
                      ],
                      toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "|",
                        "heading",
                        "paragraph",
                        "blockQuote",
                        "insertTable",
                        "|",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "indent",
                        "outdent",
                        "alignment",
                        "insertHorizontalRule",
                        "specialCharacters",
                        "|",
                        "code",
                        "sourceEditing",
                        "findAndReplace",
                        "mediaEmbed",
                        "widget",
                        "pageBreak",
                      ],
                    }}
                    onReady={(editor) => {
                      if (editorToolbarRef?.current) {
                        editorToolbarRef?.current.appendChild(
                          editor.ui.view.toolbar.element
                        );
                      }
                    }}
                    onChange={handleEditorChange}
                    onAfterDestroy={(editor) => {
                      if (editorToolbarRef?.current) {
                        Array.from(editorToolbarRef?.current.children).forEach(
                          (child) => child.remove()
                        );
                      }
                    }}
                  />
                </>
              )}
            </div>
          </Card>
        </Col>
      </>
    );
  }
}

export default InputBuild;
