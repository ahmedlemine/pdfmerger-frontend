import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'




import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderDetail from "./components/OrderDetail";
import Login from "./components/Login";
import Logout from "./components/Logout";
import OrderList from "./components/OrderList";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./components/ErrorPage";
import Hero from "./components/Hero";
import CreateOrderForm from './components/CreateOrderForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)