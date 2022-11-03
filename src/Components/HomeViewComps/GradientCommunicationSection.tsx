import React from 'react';
import BoringRoundedButton from "../Buttons/BoringRoundedButton";
import {Link} from "react-router-dom";

type Props = {
  title: string
  buttonText: string
  url: string
}
const GradientCommunicationSection: React.FC<Props> = ({title, buttonText, url}) => {
  const linkClasses = `text-white no-underline hover:bg-white hover:text-blue focus:border-[#5DADEC] focus:border`
  const linkStyles = {fontFamily: 'Roboto', fontWeight: '400'}

  return (
    <div className={`bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] w-full pb-[25px] pt-[15px]`}>
      <h2 className={"text-center w-2/3 mx-auto"}>
        {title}
      </h2>
      <div className={'w-full flex justify-center mt-[15px]'}>

        <BoringRoundedButton onClick={() => {

        }}>
          <Link className={linkClasses} style={linkStyles} to={url}>{buttonText}</Link>
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GradientCommunicationSection;
