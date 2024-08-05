import React from "react"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./src/theme"

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}

export const wrapPageElement = ({ element }) => (
  <ChakraProvider theme={theme}>
    {element}
  </ChakraProvider>
)

// Optional: Add this if you want to preload fonts
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  const filteredHeadComponents = headComponents.filter(
    ({ type, props }) =>
      !(
        type === 'link' &&
        props.as === 'font' &&
        props.rel === 'preload'
      )
  )

  const fontPreloadLinks = [
    <link
      key="preload-orbitron"
      rel="preload"
      href="/fonts/orbitron-var-latin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="preload-roboto-mono"
      rel="preload"
      href="/fonts/roboto-mono-var-latin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
  ]

  replaceHeadComponents([...filteredHeadComponents, ...fontPreloadLinks])
}
