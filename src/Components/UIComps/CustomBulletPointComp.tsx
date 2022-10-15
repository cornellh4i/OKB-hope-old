import React, {ReactNode} from 'react';
type Props={
  children:ReactNode
}
const CustomBulletPointComp:React.FC<Props> = ({children}) => {
  console.log('runs')
  return (
    <li style={{color:'red'}} className={''}>
      {children}
    </li>
  );
};

export default CustomBulletPointComp;
