import React, {useMemo, useState} from 'react';
import {Feeling} from "../../Views/HomeView";
import FeelingButton from "../Buttons/FeelingButton";
import FeelingInfoHint from "./FeelingInfoHint";
import LinkTo from "./LinkTo";

type Props = {
  feelings: Feeling[]
}

const FeelingComp: React.FC<Props> = ({feelings}) => {
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
    <div className={" py-2 px-4"}>
      <div className={'flex flex-col w-full'}>
        <h3 className={"text-center text-2xl md:text-5xl font-bold text-blue"}>How are you doing?</h3>
        <p className={"text-center text-base my-2"}>
          We may have some useful tips for you! Simply tell us how you are feeling.
        </p>
      </div>


      <div className={'lg:flex lg:justify-center lg:gap-4 my-3 lg:my-6'}>
        <div className={'flex flex-wrap justify-center items-start md:w-2/3 mx-auto h-fit gap-2'}>

          {buttonFeelings && buttonFeelings.map(f => <FeelingButton onClick={buttonClickHandler}
                                                                    key={f.text}
                                                                    activeFeeling={chosenFeeling ? chosenFeeling.tag : null}
                                                                    feelingButton={f}/>)}
        </div>

        <div className={" w-full mt-6"}>
          {chosenFeeling && <FeelingInfoHint feeling={chosenFeeling}/>}
        </div>

      </div>

      <div className={'my-3'}>
        <LinkTo url={'/info-advice'}>
          Browse specific topics
        </LinkTo>
      </div>

    </div>
  );
};

export default FeelingComp;
