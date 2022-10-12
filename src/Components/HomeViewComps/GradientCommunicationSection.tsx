import React from 'react';
import BoringRoundedButton from "../Buttons/BoringRoundedButton";
import {useNavigate} from "react-router-dom";

type Props = {
  title: string
  buttonText: string
  url: string
}
const GradientCommunicationSection:React.FC<Props> = ({title, buttonText, url}) => {
  const navigate= useNavigate()
  return (
    <div className={`py-4 px-3 lg:py-10 bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9]`}>
      <h3 className={"text-center text-2xl md:text-5xl font-bold text-blue"}>
        {title}
      </h3>
      <div className={'w-full flex justify-center mt-6 lg:mt-12'}>
        <BoringRoundedButton onClick={()=>{navigate(url)}}>
          {buttonText}
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GradientCommunicationSection;
