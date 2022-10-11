import Layout from "./Layout";
import {Routes, Route} from "react-router-dom";
import HomeView from "./Views/HomeView";
import InfoAdviceView from "./Views/InfoAdviceView";
import MainFeelingComp from "./Components/InfoAdviceComps/MainFeelingComp";
import useProvideData from "./hooks/useProvideData";


const App = () => {
  const {categories} = useProvideData();

  return (
    <>
      <Layout>
        <Routes>
          <Route path={"/"} element={<HomeView/>}></Route>
          <Route path={"info-advice"} element={<InfoAdviceView/>}></Route>

          {categories && categories.length > 0 && categories.map((c, idx) => {
            return <Route key={idx} path={`info-advice/${c.slug.current}`} element={<MainFeelingComp/>}></Route>

          })}

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
