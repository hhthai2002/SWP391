import React from "react";

const Button = (props) => {
  const buttonStyle = {
    color: props?.type === "hover" ? "#fff" : "#000", // Màu chữ
    backgroundColor: props?.type === "hover" ? "#0000FF" : "#fff", // Màu nền
    border: props?.type === "hover" ? "1px solid #0000FF" : "1px solid #1890ff", // Viền xanh
  };

  return (
    <button {...props} style={buttonStyle}>
      {props?.children}
    </button>
  );
};

export default Button;
