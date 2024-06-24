import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../axios'
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    // const navigate = useNavigate();


    // Login with JWT access/refresh token system:
    // 1- check cookies if there is an access token, if yes use it to login, if not =>
    // 2- check coockies if there is a refresh token, if yes use it to get new access token, if not =>
    // 3- use email/password to create a new set of tokens: access & refresh

    const doLogin = async (user) => {
        const refreshToken = Cookies.get('refresh_token')
        if(!refreshToken || refreshToken === 'undefined') {
            return createNewToken(user)
        }
        return refreshAccess(refreshToken)
    }

    const refreshAccess = async (refreshToken) => {
        const payload = { refresh: refreshToken }

        try {
            const { data } = await axios.post(baseURL + "auth/jwt/refresh/", payload)
            Cookies.set('access_token', data.access);
            Cookies.set('refresh_token', data.refresh);
            setLoggedIn(true)
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
            setLoggedIn(true)
            
            return data.access
        }
        catch (error) {
            setErrorMessage(error.message)
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }
        doLogin(user)
    }

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            To keep each user's documents private and secure, every user must have an account.
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
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {errorMessage &&
                            <p>{errorMessage}</p>
                        }
                    </div>
                </div>
            </div>

        </>
    )
};
export default Login;