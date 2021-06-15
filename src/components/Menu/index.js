
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Icon} from 'react-native-elements';
import {LineChart} from "react-native-chart-kit";

import styles from './styles';
import colors from '../../style/colors';
import moment from 'moment';

moment.locale('pt');
moment.updateLocale('pt', {
    weekdays : [
        'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'
    ]
});

const correctIconForCondition = [
    {condition: 'Thunderstorm', icon: {type: 'ionicon', name: 'thunderstorm', color: colors.weatherIconCold}},
    {condition: 'Drizzle', icon: {type: 'feather', name: 'cloud-drizzle', color: colors.weatherIconCold}},
    {condition: 'Rain', icon: {type: 'feather', name: 'cloud-rain', color: colors.weatherIconCold}},
    {condition: 'Snow', icon: {type: 'font-awesome-5', name: 'snowflake', color: colors.weatherIconCold}},
    {condition: 'Mist', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconCold}},
    {condition: 'Smoke', icon: {type: 'font-awesome-5', name: 'wind', color: colors.weatherIconStandard}},
    {condition: 'Haze', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Dust', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Fog', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Sand', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Ash', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Squall', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconStandard}},
    {condition: 'Tornado', icon: {type: 'fontisto', name: 'fog', color: colors.weatherIconCold}},
    {condition: 'Clear', icon: {type: 'ionicon', name: 'sunny', color: colors.weatherIconHot}},
    {condition: 'Clouds', icon: {type: 'font-awesome-5', name: 'cloud', color: colors.weatherIconCold}},
];

export default SideMenu = () => {
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [listData, setListData] = useState([]);

    const weather = useSelector(state => state.weather.weather);

    useEffect(() => {
        if(weather){
            const cityRes = weather.addressInfo.results[0].address_components.filter(x => x.types.filter(t => t === 'administrative_area_level_2').length > 0);
            if(cityRes.length > 0){
                setCity(cityRes[0].short_name);
            } 
            
            const streetRes = weather.addressInfo.results[0].address_components.filter(x => x.types.filter(t => t === 'point_of_interest' || t === 'transit_station' || t === 'route').length > 0);
            let street = '';
            if(streetRes.length > 0){
                street = streetRes[0].short_name;
            }

            const districtRes = weather.addressInfo.results[0].address_components.filter(x => x.types.filter(t => t === 'sublocality_level_1').length > 0);
            let district = '';
            if(districtRes.length > 0){
                district = districtRes[0].short_name;
            }
            
            setAddress(`${street} ${street === '' || district === '' ? '' : '-'} ${district}`);
            setListData(weather.daily.filter((item) => moment.unix(item.dt).format('DD') !== moment().format('DD')))
        }
    }, [weather]);

    const getCorrectIcon = (weatherCondition) => {
        for (let index = 0; index < correctIconForCondition.length; index++) {
            const item = correctIconForCondition[index];
            
            if(item.condition === weatherCondition){
                return item.icon;
            }
        }
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.cityText}>{city}</Text>
            <Text style={styles.addressText}>{address}</Text>
            <Text style={styles.nextDaysText}>Próximos dias</Text>

            <FlatList 
                data={listData}
                scrollEnabled={false}
                keyExtractor={(item, index) => String(index)}
                style={styles.flatList}
                ItemSeparatorComponent={() => (
                    <View style={{height: 40}}/>
                )}
                renderItem={({item, index}) => (
                    <View style={styles.itemConteiner}>
                        <Text style={styles.itemTitle}>{moment.unix(item.dt).format('dddd')}</Text>
                        <View style={styles.itemTempView}>
                            <Text style={styles.itemTempMax}>{Math.round(item.temp.max)}°</Text>
                            <Text style={styles.itemTempMin}>{Math.round(item.temp.min)}°</Text>
                        </View>
                        <Icon
                            name={getCorrectIcon(item.weather[0].main).name}
                            type={getCorrectIcon(item.weather[0].main).type}
                            color={getCorrectIcon(item.weather[0].main).color}
                            size={18}
                            style={styles.itemIcon}
                        />
                    </View>
                )}
            />
        </ScrollView>
    );
}