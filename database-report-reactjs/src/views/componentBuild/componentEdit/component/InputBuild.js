import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Card, Col } from "antd";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import BuildStatusEnum from "./../../../../utils/Enum/BuildStatusEnum";

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

    const convertCKEditorToWord = (content) => {
      const parser = new window.DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const children = [];

      const processNode = (node, level = 0) => {
        if (node.nodeType === 1) {
          const style = node.getAttribute("style") || "";
          const alignment = style.includes("text-align:center")
            ? "center"
            : style.includes("text-align:right")
            ? "right"
            : "left";

          switch (node.tagName.toLowerCase()) {
            case "h2":
            case "h3":
              children.push(
                new Paragraph({
                  children: Array.from(node.childNodes).map((child) => {
                    if (child.nodeType === 3)
                      return new TextRun({ text: child.textContent });
                    if (child.tagName.toLowerCase() === "strong")
                      return new TextRun({
                        text: child.textContent,
                        bold: true,
                      });
                    return new TextRun({ text: child.textContent });
                  }),
                  heading:
                    node.tagName.toLowerCase() === "h2"
                      ? HeadingLevel.HEADING_2
                      : HeadingLevel.HEADING_3,
                  alignment: alignment,
                  spacing: { before: 240, after: 120 },
                })
              );
              break;

            case "p":
              if (node.textContent.trim()) {
                children.push(
                  new Paragraph({
                    children: Array.from(node.childNodes).map((child) => {
                      if (child.nodeType === 3)
                        return new TextRun({ text: child.textContent });
                      if (child.tagName?.toLowerCase() === "strong")
                        return new TextRun({
                          text: child.textContent,
                          bold: true,
                        });
                      if (child.tagName?.toLowerCase() === "em")
                        return new TextRun({
                          text: child.textContent,
                          italic: true,
                        });
                      if (child.tagName?.toLowerCase() === "u")
                        return new TextRun({
                          text: child.textContent,
                          underline: true,
                        });
                      if (child.tagName?.toLowerCase() === "a")
                        return new TextRun({
                          text: child.textContent,
                          style: "Hyperlink",
                          color: "0000FF",
                          underline: true,
                          link: {
                            type: "external",
                            target: child.getAttribute("href"),
                          },
                        });
                      return new TextRun({ text: child.textContent });
                    }),
                    alignment: alignment,
                    spacing: { before: 120, after: 120 },
                  })
                );
              }
              break;

            case "ul":
            case "ol":
              node.childNodes.forEach((li, index) => {
                if (li.tagName?.toLowerCase() === "li") {
                  li.childNodes.forEach((child) => {
                    if (child.nodeType === 1) {
                      if (
                        child.tagName.toLowerCase() ===
                        node.tagName.toLowerCase()
                      ) {
                        processNode(child, level + 1);
                      } else {
                        children.push(
                          new Paragraph({
                            children: Array.from(child.childNodes).map(
                              (innerChild) => {
                                if (innerChild.nodeType === 3)
                                  return new TextRun({
                                    text: innerChild.textContent,
                                  });
                                if (
                                  innerChild.tagName?.toLowerCase() === "strong"
                                )
                                  return new TextRun({
                                    text: innerChild.textContent,
                                    bold: true,
                                  });
                                return new TextRun({
                                  text: innerChild.textContent,
                                });
                              }
                            ),
                            ...(node.tagName.toLowerCase() === "ol"
                              ? {
                                  numbering: {
                                    reference: "mainNumbering",
                                    level: level,
                                    instance: index,
                                  },
                                }
                              : {
                                  bullet: { level: level },
                                }),
                            spacing: { before: 120, after: 120 },
                          })
                        );
                      }
                    }
                  });
                }
              });
              break;
          }
        }
      };

      doc.body.childNodes.forEach((node) => processNode(node));

      return new Document({
        numbering: {
          config: [
            {
              reference: "mainNumbering",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: "start",
                  style: {
                    paragraph: { indent: { left: 720, hanging: 260 } },
                  },
                },
                {
                  level: 1,
                  format: "decimal",
                  text: "%1.%2.",
                  alignment: "start",
                  style: {
                    paragraph: { indent: { left: 1440, hanging: 260 } },
                  },
                },
              ],
            },
          ],
        },
        sections: [{ children }],
      });
    };

    return (
      <>
        <Col span={16}>
          <Card
            title="Nhập dữ liệu"
            extra={
              <div>
                <Button
                  onClick={() => {
                    const wordDoc = convertCKEditorToWord(build_item.content);
                    Packer.toBlob(wordDoc).then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const link = window.document.createElement("a");
                      link.href = url;
                      link.download = `build_content_${
                        new Date().toISOString().split("T")[0]
                      }.docx`;
                      link.click();
                      window.URL.revokeObjectURL(url);
                    });
                  }}
                  type="default"
                >
                  Xuất Word
                </Button>

                <Button
                  disabled={build_item.status === BuildStatusEnum.REJECT}
                  type="primary"
                  onClick={handleSave}
                >
                  Cập nhật
                </Button>
              </div>
            }
          >
            <div ref={editorToolbarRef}></div>
            <div
              style={{
                height: "calc(100vh - 200px)",
                overflowY: "auto",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
              }}
            >
              {isMounted && (
                <>
                  <CKEditor
                    editor={DecoupledEditor}
                    data={build_item.content}
                    config={{
                      licenseKey: "GPL",
                      height: "450px",
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
