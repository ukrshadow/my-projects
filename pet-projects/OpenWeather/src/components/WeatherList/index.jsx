import { useEffect } from 'react'
import { useStore } from '../../store'
import { Row } from 'antd'
import { useGeolocated } from 'react-geolocated'
import { useTranslation } from 'react-i18next'
import './../../index.css'
import { WeatherCard } from '../WeatherCard'

export function WeatherList() {
  const dataFromAPI = useStore(state => state.cityWeather)
  const { i18n } = useTranslation()
  const addCity = useStore(state => state.addCity)
  const getCurrentGeo = useStore(state => state.getCurrentGeo)
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })
  const getFutureTime = localStorage.getItem('futureTimeData')
  const futureTime = JSON.stringify(dataFromAPI[0]?.futureTime * 1000)
  const currentTimeData = new Date().getTime()

  // Sending Current User Coords to Store
  useEffect(() => {
    if (coords) {
      getCurrentGeo({ lat: coords?.latitude, lon: coords?.longitude })
    }
  }, [coords])

  // Update weather card when the current time is greater than the next update time with API
  useEffect(() => {
    localStorage.setItem('currentTimeData', currentTimeData)
    localStorage.setItem('futureTimeData', futureTime)
    const newCityNameArray = []
    if (currentTimeData > getFutureTime) {
      dataFromAPI.forEach(el => {
        newCityNameArray.push(el.cityName)
      })
      newCityNameArray.forEach(el => {
        addCity(el, i18n.language)
      })
      localStorage.setItem('futureTimeData', futureTime)
    }
  }, [])

  return (
    <>
      <Row gutter={[30, 32]} className="weatherCard__list">
        {dataFromAPI.length && dataFromAPI.map(el => <WeatherCard key={el.cityId} dataCard={el} />)}
      </Row>
    </>
  )
}
