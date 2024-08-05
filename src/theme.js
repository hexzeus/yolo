import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const colors = {
    brand: {
        50: "#D6FFE9",
        100: "#ADFFDD",
        200: "#85FFD1",
        300: "#5CFFC5",
        400: "#34FFB9",
        500: "#0CFFA3",
        600: "#09CC83",
        700: "#079963",
        800: "#046643",
        900: "#023323",
    },
    matrix: {
        light: "#00FF9C",
        dark: "#001F0D",
    },
    lightBg: "#0D0D0D",
    darkBg: "#001F0D",
    lightText: "#00FF9C",
    darkText: "#00FF9C",
    lightAccent: "#00FF9C",
    darkAccent: "#1AFFD5",
};

const fonts = {
    heading: `'Orbitron', sans-serif`,
    body: `'Roboto Mono', monospace`,
};

const styles = {
    global: (props) => ({
        body: {
            bg: props.colorMode === "dark" ? colors.darkBg : colors.lightBg,
            color: props.colorMode === "dark" ? colors.darkText : colors.lightText,
            transition: "background-color 0.2s, color 0.2s",
        },
        a: {
            color: props.colorMode === "dark" ? colors.darkAccent : colors.lightAccent,
            _hover: {
                textDecoration: "underline",
            },
        },
    }),
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: "bold",
            borderRadius: "md",
            textTransform: "uppercase",
            letterSpacing: "wide",
        },
        variants: {
            solid: (props) => ({
                bg: props.colorMode === "dark" ? colors.darkAccent : colors.brand[500],
                color: props.colorMode === "dark" ? colors.darkBg : colors.lightBg,
                _hover: {
                    bg: props.colorMode === "dark" ? colors.brand[300] : colors.brand[600],
                    transform: "scale(1.05)",
                },
            }),
            outline: (props) => ({
                borderColor: props.colorMode === "dark" ? colors.darkAccent : colors.brand[500],
                color: props.colorMode === "dark" ? colors.darkAccent : colors.brand[500],
                _hover: {
                    bg: props.colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100",
                    transform: "scale(1.05)",
                },
            }),
        },
    },
    Link: {
        baseStyle: (props) => ({
            color: props.colorMode === "dark" ? colors.darkAccent : colors.brand[600],
            _hover: {
                textDecoration: "none",
                color: props.colorMode === "dark" ? colors.brand[300] : colors.brand[700],
            },
        }),
    },
    Heading: {
        baseStyle: (props) => ({
            color: props.colorMode === "dark" ? colors.darkText : colors.lightText,
            letterSpacing: "wider",
        }),
    },
    Card: {
        baseStyle: (props) => ({
            bg: props.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.50",
            borderColor: props.colorMode === "dark" ? colors.darkAccent : colors.brand[500],
            borderWidth: "1px",
            boxShadow: props.colorMode === "dark" ? "0 0 10px #00FF9C" : "0 0 10px #0CFFA3",
            transition: "transform 0.3s, box-shadow 0.3s",
            _hover: {
                transform: "translateY(-5px)",
                boxShadow: props.colorMode === "dark" ? "0 0 15px #1AFFD5" : "0 0 15px #0CFFA3",
            },
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
