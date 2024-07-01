import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import CurrentUserContext from '../Context';
import { toast } from 'react-toastify';

function Logout() {

  const { setIsLoggedIn, user, setUser } = useContext(CurrentUserContext)

  const navigate = useNavigate()

  const logOut = () => {
    
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')

    setIsLoggedIn(false)
    
    // toast.success("Logged out successfully")
    navigate("/login")
  }



  return (
      <div className="flex items-center justify-center">

        <div className="card w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Logout</h2>
            <p>Logout of the app?</p>

            <div className="card-actions justify-end">
              <button onClick={() => logOut()} className='btn btn-primary'>Logout</button>
            </div>
          </div>
        </div>

      </div>
  )
}

export default Logout