import {useEffect, useState} from "react";
import sanityClient from "../client.js";

type Herocontent={
  title:string
}
const HomeView = () => {
  const [heroContent, setHeroContent] = useState<null|Herocontent>(null);
  useEffect(()=>{
    if (!heroContent) {
      sanityClient
        .fetch(
          `*[_type == "hero_content"]`
        )
        .then((data) => setHeroContent(data))
        .catch(console.error);


    }
  },[heroContent])

  console.log(heroContent)
  return (
    <div>
      {heroContent &&       <h2>{heroContent.title}</h2>
      }
    </div>
  );
};

export default HomeView;
