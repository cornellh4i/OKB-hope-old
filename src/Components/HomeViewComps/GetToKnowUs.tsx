import React from 'react';
import BoringRoundedButton from "../Buttons/BoringRoundedButton";

const GetToKnowUs = () => {
  return (
    <div className={`my-6 lg:my-12 py-4 bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9]`}>
      <h3 className={"text-center text-2xl md:text-5xl font-bold text-blue"}>
        Get to know us!
      </h3>
      <div className={'w-full flex justify-center mt-6'}>
        <BoringRoundedButton>
          Learn more about us!
        </BoringRoundedButton>
      </div>
    </div>
  );
};

export default GetToKnowUs;
