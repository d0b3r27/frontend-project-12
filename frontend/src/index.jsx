import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import store from './slices/store.js'
import './utils/i18next.js'
import 'react-toastify/dist/ReactToastify.css'
import rollbarConfig from './utils/rollbar.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  </StrictMode>,
)
