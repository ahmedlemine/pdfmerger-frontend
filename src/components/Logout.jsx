import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        setLoading(false)
        navigate('login')
    }, [])
  return (
    <>
    {loading ? (
        <h2>Signing out...</h2>
    ) : (
        <h2>Signed out.</h2>
    )}
    </>

  )
}

export default Logout