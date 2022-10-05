import React from 'react';
import {router} from './createRoutes'
import {
  RouterProvider,
  Route,
} from "react-router-dom";
import Topbar from "./Components/LayoutComps/Topbar";

type Props={
  children?: React.ReactNode
}
const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
      <section className={"pt-2"}>
        <Topbar/>
      </section>

      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  );
};

export default Layout

