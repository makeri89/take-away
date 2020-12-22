import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#555555',
        textSecondary: '#808080',
        primary: '#24b719'
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
    }
};

export default theme;