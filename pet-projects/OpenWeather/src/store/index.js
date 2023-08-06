import dayjs from 'dayjs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => {
      return {
        cityWeather: [],
        tempUnit: [],
        isActiveUnit: true,
        currentLanguage: 'en',

        //get Current coords and send to AddCity fn
        getCurrentGeo: async coords => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_APP_API_BASE_URL}weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${import.meta.env.VITE_APP_ACCESS_KEY}`
            )
            const res = await response.json()
            if (res) {
              const getCityNameFromStore = get().cityWeather.find(
                cities => cities.cityName === res.name
              )
              if (getCityNameFromStore?.cityName !== res.name) {
                get().addCity(res.name)
              }
            }
          } catch {
            console.error('error')
          }
        },

        //delete weatherCard
        deleteWeatherCard: cityId => {
          set({ cityWeather: get().cityWeather.filter(el => el.cityId !== cityId) })
        },

        //get current degrees
        getCurrencyTempName: (TempName, cityId) => {
          const newCard = [...get().cityWeather]
          get().cityWeather.find(el => {
            if (el.cityId === cityId) {
              const cardIndex = newCard.indexOf(newCard.find(el => el.cityId === cityId))

              if (TempName === '°C' && newCard[cardIndex].isActiveUnit === false) {
                newCard[cardIndex].convertedTemp = el.currentTemp
                newCard[cardIndex].convertedAllTemp = el.convertedAllTemp.map(el => ({
                  temperature: Math.abs(Math.round((el.temperature - 32) / 1.8)),
                  date: el.date,
                }))
                newCard[cardIndex].isActiveUnit = true
                set({ cityWeather: newCard })
              }

              if (TempName === '°F') {
                newCard[cardIndex].convertedTemp = el.currentTemp * 1.8 + 32
                newCard[cardIndex].convertedAllTemp = el.convertedAllTemp.map(el => ({
                  temperature: Math.abs(Math.round(el.temperature * 1.8 + 32)),
                  date: el.date,
                }))
                newCard[cardIndex].isActiveUnit = false
                set({ cityWeather: newCard })
              }
            }
          })
        },

        //add weatherCard
        addCity: async (city, language) => {
          const findedCities = get().cityWeather.find(el => el.cityName === city)
          if (city.length !== 0 && findedCities === undefined) {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_APP_API_BASE_URL}forecast?q=${city}&appid=${import.meta.env.VITE_APP_ACCESS_KEY}&units=metric&lang=${language}`
              )
              const res = await response.json()
              set(prevstate => ({
                cityWeather: [
                  {
                    isActiveUnit: get().isActiveUnit,
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
                    convertedTemp: res.list[0].main.temp,
                    convertedAllTemp: get().getAverageTemps(res.list),
                  },
                  ...prevstate.cityWeather,
                ],
              }))
            } catch {
              console.error('error')
            }
          }
        },

        //resend city names to addCity with select language
        selectLanguage: async (language) => {
          const copyCityWeather = [...get().cityWeather]
          const citiesId = []
          copyCityWeather.forEach(el => {
            citiesId.push(el.cityId)
          })
          try {
            const response = await fetch(
              `${import.meta.env.VITE_APP_API_BASE_URL}group?id=${citiesId.join(',')}&lang=${language}&units=metric&cnt=40&appid=${import.meta.env.VITE_APP_ACCESS_KEY}`
            )
            const res = await response.json()
            res?.list.map(el => {
              copyCityWeather.filter(data => {
                if (data.cityId === el.id)
                  data.currentWeatherMain = el.weather[0].description,
                    data.currentWeatherIcon = el.weather[0].icon
              })
            })
            set({ cityWeather: copyCityWeather, currentLanguage: language })
          } catch {
            console.error('Not found city IDs')
          }
        },

        getAverageTemps: (array) => {
          const uniqDateNewArr = []
          const result = []
          const data = []

          array?.forEach(el => uniqDateNewArr.push(dayjs(el.dt_txt).format('DD.MM')))

          for (const currentDate of uniqDateNewArr) {
            const allTemperatures = array?.filter(item => dayjs(item.dt_txt).format('DD.MM') === currentDate)
              .map(item => item.main.temp)
            const averageTemp =
              allTemperatures.reduce((prev, curr) => prev + curr, 0) / allTemperatures.length
            result.push({ date: currentDate, temperature: Math.round(averageTemp) })
          }

          for (let i = 0; i < result.length; i++) {
            if (uniqDateNewArr[i] !== uniqDateNewArr[i - 1]) {
              data.push(result[i])
            }
          }

          return data
        }
      }
    },
    {
      name: 'weather',
    }
  )
)
