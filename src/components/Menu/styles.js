import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../../style/colors';
import fonts from '../../style/fonts';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.sideBarBackground,
        width: '100%',
        flex: 1,
    },
    contentContainer:{
        padding: 15,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 40,
        alignItems: 'center'
    },
    cityText: {
       color: colors.invertedMainText,
       fontFamily: fonts.mainSemiBold,
       fontSize: 20
    },
    addressText: {
        color: colors.invertedSecondaryText,
        fontFamily: fonts.mainSemiBold,
        fontSize: 14
    },
    nextDaysText:{
        color: colors.invertedMainText,
        fontFamily: fonts.mainSemiBold,
        fontSize: 18,
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: 30
    },
    flatList:{
        width: '100%',
    },
    itemConteiner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle: {
        flex: 1,
        color: colors.invertedMainText,
        fontFamily: fonts.mainMedium,
        fontSize: 16
    },
    itemTempView: {
        flex: 1,
        flexDirection: 'row'
    },
    itemTempMax: {
        color: colors.invertedMainText,
        fontFamily: fonts.mainMedium,
        fontSize: 16
    },
    itemTempMin: {
        color: colors.invertedSecondaryText,
        fontFamily: fonts.mainMedium,
        fontSize: 16,
        marginLeft: 5
    },
    itemIcon:{

    }
});