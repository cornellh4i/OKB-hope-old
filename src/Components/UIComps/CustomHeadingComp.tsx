import React from 'react';

type Props = any
const CustomHeadingComp: React.FC<Props> = (props) => {
  return (
    <div>
      <h4 style={{
        marginTop: '.5rem', fontWeight: '500',
        fontFamily: ` "Futura PT Cond", Futura, Muli, sans-serif`
      }}
          className={'text-blue'}>
        {props.children}
      </h4>
    </div>
  );
};

export default CustomHeadingComp;
