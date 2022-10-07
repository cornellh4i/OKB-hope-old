import React, {useMemo, useState} from 'react';
import {Feeling} from "../../Views/HomeView";
import FeelingButton from "../Buttons/FeelingButton";
import FeelingInfoHint from "./FeelingInfoHint";

type Props = {
  feelings: Feeling[]
}

const FeelingComp: React.FC<Props> = ({feelings}) => {
  const [tag, setTag] = useState<string | null>(null);
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
    setTag(s);
  }
  console.log(buttonFeelings)
  return (
    <>
      <div className={'flex flex-col w-full py-2 px-4'}>
        <h3 className={"text-center text-2xl md:text-5xl font-bold text-blue"}>How are you doing?</h3>
        <p className={"text-center text-base my-2"}>
          We may have some useful tips for you! Simply tell us how you are feeling.
        </p>
      </div>
      <div className={'flex justify-center  w-full gap-2 py-2 px-4'}>

        {buttonFeelings && buttonFeelings.map(f => <FeelingButton onClick={buttonClickHandler}
                                                                  key={f.text}
                                                                  feelingButton={f}/>)}

      </div>
      <div className={"py-2 px-4"}>
        {
          chosenFeeling && <FeelingInfoHint feeling={chosenFeeling} />
        }
      </div>
    </>
  );
};

export default FeelingComp;
