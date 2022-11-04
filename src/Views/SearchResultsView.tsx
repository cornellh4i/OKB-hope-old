import React, {useContext, useEffect, useState} from 'react';
import {ShowSearchCtx} from "../ctx/showSearchCtx";
import sanityClient from "../client";
import {Article} from "./MainHubView";
import OneSearchResult from "../Components/SearchResultsComps/OneSearchResult";


const SearchResultsView = () => {
  const {searchPhrase} = useContext(ShowSearchCtx);
  const [error, setError] = useState<null | string>(null);
  // const [tipRefList, setTipRefList] = useState<null | string[]>(null);
  // const [reflist, setReflist] = useState<null | string[]>(null);
  const [tipArticleTitles, setTipArticleTitles] = useState<null | Article[]>(null);
  const [articleTitles, setArticleTitles] = useState<null | Article[]>(null);
  // console.log('tipArticleResults', tipArticleResults)
  // console.log('articleResults',articleResults)
  if (articleTitles) {
    console.log('articleTitles', articleTitles)

  }
  if (tipArticleTitles) {
    console.log('tipArticleTitles', tipArticleTitles)

  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (searchPhrase) {
      sanityClient
        .fetch(
          `*[_type == 'paragraph' 
            && body[].children[].text match "${searchPhrase}"][0..5] {tipArticle[]->, article[]->}`
        )
        .then((data) => {
          // console.log(data)
          const titles: string[] = []
          const arts: Article[] = []
          const tipArts: Article[] = []

          for (let i = 0; i < data.length; i++) {
            if (data[i].article && data[i].article.length !== 0) {
              if (!titles.includes(data[i].article[0].title)) {
                arts.push(data[i].article[0])
                titles.push(data[i].article[0].title)
              }
            } else if (data[i].tipArticle && data[i].tipArticle.length !== 0) {
              if (!titles.includes(data[i].tipArticle[0].title)) {
                tipArts.push(data[i].tipArticle[0])
                titles.push(data[i].tipArticle[0].title)

              }
            }
          }

          setArticleTitles(arts)
          setTipArticleTitles(tipArts)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });

    }
  }, [searchPhrase])


  console.log(searchPhrase)
  return (
    <div className={'lg:max-w-screen-xl mx-auto p-3'}>

      <div className={'my-3 text-2xl'}>
        <h1>Search results</h1>

      </div>
      <div>
        <span>
          {searchPhrase && `Results for ${searchPhrase}`}
        </span>
      </div>
      <div>{error && <div>{error}</div>}</div>
      <div className={'text-black'}>
        <div>{
          tipArticleTitles && tipArticleTitles.map((a, idx) => <div
            className={'my-3 w-full'}
            key={idx}>
            <OneSearchResult article={a} url={`/tips`}/>
            <hr className={'mt-3'}/>
          </div>)
        }</div>
        <div>{
          articleTitles && articleTitles.map((a, idx) => <div
            className={'my-3 w-full'}
            key={idx}>
            <OneSearchResult article={a} url={`/info-advice`}/>
            <hr className={'mt-3'}/>
          </div>)
        }</div>
      </div>
    </div>
  );
};

export default SearchResultsView;
