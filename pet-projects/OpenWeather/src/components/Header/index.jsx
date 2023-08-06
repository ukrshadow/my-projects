import { Select } from 'antd'
import styles from './styles.module.scss'
import { useStore } from '../../store'
import { useTranslation } from 'react-i18next'
import { OPTIONS } from '../../utility/headerSelectOptions'

export const Header = () => {
  const selectLanguage = useStore(state => state.selectLanguage)
  const { i18n } = useTranslation()
  const getCityNameFromStore = JSON.parse(localStorage.getItem('weather')).state.currentLanguage

  const handleChange = value => {
    selectLanguage(value)
    i18n.changeLanguage(value)
    document.documentElement.lang = value
    if (value === 'he') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.header__language}>
          <Select
            defaultValue={getCityNameFromStore}
            className={styles.header__selectLanguage}
            bordered={false}
            onSelect={handleChange}
            options={OPTIONS}
          />
        </div>
      </div>
    </header>
  )
}
