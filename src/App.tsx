import React from 'react';
import Layout from "./Layout";
import {Routes, Route} from "react-router-dom";
import HomeView from "./Views/HomeView";
import InfoAdviceView from "./Views/InfoAdviceView";


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={"/"} element={<HomeView/>}></Route>
          <Route path={"info-advice"} element={<InfoAdviceView/>}></Route>

          <Route path={'info-advice/you-and-others'} element={<div>you and others</div>}></Route>
          <Route path={'info-advice/self-identity'} element={<div>Self-identity</div>}></Route>
          <Route path={'info-advice/relationships'} element={<div>Relationships</div>}></Route>
          <Route path={'info-advice/abusive-relationships'} element={<div>Abusive relationships</div>}></Route>

          <Route path={"tips"} element={<div>Tips</div>}></Route>
          <Route path={"about-us"} element={<div>About us</div>}></Route>
          <Route path={"contact-us"} element={<div>Contact us</div>}></Route>
          <Route path={'*'} element={<div>404</div>}>

          </Route>

        </Routes>
      </Layout>

    </>
  );
};

export default App;
