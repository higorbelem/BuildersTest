import {StyleSheet, Dimensions} from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../../style/colors';
import fonts from '../../style/fonts';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: getBottomSpace(),
    },
    backImageContainer:{
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    backImage:{
        position: 'absolute',
        width: width,
        height: width,
        bottom: -40,
        right: 0,
    },
    infoContainer:{
        width: '100%',
    },
    tempContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    tempText:{
        flex: 1,
        fontFamily: fonts.mainLight,
        fontSize: 100,
        includeFontPadding: false,
        color: colors.mainText,
        textAlign: 'right',
    },
    tempInfoContainer:{
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15,
    },
    weatherDescription:{
        fontFamily: fonts.mainMedium,
        fontSize: 25,
        includeFontPadding: false,
        color: colors.mainText,
        textTransform: 'capitalize'
    },
    tempMinMaxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    tempMinMaxText:{
        fontFamily: fonts.mainRegular,
        fontSize: 18,
        includeFontPadding: false,
        color: colors.secondaryText,
        marginLeft: 5
    },
    tempAdicionalInfoConteiner:{
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 50
    },
    tempAdicionalInfoItemConteiner:{
        flex: 1,
        alignItems: 'center'
    },
    aditionalInfoValue:{
        fontFamily: fonts.mainRegular,
        fontSize: 28,
        includeFontPadding: false,
        color: colors.mainText,
    },
    aditionalInfoDescription:{
        fontFamily: fonts.mainRegular,
        fontSize: 18,
        includeFontPadding: false,
        color: colors.secondaryText,
    },
    scrollContainer:{
        height: 170,
        marginBottom: 20,
    },
    chartScoll:{
    },
    chartScollContent:{
        paddingHorizontal: 10,
    },  
    chart:{
        height: 170,
    },
    headerBar:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        marginTop: getStatusBarHeight(),
    }
});