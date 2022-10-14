import React from 'react';
import {useRouteError} from "react-router-dom";

const NotFoundError = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      Page Not Found
    </div>
  );
};

export default NotFoundError;
