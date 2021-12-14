// Reactで画面サイズを取得するHooks | RyotArchLog
// cf. https://ryotarch.com/javascript/react/get-window-size-with-react-hooks/

import { useState, useEffect, useCallback } from 'react'

const useWindowDimensions = (): {
  width: number
  height: number
} => {
  const isClient = typeof window === 'object'
  const getWindowDimensions = useCallback(() => {
    return {
      // cf. https://developer.mozilla.org/ja/docs/Web/API/Window/innerWidth
      width: isClient ? window?.innerWidth : 0,
      // https://developer.mozilla.org/ja/docs/Web/API/Window/innerHeight
      height: isClient ? window?.innerHeight : 0
    }
  }, [isClient])

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [getWindowDimensions])

  return windowDimensions
}

const delay = 500

export const useWindowSize = (): {
  width: number
  height: number
} => {
  const { width: w, height: h } = useWindowDimensions()
  const [width, setWidth] = useState(w)
  const [height, setHeight] = useState(h)

  // delay 後 debounce の対象 state をアップデート
  // cf. https://zenn.dev/luvmini511/articles/4924cc4cf19bc9
  useEffect(() => {
    const timer = setTimeout(() => setWidth(w), delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w])

  useEffect(() => {
    const timer = setTimeout(() => setHeight(h), delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [h])

  return { width, height }
}
