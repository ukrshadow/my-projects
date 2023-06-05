import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/App"
import './index.css'
import { ThemeProvider } from './components/ThemeSwitcher/themeContext'
import { Provider } from 'react-redux'
import { store } from './Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
