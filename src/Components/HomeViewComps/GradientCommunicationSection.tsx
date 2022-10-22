import React from 'react';
import BoringRoundedButton from "../Buttons/BoringRoundedButton";

type Props = {
  title: string
  buttonText: string
  url: string
}
const GradientCommunicationSection: React.FC<Props> = ({title, buttonText}) => {
  const linkClasses = `text-white no-underline hover:bg-white hover:text-blue focus:border-[#5DADEC] focus:border`
  const linkStyles = {fontFamily: 'Roboto', fontWeight: '400'}

  return (
    <div className={`py-4 px-3 lg:py-10 bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9]`}>
      <h3 className={"text-center text-2xl md:text-4xl font-bold text-blue"}>
        {title}
      </h3>
      <div className={'w-full flex justify-center mt-6 lg:mt-12'}>
        <BoringRoundedButton onClick={() => {
          
        }}>
          <a href="mailto:wohohiame@okbfoundation.org" className={linkClasses} style={linkStyles}>{buttonText}</a>
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GradientCommunicationSection;
