import React from 'react';
import Layout from "./Layout";
import {Routes, Route} from "react-router-dom";
import HomeView from "./Views/HomeView";


const App = () => {
  return (
    <>
      <Layout>
     <Routes>
       <Route path={"/"} element={<HomeView />}></Route>
       <Route path={"/info-advice"} element={<div>Info-Advice</div>}></Route>
       <Route path={"/tips"} element={<div>Tips</div>}></Route>

     </Routes>
      </Layout>

    </>
  );
};

export default App;
