import React, { useMemo, useState } from 'react';
import { Feeling } from "../../Views/HomeView";
import FeelingButton from "../Buttons/FeelingButton";
import FeelingInfoHint from "./FeelingInfoHint";
import LinkTo from "./LinkTo";

type Props = {
  feelings: Feeling[]
}

const FeelingComp: React.FC<Props> = ({ feelings }) => {
  const [tag, setTag] = useState<string | null>('');

  const buttonFeelings = useMemo(() => {
    if (feelings) {
      return feelings.map(f => {
        return {
          icon: f.icon, text: f.tag
        }
      })
    } else {
      return null
    }
  }, [feelings]);

  const chosenFeeling = useMemo(() => {
    if (tag) {
      return feelings.find((o) => {
        return o.tag === tag
      })
    } else return null
  }, [feelings, tag]);

  const buttonClickHandler = (s: string) => {
    if (s !== tag) {
      setTag(s);
    } else {
      setTag('')
    }
  }

  return (
    <div className={" "}>
      <div className={'flex flex-col w-full'}>
        <h2 className={`text-center 
        mt-[15px] md:mt-[30px]
         font-bold text-blue`}>Hey, how are you doing?</h2>
        <p className={"text-center md:hidden"}>
          We may have some useful tips for you.
          Just tell us how you are feeling, and we will try to help you :-)
        </p>
      </div>


      <div className={`
      md:flex lg:justify-center mt-[15px] md:mt-[30px] md:w-10/12 md:mx-auto
      `}>
        <div className={'flex flex-wrap justify-center items-start h-fit gap-[15px]'}>

          {buttonFeelings && buttonFeelings.map(f => <FeelingButton onClick={buttonClickHandler}
            key={f.text}
            activeFeeling={chosenFeeling ? chosenFeeling.tag : null}
            feelingButton={f} />)}
        </div>

        <div className={" w-full "}>
          {chosenFeeling ? <FeelingInfoHint feeling={chosenFeeling} /> : <p className={"hidden md:block "}>
            We may have some useful tips for you.
            Just tell us how you are feeling, and we will try to help you :-)
          </p>}
        </div>

      </div>

      <div className={'md:w-10/12 md:mx-auto md:pl-10 mt-[15px] mb-[20px]'}>
        <LinkTo url={'/info-advice'}>
          Browse specific topics
        </LinkTo>
      </div>

    </div>
  );
};

export default FeelingComp;
