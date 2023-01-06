import React from "react";

type Props = any;

const CustomHeadingComp: React.FC<Props> = (props) => {
  return (
    <h3
      style={{
        marginTop: "15px",
        fontWeight: "500",
        marginBottom: "-7px",
      }}
      className={"text-blue article-subheaders"}
    >
      {props.children}
    </h3>
  );
};

export default CustomHeadingComp;
