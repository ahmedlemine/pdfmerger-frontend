import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../Context';

import { baseURL } from '../../axios'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const { isLoggedIn, setIsLoggedIn, setUser } = useContext(CurrentUserContext)

    const navigate = useNavigate();


    // Login with JWT access/refresh token system:
    // 1- check cookies if there is an access token, if yes use it to login, if not =>
    // 2- check coockies if there is a refresh token, if yes use it to get new access token, if not =>
    // 3- use email/password to create a new set of tokens: access & refresh

    const doLogin = async (user) => {
        const refreshToken = Cookies.get('refresh_token')
        if (!refreshToken || refreshToken === 'undefined') {
            return createNewToken(user)
        }

        refreshAccess(refreshToken)
        getUser()
        
        setIsLoggedIn(true)
        
        toast.success("Logged in successfully!")
        navigate('/', { replace: true })
    }

    const refreshAccess = async (refreshToken) => {
        const payload = { refresh: refreshToken }

        try {
            const { data } = await axios.post(baseURL + "auth/jwt/refresh/", payload)
            Cookies.set('access_token', data.access);
            return data.access
        }
        catch (error) {
            setErrorMessage(error.message)
        }
    }


    const createNewToken = async (user) => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/auth/jwt/create/", user)
            Cookies.set('access_token', data.access);
            Cookies.set('refresh_token', data.refresh);
            setIsLoggedIn(true)
            navigate('/')


            return data.access
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log(error.response.data.detail)
                    setErrorMessage(error.response.data.detail)
                }
            } else {
                console.log(error)
                setErrorMessage(error.message)
            }

        }
    }



    const getUser = async () => {
        try {
          const res = await mergerAxios.get('/auth/users/me/')
          console.log(res.data)
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


    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }
        doLogin(user)
    }

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <p className="py-6">
                            To keep each user's documents private, every user must have an account.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email" placeholder="email" className="input input-bordered" required autoFocus />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <span className='label-text-alt'>
                                        Don't have account?
                                    </span>
                                    <Link to="/signup" className="label-text-alt link link-hover">Signup</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            {errorMessage &&
                                <p className='text-red-600'>Erorr: {errorMessage}</p>
                            }
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
};
export default Login;