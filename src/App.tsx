import Layout from "./Layout";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import HomeView from "./Views/HomeView";
import NotFoundError from "./NotFoundError";
import InfoAdviceView from "./Views/InfoAdviceView";
import MainFeelingView from "./Views/MainFeelingView";
import SomeFeelingView from "./Views/SomeFeelingView";
import TipsView from "./Views/TipsView";
import AboutUs from "./Views/AboutUs";
import ContactUs from "./Views/ContactUs";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout>
      <HomeView/>
    </Layout>,
    errorElement: <NotFoundError/>
  },
  {
    path: 'info-advice',
    element: <Layout>
      <InfoAdviceView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'tips',
    element: <Layout>
      <TipsView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'about-us',
    element: <Layout>
      <AboutUs/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'contact-us',
    element: <Layout>
      <ContactUs/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'info-advice/:feeling',
    element: <Layout>
      <MainFeelingView/>
    </Layout>,
    errorElement: <NotFoundError/>,

  },
  {
    path: 'info-advice/:feeling/:problem',
    element: <Layout>
      <SomeFeelingView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  }
])


const App = () => {


  return (
    <>

      <RouterProvider router={router}/>


      {/*<Routes>*/}
      {/*  <Route path={"/"} element={<HomeView/>}></Route>*/}
      {/*  <Route path={"info-advice"} element={<InfoAdviceView/>}>*/}
      {/*  </Route>*/}
      {/*  <Route path={"info-advice/:feeling"} element={<MainFeelingView/>}/>*/}
      {/*  <Route path={"info-advice/:feeling/:problem"} element={<SomeFeelingView/>}/>*/}


      {/*  <Route path={"/tips"} element={<div>Tips</div>}>*/}
      {/*  </Route>*/}
      {/*  <Route path={"/about-us"} element={<div>About us</div>}></Route>*/}
      {/*  <Route path={"/contact-us"} element={<div>Contact us</div>}></Route>*/}

      {/*  <Route path="*" element={<div>404</div>}>*/}

      {/*  </Route>*/}

      {/*</Routes>*/}


    </>
  )
};

export default App;
