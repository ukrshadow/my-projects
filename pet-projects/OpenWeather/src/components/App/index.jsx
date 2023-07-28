import { Header } from "../Header"
import { Search } from "../Search"
import { WeatherLayout } from "../WeatherLayout"
import styles from './styles.module.scss'
import '../../i18n'

function App() {

  return ( 
   <>
      <header>
        <div className={styles.container}>
          <Header />
        </div>
      </header>
      <main>
        <div className={styles.container}>
          <Search />
          <WeatherLayout />
        </div>
      </main>
      </>
  )
}

export default App
