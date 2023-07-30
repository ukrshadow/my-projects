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
        if(MathingCities.length !== 0 ) {
        const options = []
         fetch(`https://api.api-ninjas.com/v1/city?name=${MathingCities}&limit=5`, {
            headers: { 'X-Api-Key': '2VT8To6kGq7Fu6oGiHBMgg==HwsoWTq8iqAnFEAT'},
            contentType: 'application/json',
        })
            .then(res =>  res.json())
            .then(data => {
                data?.forEach(element => {
                    options.push({ value:`${element.name}, ${element.country}` })
                })
                setMatchingList(options)
            });
        }
    }, [MathingCities]);


    const activatePlacesSearch = (mathingCities) => {
        setMathingCities(mathingCities)
        setValue(mathingCities)
    }

    //send result city name to store
    const sendCity = () => {
        addCity(selectedCityName?.split(',').slice(0, 1).join(''), i18n.language)
        setValue('')
        setSelectedCitiesName('')
    
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
