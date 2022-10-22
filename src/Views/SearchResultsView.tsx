import React, {useContext, useEffect, useState} from 'react';
import {ShowSearchCtx} from "../ctx/showSearchCtx";
import sanityClient from "../client";
import {Article} from "./MainHubView";
import {Paragraph} from "./SpecificIssueView";


const SearchResultsView = () => {
  const {searchPhrase} = useContext(ShowSearchCtx);
  const [error, setError] = useState<null | string>(null);
  const [tipRefList, setTipRefList] = useState<null | string[]>(null);
  const [reflist, setReflist] = useState<null | string[]>(null);
  const [tipArticleTitles, setTipArticleTitles] = useState<null | Article[]>(null);
  const [articleTitles, setArticleTitles] = useState<null | Article[]>(null);
  // console.log('tipArticleResults', tipArticleResults)
  // console.log('articleResults',articleResults)
  // console.log(articleTitles)
  console.log(tipArticleTitles)

  useEffect(() => {
    if (searchPhrase) {
      sanityClient
        .fetch(
          `*[_type == 'paragraph' 
            && body[].children[].text match "${searchPhrase}"]`
        )
        .then((data) => {
          const tipArts: Paragraph[] = data.filter((d: Paragraph) => d.tipArticle)
          const arts: Paragraph[] = data.filter((d: Paragraph) => d.article)
          const tipRefs = tipArts.map(ta => ta.tipArticle[0]._ref)
          const refs = arts.map(ta => ta.tipArticle[0]._ref)
          setTipRefList(tipRefs)
          setReflist(refs)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });

    }
  }, [searchPhrase])

  useEffect(() => {
    if (tipRefList) {
      const resListArr: Article[] = []
      for (let i = 0; i < tipRefList.length; i++) {
        sanityClient
          .fetch(
            `*[_id == '${tipRefList[i]}']`
          )
          .then((data) => {
            resListArr.push(data[0])
          })
          .catch((err) => {
            console.log(err);
            setError('error loading data')
          });
      }
      setTipArticleTitles(resListArr)
    }
  }, [tipRefList])

  useEffect(() => {
    if (reflist) {
      const resListArr: Article[] = []
      for (let i = 0; i < reflist.length; i++) {
        sanityClient
          .fetch(
            `*[_id == '${reflist[i]}']`
          )
          .then((data) => {
            resListArr.push(data[0])
          })
          .catch((err) => {
            console.log(err);
            setError('error loading data')
          });
      }
      setArticleTitles(resListArr)
    }
  }, [tipRefList])

  console.log(searchPhrase)
  return (
    <div className={'lg:max-w-screen-xl mx-auto p-3'}>

      <h1>search</h1>

      <div>{error && <div>{error}</div>}</div>
      <div>
        <div>{
          tipArticleTitles && tipArticleTitles.map((a, idx) => <p key={idx}>
            {a.title}
          </p>)
        }</div>
        <div>{
          articleTitles && articleTitles.map((a, idx) => <p key={idx}>
            {a.title}
          </p>)
        }</div>
      </div>
    </div>
  );
};

export default SearchResultsView;
