import React, {
  useState,
  useEffect,
} from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import MainLayout from './layouts/MainLayout';
import ErrorPage from './components/ErrorPage';
import Hero from './components/Hero'
import Login from './components/Login'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail';
import CreateOrderForm from './components/CreateOrderForm'
import Logout from './components/Logout';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [hideHero, setHideHero] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Hero
            hideHero={hideHero}
            setHideHero={setHideHero}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm} />}
          />
          <Route path="orders" element={<OrderList orders={orders}/>} />
          <Route path='create' element={<CreateOrderForm />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
