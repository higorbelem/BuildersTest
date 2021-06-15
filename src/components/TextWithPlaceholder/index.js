
import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import {
    PlaceholderLine,
    Placeholder,
    PlaceholderMedia,
    Fade
} from "rn-placeholder";

import styles from './styles';

export default TextWithPlaceholder = ({text, showPlaceholder, isPlaceholderLine, placeholderWidth, ...rest}) => {

    if(showPlaceholder){
        return(
            <Placeholder
                Animation={Fade}
                style={styles.container}
                {...rest}
            >
                {
                    isPlaceholderLine ? 
                        <PlaceholderLine width={placeholderWidth}/>
                    :
                        <PlaceholderMedia size={placeholderWidth}/>
                }
                
            </Placeholder>
        )
    }else{
        return (
            <Text 
                {...rest}
            >{text}</Text>
        );
    }
}