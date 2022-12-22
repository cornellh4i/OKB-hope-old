import React from "react";

type Props = any;

const CustomHeadingComp: React.FC<Props> = (props) => {
  return (
    <p
      style={{
        marginTop: "15px",
        fontWeight: "500",
        marginBottom: "-7px",
      }}
      className={"text-blue"}
    >
      {props.children}
    </p>
  );
};

export default CustomHeadingComp;
