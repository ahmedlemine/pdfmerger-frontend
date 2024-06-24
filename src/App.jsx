import React, { useState, useEffect } from 'react'



import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import './App.css'
import axios from 'axios'
import mergerAxios from '../axios'

import MainLayout from './layouts/MainLayout';
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Login from './components/Login'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail';
import CreateOrderForm from './components/CreateOrderForm'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [hideHero, setHideHero] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)



  useEffect(() => {
    const fetchOrders = async () => {
      const res = await mergerAxios.get("/orders/")
      setOrders(res.data)
      setLoading(false)
    }

    fetchOrders()
  }, [])




  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='home' element={<Hero
          hideHero={hideHero}
          setHideHero={setHideHero}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm} />}
        />

        <Route path='create' element={<CreateOrderForm />} />
        <Route path='orders' element={<OrderList orders={orders} />} />
        <Route path='order/:id' element={<OrderDetail />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;


  // if(!loggedIn) {
  //   return <Login setLoggedIn={setLoggedIn}/>
  // }

  // return (
  //   <>
  //   <NavBar orders={orders}/>
  //   <Hero setShowAddForm={setShowAddForm} showAddForm={showAddForm}/>
  //   {showAddForm && <CreateOrderForm />}
  //   {loading ? 
  //     <span className="loading loading-spinner text-primary"></span>
  //   :
  //   <h1>Ordes go here</h1>
  //   }
    
    
  //   </>
  // )
}

export default App
