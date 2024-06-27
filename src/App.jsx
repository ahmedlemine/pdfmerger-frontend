import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';

import './App.css'
import mergerAxios from '../axios';

import MainLayout from './layouts/MainLayout';
import ErrorPage from './components/ErrorPage';
import Hero from './components/Hero'
import Login from './components/Login'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail';
import CreateOrderForm from './components/CreateOrderForm'
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';

import { CurrentUserContext } from './Context';
import Signup from './components/Signup';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('access_token') ? true : false)
  const [user, setUser] = useState({}) // set initial value to {}. If set to null or not set, will throw error that user is null/undefined


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await mergerAxios.get('/auth/users/me/')
        setUser(res.data)

      } catch (error) {
        if (error.response.status === 401) {
          console.error(error)
          // console.error(error.response.data.detail)
          setUser({})
          setIsLoggedIn(false)
        } else {
          console.error(error)
          setUser({})
          setIsLoggedIn(false)
        }
      }
      return () => {
        setUser({})
      }

    };
    getUser()
  }, [isLoggedIn])


  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, setIsLoggedIn , user, setUser}}>
      <BrowserRouter>
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
      </BrowserRouter>
    </CurrentUserContext.Provider>
  )
}

export default App
