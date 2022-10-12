import React from 'react';
import GradientCommunicationSection from "../Components/HomeViewComps/GradientCommunicationSection";
import GrayLinkContainer from "../Components/InfoAdviceComps/GrayLinkContainer";
import useProvideData from "../hooks/useProvideData";

const InfoAdviceView = () => {

  const { error, categoryObjects} = useProvideData()


  return (
    <div className={'max-w-screen-xl mx-auto'}>
      <section className={'px-3'}>
        <h2 className={`text-left text-3xl md:text-6xl font-bold text-blue mx-auto`}>
          Info & Advice
        </h2>
        <p>
          All the information and support you need in one place.
        </p>
      </section>
      <section className={'p-3 md:flex gap-4'}>

        {error ? <div>{error}</div> : null}
        {categoryObjects && categoryObjects.map((c, idx) => {
          return <GrayLinkContainer key={idx + c.title} categoryObject={c}></GrayLinkContainer>

        })}
      </section>
      <section id={'topics'} className={'mt-16'}>
        <GradientCommunicationSection
          url={'/contact-us'} title={'Do you want to know about other topics?'}
          buttonText={'Send us suggestions!'}/>
      </section>
    </div>
  );
}

export default InfoAdviceView;
