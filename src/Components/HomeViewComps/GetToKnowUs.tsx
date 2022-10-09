import React from 'react';
import BoringRoundedButton from "../Buttons/BoringRoundedButton";

const GetToKnowUs = () => {
  return (
    <div className={`py-4 lg:py-10 bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9]`}>
      <h3 className={"text-center text-2xl md:text-5xl font-bold text-blue"}>
        Get to know us!
      </h3>
      <div className={'w-full flex justify-center mt-6 lg:mt-12'}>
        <BoringRoundedButton onClick={()=>{}}>
          Learn more about us!
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GetToKnowUs;
