import { AutoComplete, Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '../../utility/useDebounce'

const apiUrl = import.meta.env.VITE_APP_API_SEARCH_CITY_URL
const apiKey = import.meta.env.VITE_APP_SEARCH_CITY_KEY

export const Search = () => {
  const [matchingCities, setMatchingCities] = useState([])
  const [value, setValue] = useState([])
  const [MatchingList, setMatchingList] = useState([])
  const addCity = useStore(state => state.addCity)
  const { t, i18n } = useTranslation()
  const debounceValue = useDebounce(matchingCities, 300)

  const findCities = value => {
    const options = []
    try {
      fetch(`${apiUrl}city?name=${value}&limit=5`, {
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            data?.forEach(element => {
              options.push({ value: `${element.name}, ${element.country}` })
            })
          }
          setMatchingList(options)
        })
    } catch {
      console.error("Don't find city")
    }
  }

  //get city names in Autocomplete
  useEffect(() => {
    if (debounceValue.length !== 0) {
      findCities(debounceValue)
    }
  }, [debounceValue])

  const activatePlacesSearch = matchingCities => {
    setMatchingCities(matchingCities)
    setValue(matchingCities)
  }

  //send result city name to store
  const sendCity = () => {
    addCity(value, i18n.language)
    setValue('')
  }

  const keyDown = key => {
    if (key.key === 'Enter') {
      addCity(value, i18n.language)
      setValue('')
    }
  }

  const onSelect = value => {
    addCity(value, i18n.language)
    setValue('')
  }

  return (
    <div className={styles.weatherSearch}>
      <AutoComplete
        value={value}
        options={MatchingList}
        placeholder={t('search.searchPlaceHolder')}
        onSelect={onSelect}
        onKeyDown={keyDown}
        onChange={activatePlacesSearch}
        bordered={false}
        className={styles.weatherSearch__input}
      />
      <Button type="primary" onClick={sendCity} className={styles.weatherSearch__btn}>
        {t('search.btnAdd')}
      </Button>
    </div>
  )
}
