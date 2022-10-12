import Layout from "./Layout";
import {Routes, Route} from "react-router-dom";
import HomeView from "./Views/HomeView";
import InfoAdviceView from "./Views/InfoAdviceView";
import MainFeelingComp from "./Components/InfoAdviceComps/MainFeelingComp";
import useProvideData from "./hooks/useProvideData";
import {useEffect, useState} from "react";
import SomeFeelingComp from "./Components/InfoAdviceComps/SomeFeelingComp";


const App = () => {
  const [paths, setPaths] = useState<null | string[][]>(null);
  const {categoryObjects} = useProvideData();

  useEffect(() => {
    if (categoryObjects) {
      const arr: string[][] = [];
      const pathBuilder = () => {
        for (let i = 0; i < categoryObjects.length; i++) {
          let subArr = categoryObjects[i].articles.map(a => `/info-advice/${categoryObjects[i]?.url}/${a.slug.current}`
          );
          arr.push(subArr)
        }
        setPaths(arr);
      }
      pathBuilder();
    }

  }, [categoryObjects])

  console.log(paths)
  return (
    <>
      <Layout>
        <Routes>
          <Route path={"/"} element={<HomeView/>}></Route>
          <Route path={"info-advice"} element={<InfoAdviceView/>}></Route>

          {categoryObjects && categoryObjects.map(c => <Route key={c.title} element={<MainFeelingComp/>}
                                                              path={`info-advice/${c.url}`}>
          </Route>)}

          {paths && paths.length>0 && paths.map(
            p=> p.map(sp=><Route path={sp} element={<SomeFeelingComp />} />)
          )}

          <Route path={"tips"} element={<div>Tips</div>}>
          </Route>
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
