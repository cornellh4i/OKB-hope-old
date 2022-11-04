import React from 'react';

type Props = any
const CustomHeadingComp: React.FC<Props> = (props) => {
  return (
    <div>
      <h3 style={{

        fontFamily: ` "Futura PT Cond", Futura, Muli, sans-serif`
      }}
          className={'text-blue'}>
        {props.children}
      </h3>
    </div>
  );
};

export default CustomHeadingComp;
