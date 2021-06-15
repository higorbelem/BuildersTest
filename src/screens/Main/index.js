import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    View,
    Touchable,
    Image,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import SideMenu from 'react-native-side-menu-updated';
import RNLocation from 'react-native-location';
import moment from 'moment';

import ENV from '../../../env';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Types from '../../store/module/types';
import styles from './styles';
import colors from '../../style/colors';
import TextWithPlaceholder from '../../components/TextWithPlaceholder';

RNLocation.configure({
    //distanceFilter: null
});

const Main = () => {
    const dispatch = useDispatch();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [city, setCity] = useState('');
    const [chartData, setChartData] = useState({
        labels: [''],
        datasets: [
          {
            data: [0],
            color: () => colors.chartLine, // optional
            strokeWidth: 2 // optional
          },
        ],
    });

    const weather = useSelector(state => state.weather.weather);
    const loadingWeather = useSelector(state => state.weather.loading);

    useEffect(() => {
        checkPermissionAndGetLocation();
    }, []);

    useEffect(() => {
        if(weather){
            const labels = [];
            const data = [];

            weather.hourly.map((item) => {
                labels.push(`${moment.unix(item.dt).format('DD/MM HH')}h`);
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
            setCity(weather.addressInfo.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_2').length > 0)[0].short_name);
        }
    }, [weather]);

    const checkPermissionAndGetLocation = async () => {
        try{
            const permission = await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "coarse",
                    rationale: {
                        title: "Precisamos utilizar sua localização",
                        message: "Nós usamos sua localização para saber qual sua cidade",
                        buttonPositive: "ok",
                        buttonNegative: "cancelar"
                    }
                }
            })

            if(!permission){
                alert('É necessário permitir o uso da localização para o funcionamento do app')
                return
            }

            const location = await RNLocation.getLatestLocation({timeout: 100});

            if(!location){
                alert('Verifique se sua localização foi ativada.');
                return
            }

            dispatch({type: Types.weather.REQUEST_WEATHER_SAGA, payload:{lat: location.latitude, lon: location.longitude, appid: ENV.WEATHER_API_KEY, googleKey: ENV.GOOGLE_GEOCODING_KEY}})
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <SideMenu
                menu={<Menu/>}
                isOpen={drawerOpen}
                onChange={(isOpen) => setDrawerOpen(isOpen)}
                bounceBackOnOverdraw={false}
                openMenuOffset={Dimensions.get('window').width * 0.7}
                menuPosition='right'
            >
                <View style={styles.container}>
                    <Image 
                        source={require('../../imgs/overcast.png')}
                        style={styles.backImage}
                    />
                
                    <View style={styles.infoContainer}>
                        <View style={styles.tempContainer}>
                            <TextWithPlaceholder 
                                text={weather ? `${Math.round(weather.current.temp)}°` : '0°'}
                                showPlaceholder={!weather || loadingWeather}
                                style={styles.tempText}
                                placeholderWidth={80}
                            />

                            <View style={styles.tempInfoContainer}>
                                <View style={styles.tempMinMaxContainer}>
                                    <TextWithPlaceholder 
                                        text={weather ? weather.current.weather[0].description : ''}
                                        showPlaceholder={!weather || loadingWeather}
                                        style={styles.weatherDescription}
                                        placeholderWidth={20}
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
                                        showPlaceholder={!weather || loadingWeather}
                                        style={styles.tempMinMaxText}
                                        placeholderWidth={20}
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
                                        showPlaceholder={!weather || loadingWeather}
                                        style={styles.tempMinMaxText}
                                        placeholderWidth={20}
                                        isPlaceholderLine
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.tempAdicionalInfoConteiner}>
                            <View style={styles.tempAdicionalInfoItemConteiner}>
                                <TextWithPlaceholder 
                                    text={weather ? `${weather.current.humidity}%` : '0%'}
                                    showPlaceholder={!weather || loadingWeather}
                                    style={styles.aditionalInfoValue}
                                    placeholderWidth={20}
                                    isPlaceholderLine
                                />
                                <Text style={styles.aditionalInfoDescription}>
                                    Umidade
                                </Text>
                            </View>

                            <View style={styles.tempAdicionalInfoItemConteiner}>
                                <TextWithPlaceholder 
                                    text={weather ? `${weather.current.visibility} m` : '0 m'}
                                    showPlaceholder={!weather || loadingWeather}
                                    style={styles.aditionalInfoValue}
                                    placeholderWidth={20}
                                    isPlaceholderLine
                                />
                                <Text style={styles.aditionalInfoDescription}>
                                    Visibilidade
                                </Text>
                            </View>

                            <View style={styles.tempAdicionalInfoItemConteiner}>
                                <TextWithPlaceholder 
                                    text={weather ? weather.current.uvi : '0'}
                                    showPlaceholder={!weather || loadingWeather}
                                    style={styles.aditionalInfoValue}
                                    placeholderWidth={20}
                                    isPlaceholderLine
                                />
                                <Text style={styles.aditionalInfoDescription}>
                                    Índice UV
                                </Text>
                            </View>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.chartScoll}
                            contentContainerStyle={styles.chartScollContent}
                        >
                            <LineChart
                                data={chartData}
                                width={4000}
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
                            checkPermissionAndGetLocation();
                        }}
                        rightButtonPress={() => {
                            setDrawerOpen(true);
                        }}
                    />
                </View>
            </SideMenu>
        </>
    );
}

export default Main;