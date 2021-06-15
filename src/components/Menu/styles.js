import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../../style/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.sideBarBackground,
        width: '100%',
        flex: 1,
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 40 : 40,
    },
});