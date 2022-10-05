import React from 'react';

const useWindowSize = () => {
  const [windowData, setWindowData] = React.useState<{ windowBig:boolean; windowWidth:number }>(
    {
      windowBig:false, windowWidth:0
    }
  )

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth>820){
        setWindowData({
          windowBig:true,
          windowWidth: window.innerWidth
        })
      } else {
        setWindowData({
          windowBig:false,
          windowWidth: window.innerWidth
        })
      }

    }
    // event listener
    window.addEventListener('resize', handleResize)
    //  call
    handleResize()

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowData
}

export default useWindowSize
