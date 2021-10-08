const fontConfig = {
    default: {
        regular: {
            fontFamily: "sans-serif",
            fontWeight: "normal",
        },
        medium: {
            fontFamily: "sans-serif-medium",
            fontWeight: "normal",
        },
        light: {
            fontFamily: "sans-serif-light",
            fontWeight: "normal",
        },
        thin: {
            fontFamily: "sans-serif-thin",
            fontWeight: "normal",
        },
        title1: {
            fontSize: 20,
            fontFamily: "sans-serif",
            fontWeight: "bold"
        }
    },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;
fontConfig.web = fontConfig.default;


export default fontConfig;