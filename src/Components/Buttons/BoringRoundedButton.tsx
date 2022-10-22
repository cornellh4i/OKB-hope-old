import React, {useState} from 'react';

type Props = {
  children: React.ReactNode
  onClick?: () => void
}

const BoringRoundedButton: React.FC<Props> = ({children, onClick}) => {
  const [active, setActive] = useState<string>('drop-shadow-lg');
  const clickHandler = () => {
    setActive('')
    if (onClick) {
      onClick()
    }
  }
  return (
    <button onClick={clickHandler}
            className={`bg-blue rounded-full py-2 ${active} hover:drop-shadow-xl transition
             px-6 text-lg lg:text-xl text-white`} >
      {children}
    </button>
  );
};

export default BoringRoundedButton;
