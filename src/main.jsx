import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { CurrentUserProvider } from './Context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)