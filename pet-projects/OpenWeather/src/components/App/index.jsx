import { Header } from '../Header'
import { Search } from '../Search'
import { WeatherList } from '../WeatherList'
import styles from './styles.module.scss'
import '../../i18n'

function App() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <Search />
          <WeatherList />
        </div>
      </main>
    </>
  )
}

export default App
