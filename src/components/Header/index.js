import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../style/colors';
import styles from './styles';

const Header = ({title, leftButtonPress, rightButtonPress, style, ...rest}) => {
    return(
        <View
            style={[
                styles.container,
                style
            ]}
            {...rest}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={leftButtonPress}
            >
                <Icon
                    name='reload'
                    type='ionicon'
                    color={colors.secondaryText}
                    size={25}
                />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={rightButtonPress}
            >
                <Icon
                    name='menu'
                    type='feather'
                    color={colors.secondaryText}
                    size={30}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header;