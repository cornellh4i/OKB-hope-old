import Layout from "./Layout";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import HomeView from "./Views/HomeView";
import NotFoundError from "./NotFoundError";
import MainHubView from "./Views/MainHubView";
import MainIssueView from "./Views/MainIssueView";
import SpecificIssueView from "./Views/SpecificIssueView";
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
      <MainHubView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'tips',
    element: <Layout>
      <MainHubView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'about-us',
    element: <Layout>
      <SpecificIssueView/>
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
    path: 'tips/:tipCategory',
    element: <Layout>
      <MainIssueView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'info-advice/:feeling',
    element: <Layout>
      <MainIssueView/>
    </Layout>,
    errorElement: <NotFoundError/>,

  },
  {
    path: 'info-advice/:feeling/:problem',
    element: <Layout>
      <SpecificIssueView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  },
  {
    path: 'tips/:tipCategory/:tip',
    element: <Layout>
      <SpecificIssueView/>
    </Layout>,
    errorElement: <NotFoundError/>,
  }
])


const App = () => {


  return (
    <>

      <RouterProvider router={router}/>

    </>
  )
};

export default App;
