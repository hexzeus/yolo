import './src/styles/global.css';

export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    const { pathname } = location;
    const scrollToTopRoutes = ['/'];
    if (scrollToTopRoutes.indexOf(pathname) !== -1) {
        window.scrollTo(0, 0);
    }
    return false;
};

export const onRouteUpdate = ({ location, prevLocation }) => {
    if (prevLocation !== null) {
        const skipLink = document.querySelector('#reach-skip-nav');
        if (skipLink) {
            skipLink.focus();
        }
    }
};
