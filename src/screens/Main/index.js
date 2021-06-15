import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {LineChart} from "react-native-chart-kit";
import RNLocation from 'react-native-location';
import moment from 'moment';

import ENV from '../../../env';
import Header from '../../components/Header';
import Types from '../../store/module/types';
import styles from './styles';
import colors from '../../style/colors';
import TextWithPlaceholder from '../../components/TextWithPlaceholder';

const correctImagesForCondition = [
    {condition: 'Thunderstorm', image: require('../../imgs/Thunderstorm.png')},
    {condition: 'Drizzle', image: require('../../imgs/Drizzle.png')},
    {condition: 'Rain', image: require('../../imgs/Rain.png')},
    {condition: 'Snow', image: require('../../imgs/Snow.png')},
    {condition: 'Mist', image: require('../../imgs/Fog.png')},
    {condition: 'Smoke', image: require('../../imgs/Smoke.png')},
    {condition: 'Haze', image: require('../../imgs/Fog.png')},
    {condition: 'Dust', image: require('../../imgs/Dust.png')},
    {condition: 'Fog', image: require('../../imgs/Fog.png')},
    {condition: 'Sand', image: require('../../imgs/Dust.png')},
    {condition: 'Ash', image: require('../../imgs/Dust.png')},
    {condition: 'Squall', image: require('../../imgs/Smoke.png')},
    {condition: 'Tornado', image: require('../../imgs/Tornado.png')},
    {condition: 'Clear', image: require('../../imgs/Clear.png')},
    {condition: 'Clouds', image: require('../../imgs/Clouds.png')},
];

const Main = ({navigation}) => {
    const dispatch = useDispatch();

    const [backImage, setBackImage] = useState(correctImagesForCondition[14].image);
    const [permissionAndLocation, setPermissionAndLocation] = useState(true);
    const [lastLocation, setLastLocation] = useState(null);
    const [city, setCity] = useState('');
    const [chartData, setChartData] = useState({
        labels: ['-','-','-','-','-','-','-','-','-','-'],
        datasets: [
          {
            data: [0,0,0,0,0,0,0,0,0,0],
            color: () => colors.chartLine, // optional
            strokeWidth: 2 // optional
          },
        ],
    });

    const weather = useSelector(state => state.weather.weather);
    const loadingWeather = useSelector(state => state.weather.loading);
    const failedWeather = useSelector(state => state.weather.failed);

    useEffect(() => {
        let unsubscribe = null;
        const handleLocation = async () => {
            unsubscribe = await checkPermissionAndGetLocation();
        }
        handleLocation();
        
        return () => unsubscribe ? unsubscribe() : null
    }, []);

    useEffect(() => {
        if(failedWeather){
            alert('Verifique sua conexão com a internet.')
        }
    }, [failedWeather]);

    useEffect(() => {
        if(weather){
            getCorrectBackImage(weather.current.weather[0].main);
            const labels = [];
            const data = [];

            weather.hourly.map((item) => {
                labels.push(`${moment.unix(item.dt).format('HH')}h`);
                data.push(item.temp);
            })

            setChartData({
                labels,
                datasets: [
                  {
                    data,
                    color: () => colors.chartLine, // optional
                    strokeWidth: 2 // optional
                  },
                ],
            });

            //weather.addressInfo.results[0].
            const cityRes = weather.addressInfo.results[0].address_components.filter(x => x.types.filter(t => t === 'administrative_area_level_2').length > 0);
            if(cityRes.length > 0){
                setCity(cityRes[0].short_name);
            } 
        }
    }, [weather]);

    const getCorrectBackImage = (weatherCondition) => {
        for (let index = 0; index < correctImagesForCondition.length; index++) {
            const item = correctImagesForCondition[index];
            
            if(item.condition === weatherCondition){
                setBackImage(item.image);
                break;
            }
        }
    }

    const checkPermissionAndGetLocation = async () => {
        try{
            await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "fine",
                    rationale: {
                        title: "Precisamos utilizar sua localização",
                        message: "Nós usamos sua localização para saber qual sua cidade",
                        buttonPositive: "ok",
                        buttonNegative: "cancelar"
                    }
                }
            });

            if(!(await RNLocation.checkPermission({ios: 'whenInUse', android: {detail: 'fine'}}))){
                alert('É necessário permitir o uso da localização para o funcionamento do app');
                setPermissionAndLocation(false);
                return
            }

            RNLocation.configure({distanceFilter: 0});
            const unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
                if(!locations){
                    alert('Verifique se sua localização foi ativada.');
                    setPermissionAndLocation(false);
                    return
                }
                
                setLastLocation(locations[0]);
                setPermissionAndLocation(true);
                dispatch({type: Types.weather.REQUEST_WEATHER_SAGA, payload:{lat: locations[0].latitude, lon: locations[0].longitude, appid: ENV.WEATHER_API_KEY, googleKey: ENV.GOOGLE_GEOCODING_KEY}})
            });
            return unsubscribe;
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={styles.backImageContainer}>
                    <Image 
                        source={backImage}
                        style={styles.backImage}
                        resizeMode='cover'
                    />
                </View>

                <View>
                    <View style={styles.tempContainer}>
                        <TextWithPlaceholder 
                            text={weather ? `${Math.round(weather.current.temp)}°` : '0°'}
                            showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                            style={styles.tempText}
                            placeholderWidth={80}
                        />

                        <View style={styles.tempInfoContainer}>
                            <View style={styles.tempMinMaxContainer}>
                                <TextWithPlaceholder 
                                    text={weather ? weather.current.weather[0].description : ''}
                                    showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                    style={styles.weatherDescription}
                                    placeholderWidth={100}
                                    isPlaceholderLine
                                />
                            </View>

                            <View style={styles.tempMinMaxContainer}>
                                <Icon
                                    name='cloud'
                                    type='feather'
                                    color={colors.secondaryText}
                                    size={18}
                                />
                                <TextWithPlaceholder 
                                    text={weather ? `${weather.current.clouds}%` : '0%'}
                                    showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                    style={styles.tempMinMaxText}
                                    placeholderWidth={30}
                                    isPlaceholderLine
                                />
                            </View>

                            <View style={styles.tempMinMaxContainer}>
                                <Icon
                                    name='wind'
                                    type='feather'
                                    color={colors.secondaryText}
                                    size={18}
                                />
                                <TextWithPlaceholder 
                                    text={weather ? `${weather.current.wind_speed} m/s` : '0%'}
                                    showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                    style={styles.tempMinMaxText}
                                    placeholderWidth={30}
                                    isPlaceholderLine
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.tempAdicionalInfoConteiner}>
                        <View style={styles.tempAdicionalInfoItemConteiner}>
                            <TextWithPlaceholder 
                                text={weather ? `${weather.current.humidity}%` : '0%'}
                                showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                style={styles.aditionalInfoValue}
                                placeholderWidth={90}
                                isPlaceholderLine
                            />
                            <Text style={styles.aditionalInfoDescription}>
                                Umidade
                            </Text>
                        </View>

                        <View style={styles.tempAdicionalInfoItemConteiner}>
                            <TextWithPlaceholder 
                                text={weather ? `${weather.current.visibility} m` : '0 m'}
                                showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                style={styles.aditionalInfoValue}
                                placeholderWidth={90}
                                isPlaceholderLine
                            />
                            <Text style={styles.aditionalInfoDescription}>
                                Visibilidade
                            </Text>
                        </View>

                        <View style={styles.tempAdicionalInfoItemConteiner}>
                            <TextWithPlaceholder 
                                text={weather ? weather.current.uvi : '0'}
                                showPlaceholder={!weather || loadingWeather || !permissionAndLocation}
                                style={styles.aditionalInfoValue}
                                placeholderWidth={90}
                                isPlaceholderLine
                            />
                            <Text style={styles.aditionalInfoDescription}>
                                Índice UV
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.chartScoll}
                        contentContainerStyle={styles.chartScollContent}
                    >
                        <LineChart
                            data={chartData}
                            width={2700}
                            height={170}
                            chartConfig={{
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0, 
                                color: () => colors.gray,
                            }}
                            bezier
                            withInnerLines={false}
                            withHorizontalLines={false}
                            withVerticalLines={false}
                            yAxisSuffix=' c°'
                            style={styles.chart}
                        />
                    </ScrollView>
                </View>

                <Header 
                    title={city}
                    style={styles.headerBar}
                    leftButtonPress={() => {
                        if(lastLocation){
                            dispatch({type: Types.weather.REQUEST_WEATHER_SAGA, payload:{lat: lastLocation.latitude, lon: lastLocation.longitude, appid: ENV.WEATHER_API_KEY, googleKey: ENV.GOOGLE_GEOCODING_KEY}})
                        }
                    }}
                    rightButtonPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer);
                    }}
                />
            </View>
        </>
    );
}

export default Main;