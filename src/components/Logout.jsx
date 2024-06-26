import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { MergerContext } from '../Context';
import { toast } from 'react-toastify';

function Logout() {

  const { setIsLoggedIn, setUser } = useContext(MergerContext)

  const navigate = useNavigate()

  const logOut = () => {
      setUser({})
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      setIsLoggedIn(false)
      toast.success("Logged out successfully")
      navigate("/login")
  }



  return (
    <>
    <div className='card bg-base-100 max-w-sm shrink-0 shadow-2xl place-items-center'>

      <h2>Logout?</h2>
      <button onClick={() => logOut()} className='btn btn-primary'>Logout</button>
    </div>

    </>

  )
}

export default Logout