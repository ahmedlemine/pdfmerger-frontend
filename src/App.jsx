import React, { useState, useEffect } from 'react'
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

import { MergerContext } from './Context';
import Signup from './components/Signup';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('access_token') ? true : false)
  const [user, setUser] = useState({}) // set initial value to {}. If set to null or not set, will throw error that user is null/undefined

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await mergerAxios.get('/auth/users/me/')
        console.log(res)
        setUser(res.data)

      } catch (error) {
        if (error.response.status === 401) {
          console.error(error)

          setIsLoggedIn(false)
        } else {
          console.error(error)
        }
      }

    };
    getUser()
  }, [])


  return (
    <MergerContext.Provider value={{ isLoggedIn, setIsLoggedIn , user, setUser}}>
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
    </MergerContext.Provider>
  )
}

export default App
