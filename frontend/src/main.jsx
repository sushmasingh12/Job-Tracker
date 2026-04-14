import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider} from "react-router-dom"
import { Provider } from "react-redux"
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './App.css'
import { router } from './app/Routes'
import store from './app/store'
import ErrorBoundary from './shared/components/ErrorBoundary';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider> 
        <Provider store={store}>
          <RouterProvider router={router}/>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
    
  </StrictMode>
)
