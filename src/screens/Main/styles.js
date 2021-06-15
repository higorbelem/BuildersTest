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
    backImage:{
        flex: 1,
        width: width,
        height: width,
    },
    infoContainer:{
        flex: 1,
        width: '100%',
    },
    tempContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
        flex:1,
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
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
    chartScoll:{
        height:80,
        marginBottom: 20
    },
    chartScollContent:{
        paddingHorizontal: 10
    },  
    chart:{
        height: 160,
    },
    headerBar:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        marginTop: getStatusBarHeight()
    }
});