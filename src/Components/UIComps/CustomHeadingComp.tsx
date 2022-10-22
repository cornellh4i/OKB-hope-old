import React from 'react';

type Props = any

const CustomHeadingComp: React.FC<Props> = (props) => {
  return (
    <p style={{marginTop: '.5rem', fontWeight:'500', fontFamily:'Futura, Muli'}} className={'text-blue'}>
      {props.children}
    </p>
  );
};

export default CustomHeadingComp;
