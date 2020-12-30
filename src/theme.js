import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#555555',
        textSecondary: '#808080',
        primary: '#24b719',
        error: '#d73a4a',
        appBackground: '#f2f0e1',
        shadow: '#555555',
    },
    fontSizes: {
        body: 14,
        subheading: 20,
        header: 24
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    fontWeights: {
        normal: '400',
        bold: '600'
    },
    itemWithShadow: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#555555',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 5
        }
    }
};

export default theme;