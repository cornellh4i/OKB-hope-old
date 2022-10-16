import React from 'react';

const useWindowSize = () => {
  const [windowData, setWindowData] = React.useState<{ windowBig: boolean; windowWidth: number; windowHeight: number }>(
    {
      windowBig: false, windowWidth: 0, windowHeight:0
    }
  )

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 820) {
        setWindowData({
          windowBig: true,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        })
      } else {
        setWindowData({
          windowBig: false,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
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
