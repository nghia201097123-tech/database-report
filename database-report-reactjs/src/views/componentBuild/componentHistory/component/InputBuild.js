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
    const {
      editorToolbarRef,
      isMounted,
      handleEditorChange,
      handleSave,
      build_item,
    } = this.props;
    return (
      <>
        <Col span={16}>
          <Card
            title="Nhập dữ liệu"
            extra={
              <div>
                <Button type="primary" onClick={handleSave}>
                  Cập nhật
                </Button>
              </div>
            }
          >
            <div ref={editorToolbarRef}></div>
            <div
              style={{
                height: "500px",
                overflowY: "auto", // Thêm thanh cuộn dọc
                border: "1px solid #d9d9d9", // Thêm viền để dễ nhận biết
                borderRadius: "4px",
              }}
            >
              {isMounted && (
                <>
                  <CKEditor
                    editor={DecoupledEditor}
                    data={build_item.content}
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
