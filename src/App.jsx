import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


import './App.css'
import CurrentUserContext from './Context';
import { isAccessTokenExpired } from './utils/auth';


import MainLayout from './layouts/MainLayout';
import ErrorPage from './components/ErrorPage';
import Hero from './components/Hero'
import Login from './components/Login'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail';
import CreateOrderForm from './components/CreateOrderForm'
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';

import Signup from './components/Signup';



function App() {

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(CurrentUserContext)
  // const accessToken = Cookies.get('access_token')


  // const navigate = useNavigate()
  // const location = useLocation()



  // // useEffect(() => {
  // //   if (!accessToken || isAccessTokenExpired) {
  // //     // navigate('/login', { state: { from: location } })
  // //     console.log("no accessToken")
  // //   }
  // // }, [isLoggedIn])
  
  useEffect(() => {
    const getUser = async () => {
      let config = {
        method: 'get',
        headers: {
          "Authorization": "Bearer " + Cookies.get('access_token'),
          "content-type": "application/json"
        }
      }
      try {
        const res = await fetch('http://localhost:8000/api/v1/auth/users/me/', config)
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json()
        // console.log("data from fetch inside useEffect in conext: ", data)

        // console.log(data)
        setUser(data)
      } catch (error) {
        console.error("Fetch error: ", error.message);
      }

    };

    getUser()

  }, [])



  return (
    // <CurrentUserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Hero />}
        />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />


        <Route path="orders" element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        } />

        <Route path='create' element={
          <ProtectedRoute>
            <CreateOrderForm />
          </ProtectedRoute>
        } />

        <Route path="logout" element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>

        } />
        <Route path="order/:id" element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        } />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    // </CurrentUserContext.Provider>
  )
}

export default App
