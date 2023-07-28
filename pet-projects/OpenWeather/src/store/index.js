import { create } from "zustand";
import { persist } from 'zustand/middleware'


export const useSelectedCity = create(persist(
    (set, get) => ({
        cityWeather: [],
        testCity: [],
        tempUnit: [],
        defaultCelsium: true,
        isActiveC: true,
        isActiveF:false,
        currentLanguage:'en',

        //get Current coords and send to AddCity fn
        getCurrentGeo: async (coords) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=50b13f4d4632c3d79f872a013142961d`)
            const res = await response.json()
            const getWeather = localStorage.getItem('weather');
            const getCityNameFromStore = JSON.parse(getWeather).state?.cityWeather.find(cities => cities.cityName === res.name)

            if (getCityNameFromStore?.cityName !== res.name) {
                get().addCity(res.name);
            }
        },
        //delete weatherCard
        deleteWeatherCard: (cardIndex) => {
           set(get().cityWeather.splice(cardIndex,1)) 
        },

        //get current degrees
        getCurencyTempName: (TempName, index) => {
            if (TempName === "°C") {
                get().defaultCelsium = true
                get().cityWeather[index].convertedTemp = get().cityWeather[index].currentTemp
                get().cityWeather[index].convertedAllTemp = get().cityWeather[index].allTemp.map(el => (
                    {temperature: Math.abs(Math.round(el.main.temp)), date: el.dt_txt}
                ))
                get().cityWeather[index].isActiveC = true
                get().cityWeather[index].isActiveF = false
                set({ currentTemp: get().cityWeather[index].currentTemp })
            }
            if (TempName === "°F") {
                get().defaultCelsium = false;
                get().cityWeather[index].convertedTemp = get().cityWeather[index].currentTemp * 1.8 + 32;
                get().cityWeather[index].convertedAllTemp = get().cityWeather[index].allTemp.map(el =>(
                    {temperature: Math.abs(Math.round(el.main.temp*1.8 + 32)), date: el.dt_txt}
                ));
                get().cityWeather[index].isActiveC = false
                get().cityWeather[index].isActiveF = true
                set({ currentTemp: get().cityWeather[index].currentTemp * 1.8 + 32 })
            }

        },

        //add weatherCard
        addCity: async (city, language) => {
            if (city.length !== 0) {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=50b13f4d4632c3d79f872a013142961d&units=metric&lang=${language}`)   //  0711267016eb451e43c2a98b4543b811
                const res = await response.json()
                set(prevstate => ({
                    cityWeather: [{
                        isActiveC: get().isActiveC,
                        isActiveF: get().isActiveF,
                        cityId: res.city.id,
                        cityName: res.city.name,
                        cityCountry: res.city.country,
                        currentWeatherIcon: res.list[0].weather[0].icon,
                        currentWeatherMain: res.list[0].weather[0].description,
                        currentTemp: res.list[0].main.temp,
                        futureTime: res.list[0].dt,
                        allTemp: res.list,
                        wind: res.list[0].wind.speed,
                        humidity: res.list[0].main.humidity,
                        pressure: res.list[0].main.pressure,
                        convertedTemp: get().defaultCelsium === true ? res.list[0].main.temp : res.list[0].main.temp,
                        convertedAllTemp: get().defaultCelsium === true 
                        ?
                        res.list.map(el => (
                            {temperature: Math.abs(Math.round(el.main.temp)), date: el.dt_txt}
                        )) 
                        : 
                        res.list.map(el => (
                            {temperature: Math.abs(Math.round(el.main.temp)), date: el.dt_txt}
                        )),
                    }, ...prevstate.cityWeather]
                }))
            }
        },

        //resend city names to addCity with select language
        selectLanguage: (language) => {
            set({currentLanguage:language}, )

            const newCityNameArray = []
                get().cityWeather.forEach((el) => {
                    newCityNameArray.push(el.cityName)
                })
                get().cityWeather.length = 0
                newCityNameArray.forEach(el => {
                    get().addCity(el, language)
                } )
        },
    })
    ,
    {
        name: 'weather', 

    },
)
)


