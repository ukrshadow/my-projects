import { Select } from 'antd';
import styles from './styles.module.scss'
import { useSelectedCity } from '../../store';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { selectLanguage } = useSelectedCity();
  const { t, i18n } = useTranslation();
  const getCityNameFromStore = JSON.parse(localStorage.getItem('weather')).state.currentLanguage

  
  const handleChange = (value) => {
    selectLanguage(value)
    i18n.changeLanguage(value)
    document.documentElement.lang = value
    if (value === 'he') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  };

  return (
    <div className={styles.header__language}>

      <Select
        defaultValue={getCityNameFromStore}
        className={styles.header__selectLanguage}
        bordered={false}
        onSelect={handleChange}
        options={[
          {
            value: 'en',
            label: 'EN',
          },
          {
            value: 'ua',
            label: 'UA',
          },
          {
            value: 'he',
            label: 'HE',
          },

        ]}
      />
    </div>
  )
}
