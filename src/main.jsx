import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CalendarApp } from './CalendarApp.jsx';
import { store } from './store/store.js';
import './styles.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store ={store}>
    <BrowserRouter  future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
          }} >
        <CalendarApp />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
)
