import React from "react"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./src/theme"

export const wrapPageElement = ({ element }) => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {element}
    </ChakraProvider>
)

// Optional: Add this if you want to preserve scroll position between page navigations
export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    const { pathname } = location
    // List of routes where we want to reset scroll to top
    const scrollToTopRoutes = [`/`]
    if (scrollToTopRoutes.indexOf(pathname) !== -1) {
        window.scrollTo(0, 0)
    }

    return false
}

// Optional: Add this if you want to handle focus management for accessibility
export const onRouteUpdate = ({ location, prevLocation }) => {
    if (prevLocation !== null) {
        const skipLink = document.querySelector('#reach-skip-nav')
        if (skipLink) {
            skipLink.focus()
        }
    }
}