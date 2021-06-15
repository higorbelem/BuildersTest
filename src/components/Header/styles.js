import {StyleSheet, Dimensions} from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../../style/colors';
import fonts from '../../style/fonts';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button:{
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontFamily: fonts.mainMedium,
        fontSize: 18,
        includeFontPadding: false
    }
});