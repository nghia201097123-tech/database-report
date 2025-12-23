import * as Yup from "yup";

export const DBRootFormValidator = Yup.object().shape({
  input_name: Yup.string()
    .required("Vui lòng nhập tên dự án")
    .min(3, "Tên dự án phải có ít nhất 3 ký tự")
    .max(50, "Tên dự án không được vượt quá 50 ký tự")
    .matches(
      /^[a-zA-Z0-9_-]*$/,
      "Tên dự án chỉ được chứa chữ cái, số và dấu gạch ngang"
    ),
  input_env: Yup.string()
    .required("Vui lòng chọn môi trường")
    .oneOf(["beta", "staging"], "Môi trường không hợp lệ"),
});
