import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    homeContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4169E1',
    },

    formsContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    carteleraContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    paginaProductoContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    carteleraItemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
    },
    carteleraItem: {
        width: '48%',
        backgroundColor: '#d1d1d1',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'flex-start',
        margin: 3,
        maxHeight: 215,
        minHeight: 215,
        padding: 3,

    },
    homeButtonPrimary: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        padding: 2,
        margin: 5,
        minWidth: 200,
    },

    homeButtonPrimaryText: {
        color: 'white',
        padding: 2,
        margin: 5,
        alignSelf: 'center',
        fontSize: 18,
    },

    homeButtonSecondary: {
        borderColor: 'white',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        padding: 2,
        margin: 5,
        minWidth: 200,
    },

    homeButtonSecondaryText: {
        fontSize: 18,
        fontFamily: 'sans-serif',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        padding: 2,
        marginHorizontal: 5,
        alignSelf: 'center',
    },

    // FONTS

    h1: {
        fontWeight: 'bold',
        fontSize: 21,
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
    },
    h1Cartelera: {
        fontSize: 25,
        color: '#34bdeb',
        alignSelf: 'center',
    },

    whiteFont: {
        color: '#fff',
        marginTop: 20,
        fontSize: 16,
    },

    whiteFontFooter: {
        color: '#fff',
        fontSize: 16,
        top: 80,
        paddingVertical: 1,
    },

    sectionTitle: {
        color: '#34bdeb',
        fontSize: 25,
        paddingLeft: 20,
    },

    subtitle1: {
        alignSelf: 'center',
        fontSize: 22,
        marginVertical: 10,
    },

    subtitle2: {
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 15,
    },

    whiteSubtitle1: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
        marginVertical: 10,
    },

    whiteSubtitle2: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 10,
    },

    formTooltip: {
        color: '#6e6e6e',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,

    },

    primaryTextInput: {

        fontSize: 20,
        marginBottom: 1,
        backgroundColor: 'transparent',

    },
    secondaryTextInput: {
        fontSize: 18,
        marginBottom: 1,
        backgroundColor: 'transparent',
        height: 30,
    },

    primaryNavigationButton: {
        backgroundColor: '#1A4472',
        borderColor: '#1A4472',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        alignSelf: 'center',
        width: 200,
        marginTop: 20,
        marginBottom: 45,

    },
    historialButton: {
        backgroundColor: '#1A4472',
        borderColor: '#1A4472',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
        width: '100%',
        marginTop: 20,
        color: '#000',

    },
    historialPrimary: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    historialSecondary: {
        fontSize: 16,
        maxWidth: '100%',
    },
    primaryHistorialButtonText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },

    primaryNavigationButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },

    primaryFormButton: {
        backgroundColor: 'transparent',
        borderColor: '#6e6e6e',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        alignContent: 'center',
        minHeight: 40,
        width: '100%',
        padding: 5,
    },

    primaryFormButtonText: {
        color: '#6e6e6e',
        fontSize: 16,
        marginVertical: 2,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },

    placeHolderText: {
        color: '#6e6e6e',
        backgroundColor: 'transparent',
        fontSize: 16,
        marginVertical: 2,
    },

    formDivider: {
        borderBottomColor: '#6e6e6e',
        borderBottomWidth: 0.3,
        alignSelf: 'stretch',
        marginVertical: 2,
    },

    textInputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#6e6e6e',
        backgroundColor: 'transparent',
        margin: 1,
    },

    menuButton: {
        backgroundColor: '#1a4472',
        padding: 15,
        marginBottom: 5,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 10,
    },
    menuButtonDisabled: {
        backgroundColor: '#666666',
        padding: 15,
        marginBottom: 5,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 10,
    },

    menuImage: {
        flex: 0,
        margin: 5,
        resizeMode: 'contain',
    },

    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    menuItem: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
    },

    menuText: {
        color: '#6e6e6e',
        fontSize: 20,
        marginBottom: 25,
        marginTop: 5,
    },

    celesteText: {
        color: '#4287f5',
        fontSize: 25,
        marginBottom: 5,
        marginTop: 0,
    },
    errors: {
        fontSize: 14,
        color: 'red',
    },
    textPerfil: {
        fontSize: 17,
        color: 'black',
        marginBottom: 2,
    },

});

export default style;
