import { AutoComplete, Button, Space } from "antd"
import { useEffect, useState } from "react";
import { useSelectedCity } from "../../store";
import styles from './styles.module.scss'
import { useTranslation } from "react-i18next";

export const Search = () => {
    const [MathingCities, setMathingCities] = useState([])
    const [value, setValue] = useState([])
    const [selectedCityName, setSelectedCitiesName] = useState({})
    const [MatchingList, setMatchingList] = useState([{}])
    const addCity = useSelectedCity((state) => state.addCity);
    const { t, i18n } = useTranslation();

    //get city names in Autocomplete
    useEffect(() => {
        const options = []
        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${MathingCities}&key=AIzaSyCy5koJSf53RQJBLb86E2_qxV2BjL1grPs&type=(regions)`)
            .then(res => res.json())
            .then(data => {
                data?.predictions?.forEach(element => {
                    options.push({ value: element.description })
                })
                setMatchingList(options)
            });
    }, [MathingCities]);

    
    const activatePlacesSearch = (mathingCities) => {
        setMathingCities(mathingCities)
        setValue(mathingCities)
    }

    //send result city name to store
    const sendCity = () => {
        addCity(selectedCityName?.split(',').slice(0, 1).join(''), i18n.language)
        setValue('')
    }

    return (
        <div className={styles.weatherSearch}>
            <Space>
                <AutoComplete
                    value={value}
                    options={MatchingList}
                    placeholder={t('search.searchPlaceHolder')}
                    onSelect={(place) => setSelectedCitiesName(place)}
                    onKeyDown={(key) => key.key === "Enter" ? addCity(selectedCityName?.split(',').slice(0, 1).join(''), i18n.language) : ''}
                    onChange={activatePlacesSearch}
                    bordered={false}
                    className={styles.weatherSearch__input}
                />
                <Button type="primary" onClick={sendCity} className={styles.weatherSearch__btn} >{t('search.btnAdd')}</Button>
            </Space>
        </div>
    )
}
