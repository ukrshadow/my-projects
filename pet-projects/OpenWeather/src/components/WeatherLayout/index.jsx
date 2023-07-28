import { useEffect } from "react";
import { useSelectedCity } from "../../store"
import { Col, Row } from "antd";
import dayjs from "dayjs";
import he from "dayjs/locale/he";
import uk from "dayjs/locale/uk";
import Graph from "../Graph";
import { useGeolocated } from "react-geolocated";
import { useTranslation } from "react-i18next";
import './../../index.css'
import styles from './styles.module.scss' 

export function WeatherLayout() {
    const dataFromAPI = useSelectedCity(state => state.cityWeather)
    const { t, i18n } = useTranslation()
    const { addCity, getCurrentGeo, getCurencyTempName, deleteWeatherCard } = useSelectedCity();
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });
    const getFutureTime = localStorage.getItem('futureTimeData');
    const FuruteTime = JSON.stringify(dataFromAPI[0]?.futureTime * 1000)
    const currentTime = new Date()
    const currentTimeData = currentTime.getTime();

    // Sending Current User Coords to Store
    useEffect(() => {
        if (coords) {
            getCurrentGeo({ lat: coords?.latitude, lon: coords?.longitude })
        }
    }, [coords])

    // Update weather card when the current time is greater than the next update time with API 
    useEffect(() => {
        localStorage.setItem('currentTimeData', currentTimeData);
        localStorage.setItem('futureTimeData', FuruteTime)
        const newCityNameArray = []
        if (currentTimeData > getFutureTime) {
            dataFromAPI.forEach((el) => {
                newCityNameArray.push(el.cityName)
            })
            dataFromAPI.length = 0
            newCityNameArray.forEach(el => {
                addCity(el, i18n.language)
            })
            localStorage.setItem('futureTimeData', FuruteTime);
        }
    }, [])

    return (
        <>
            <Row gutter={[30, 32]} className='weatherCard__list'>
                {dataFromAPI ? dataFromAPI?.map((el, index) => (
                    <Col className={styles.weatherCard__item} key={el.cityId + Math.random()} >
                        <div className={styles.weatherCard__card && el.convertedTemp < 0 ? styles.weatherCard__cardBGMinus : styles.weatherCard__cardBGPlus}>
                            <div className={styles.card__wrapper}>
                                <div className={styles.card__header}>
                                    <div className={styles.card__city} >
                                        {el?.cityName}, {el?.cityCountry}
                                    </div>
                                    <div className={styles.card__weather} >
                                        {dataFromAPI ? <img src={`https://openweathermap.org/img/wn/${el?.currentWeatherIcon}.png`} alt="wheather-ico" /> : ''}   <span className={styles.card__weatheName}>{el?.currentWeatherMain}</span>
                                    </div>
                                    <div className={styles.card__close} onClick={() => deleteWeatherCard(index)}></div>
                                </div>
                                <div className={styles.card__timeNow}>
                                    {dayjs().locale(i18n.language === 'ua' ? 'uk' : i18n.language).format(i18n.language === 'ua' ? 'dd, DD MMMM, HH:mm' : 'ddd, DD MMMM, HH:mm ')}
                                </div>
                                <div className={styles.card__graph}>
                                    <Graph tempAndDate={el?.convertedAllTemp} currentTemp={el.convertedTemp} />
                                </div>
                                <div className={styles.card__info}>
                                    <div className={styles.card__temperature} >
                                        <div className={styles.card__tempValue}>
                                            {Math.round(el.convertedTemp) > 0 ? `+${Math.round(el.convertedTemp)}` : Math.round(el.convertedTemp)}
                                        </div>
                                        <div className={styles.card__tempName} onClick={(e) => getCurencyTempName(e.target.outerText, index)}>
                                            <span className={el.isActiveC ? styles.isActive : styles.isDefault}>°C</span>
                                            <span onClick={(e)=> e.preventDefault()}> | </span>    
                                            <span className={el.isActiveF ? styles.isActive : styles.isDefault}>°F</span>
                                        </div>
                                    </div>
                                    <div className={i18n.language === 'he' ? styles.card__whpRTL : styles.card__whp}>
                                        <p> {t('wetherCard.wind')}: <span className={el.convertedTemp < 0 ? styles.card__whpDataMinus : styles.card__whpDataPlus}>{el?.wind}m/s</span></p>
                                        <p> {t('wetherCard.humidity')}: <span className={el.convertedTemp < 0 ? styles.card__whpDataMinus : styles.card__whpDataPlus}>{el?.humidity}%</span></p>
                                        <p> {t('wetherCard.pressure')}: <span className={el.convertedTemp < 0 ? styles.card__whpDataMinus : styles.card__whpDataPlus}>{el?.pressure}Pa</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Col>
                )
                ) : ''}
            </Row>

        </>

    )
}
