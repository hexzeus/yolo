import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const colors = {
    brand: {
        50: "#E5F4FF",
        100: "#B8E0FF",
        200: "#8ACCFF",
        300: "#5CB8FF",
        400: "#2EA4FF",
        500: "#0090FF",
        600: "#0072CC",
        700: "#005499",
        800: "#003666",
        900: "#001833",
    },
    lightBg: "#F0F4F8",
    darkBg: "#1A202C",
    lightText: "#2D3748",
    darkText: "#E2E8F0",
    lightAccent: "#ED8936",
    darkAccent: "#4299E1",
};

const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
};

const styles = {
    global: (props) => ({
        body: {
            bg: props.colorMode === "dark" ? "darkBg" : "lightBg",
            color: props.colorMode === "dark" ? "darkText" : "lightText",
        },
    }),
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: "bold",
            borderRadius: "md",
        },
        variants: {
            solid: (props) => ({
                bg: props.colorMode === "dark" ? "darkAccent" : "brand.500",
                color: "white",
                _hover: {
                    bg: props.colorMode === "dark" ? "blue.300" : "brand.600",
                },
            }),
        },
    },
    Link: {
        baseStyle: (props) => ({
            color: props.colorMode === "dark" ? "darkAccent" : "brand.600",
            _hover: {
                textDecoration: "none",
                color: props.colorMode === "dark" ? "blue.200" : "brand.700",
            },
        }),
    },
    Heading: {
        baseStyle: (props) => ({
            color: props.colorMode === "dark" ? "white" : "gray.800",
        }),
    },
    Card: {
        baseStyle: (props) => ({
            bg: props.colorMode === "dark" ? "gray.700" : "white",
            boxShadow: props.colorMode === "dark" ? "2xl" : "md",
        }),
    },
};

const theme = extendTheme({
    config,
    colors,
    fonts,
    styles,
    components,
});

export default theme;