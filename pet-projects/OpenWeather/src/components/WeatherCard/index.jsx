import { useStore } from '../../store'
import { Col } from 'antd'
import dayjs from 'dayjs'
import Graph from '../Graph'
import { useTranslation } from 'react-i18next'
import './../../index.css'
import styles from './styles.module.scss'
import classnames from 'classnames'
import 'dayjs/locale/he'
import 'dayjs/locale/uk'
import PropTypes from 'prop-types'

export const WeatherCard = ({ dataCard }) => {
  const data = dataCard
  const { t, i18n } = useTranslation()
  const getCurrencyTempName = useStore(state => state.getCurrencyTempName)
  const deleteWeatherCard = useStore(state => state.deleteWeatherCard)

  const handleSelectedUnit = (unit, cityId) => {
    getCurrencyTempName(unit, cityId)
  }

  return (
    <Col className={styles.weatherCard__item}>
      <div
        className={classnames(styles.weatherCard__card, styles.weatherCard__cardBGPlus, {
          [styles.weatherCard__cardBGMinus]: data.convertedTemp < 0,
        })}
      >
        <div className={styles.card__wrapper}>
          <div className={styles.card__header}>
            <div className={styles.card__city}>
              {data?.cityName}, {data?.cityCountry}
            </div>
            <div className={styles.card__weather}>
              <img
                src={`https://openweathermap.org/img/wn/${data?.currentWeatherIcon}.png`}
                alt="weather-ico"
              />
              <span className={styles.card__weatherName}>{data?.currentWeatherMain}</span>
            </div>
            <div
              className={styles.card__close}
              onClick={() => deleteWeatherCard(data.cityId)}
            ></div>
          </div>
          <div className={styles.card__timeNow}>
            {dayjs()
              .locale(i18n.language === 'uk' ? 'uk' : i18n.language)
              .format(i18n.language === 'uk' ? 'dd, DD MMMM, HH:mm' : 'ddd, DD MMMM, HH:mm ')}
          </div>
          <div className={styles.card__graph}>
            <Graph allTemps={data?.convertedAllTemp} currentTemp={data.convertedTemp} />
          </div>
          <div className={styles.card__info}>
            <div className={styles.card__temperature}>
              <div className={styles.card__tempValue}>
                {Math.round(data.convertedTemp) > 0
                  ? `+${Math.round(data.convertedTemp)}`
                  : Math.round(data.convertedTemp)}
              </div>
              <div className={styles.card__tempName}>
                <span
                  className={classnames(styles.isDefault, {
                    [styles.isActive]: data.isActiveUnit,
                  })}
                  onClick={e => handleSelectedUnit(e.target.outerText, data.cityId)}
                >
                  °C
                </span>
                <span> | </span>
                <span
                  className={classnames(styles.isDefault, {
                    [styles.isActive]: !data.isActiveUnit,
                  })}
                  onClick={e => handleSelectedUnit(e.target.outerText, data.cityId)}
                >
                  °F
                </span>
              </div>
            </div>
            <div className={i18n.language === 'he' ? styles.card__whpRTL : styles.card__whp}>
              <p>
                {t('wetherCard.wind')}:{' '}
                <span
                  className={classnames(styles.card__whpDataPlus, {
                    [styles.card__whpDataMinus]: data.convertedTemp < 0,
                  })}
                >
                  {data?.wind}m/s
                </span>
              </p>
              <p>
                {t('wetherCard.humidity')}:{' '}
                <span
                  className={classnames(styles.card__whpDataPlus, {
                    [styles.card__whpDataMinus]: data.convertedTemp < 0,
                  })}
                >
                  {data?.humidity}%
                </span>
              </p>
              <p>
                {t('wetherCard.pressure')}:{' '}
                <span
                  className={classnames(styles.card__whpDataPlus, {
                    [styles.card__whpDataMinus]: data.convertedTemp < 0,
                  })}
                >
                  {data?.pressure}Pa
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

WeatherCard.propTypes = {
  dataCard: PropTypes.object,
}
