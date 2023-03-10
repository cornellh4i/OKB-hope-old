import React from "react";
import BoringRoundedButton from "../Buttons/BoringRoundedButton";
import { useNavigate } from "react-router-dom";
import './preventSelect.css';
type Props = {
  title: string;
  buttonText: string;
  url: string | undefined;
};
const GradientCommunicationSection: React.FC<Props> = ({
  title,
  buttonText,
  url,
}) => {
  // const linkClasses = `text-white no-underline hover:bg-white hover:text-blue focus:border-[#5DADEC] focus:border`
  const linkStyles = {
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "white",
    textDecoration: "none",
  };

  const navigate = useNavigate();
  return (
    <div
      className={`bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] w-full pb-[25px] pt-[15px]`}
    >
      <h2 className={"text-center w-2/3 mx-auto"}>{title}</h2>
      <div className={"w-full flex justify-center mt-[15px]"}>
        <BoringRoundedButton
          onClick={() => {
            if (url) {
              navigate(url);
            } else return null;
          }}
        >
          {url ? (
            <span className={"text-base"} style={linkStyles}>
              {buttonText}
            </span>
          ) : (
            <div className="prevent-select">
            <a
              className={"text-base"}
              style={linkStyles}
              href={"mailto:wohohiame@okbfoundation.org"}
            >
              {buttonText}
            </a>
            </div>
          )}
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GradientCommunicationSection;
