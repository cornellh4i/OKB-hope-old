import React from "react";

type Props = any;

const CustomBulletPointComp: React.FC<Props> = (props) => {
  return (
    <li
      style={{
        listStyleType: "disc",
        margin: ".2rem 1rem",
        fontFamily: "Roboto",
      }}
      className={""}
    >
      {props.children}
    </li>
  );
};

export default CustomBulletPointComp;
