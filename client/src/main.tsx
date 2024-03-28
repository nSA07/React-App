import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Header } from './components/Header/Header.tsx'
import { Provider } from 'react-redux'
import { store } from './redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Header />
    <App />
    <Toaster />
  </Provider>,
)
