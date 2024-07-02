import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../Context";

import { isAccessTokenExpired } from "../utils/auth";
import { baseURL } from "../utils/axios.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const { isLoggedIn, setIsLoggedIn } = useContext(CurrentUserContext);

    const navigate = useNavigate();
    const location = useLocation();
    const next = location.state?.from?.pathname || "/";

    useEffect(() => {
        const attemptRefresh = async () => {
            const refreshToken = Cookies.get("refresh_token");

            if (
                refreshToken !== null &&
                refreshToken !== "undefined" &&
                !isAccessTokenExpired(refreshToken)
            ) {
                const payload = { refresh: refreshToken };
                const { data } = await axios.post(
                    baseURL + "auth/jwt/refresh/",
                    payload
                );

                Cookies.set("access_token", data.access);
                setIsLoggedIn(true);
                toast.success("Refreshed login.")
                navigate(next, { replace: true });
            }
        };
        attemptRefresh();
    }, []);

    const doLogin = async (userLogin) => {
        const accessToken = Cookies.get("access_token");

        if (
            isAccessTokenExpired(accessToken) ||
            !accessToken ||
            accessToken === "undefined"
        ) {
            refreshAccessToken(userLogin);
        }

        setIsLoggedIn(true);
        toast.success("Logged in successfully!");
        navigate(next, { replace: true });
    };

    const refreshAccessToken = async (userLogin) => {
        const refreshToken = Cookies.get("refresh_token");

        if (
            refreshToken !== null &&
            refreshToken !== "undefined" &&
            !isAccessTokenExpired(refreshToken)
        ) {
            const payload = { refresh: refreshToken };
            try {
                // refresh access token
                const { data } = await axios.post(
                    baseURL + "auth/jwt/refresh/",
                    payload
                );

                Cookies.set("access_token", data.access);
                setIsLoggedIn(true);
                // return data.access;
            } catch (error) {
                console.log(`Error refreshing token: ${error.message}`);

                setErrorMessage(`Error refreshing token: ${error.message}`);
            }
        } else {
            createNewTokens(userLogin);
        }
    };

    const createNewTokens = async (userLogin) => {
        try {
            const { data } = await axios.post(
                baseURL + "auth/jwt/create/",
                userLogin
            );
            Cookies.set("access_token", data.access, { secure: true });
            Cookies.set("refresh_token", data.refresh);

            // return data.access;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log(
                        `Error creating new tokens ${error.response.data.detail}`
                    );
                    setErrorMessage(error.response.data.detail);
                }
            } else {
                console.log(error);
                setErrorMessage(error.message);
            }
        }
    };

    // const fetchUser = async (accessToken) => {
    //     try {
    //         const res = await axios.get(baseURL + "auth/users/me/", {
    //             headers: {
    //                 Authorization: "Bearer " + accessToken,
    //             },
    //         });

    //         if (res.status === 200) {
    //             setUser(res.data);
    //             // setIsLoggedIn(true);
    //             // toast.success("Logged in successfully!");
    //             // navigate(next, { replace: true });
    //         }
    //     } catch (error) {
    //         console.log("Error fetching user");
    //     }
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userLogin = {
            email: email,
            password: password,
        };
        doLogin(userLogin);
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <p className="py-6">
                            To keep each user's documents private, every user
                            must have an account.
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <span className="label-text-alt">
                                        Don't have account?
                                    </span>
                                    <Link
                                        to="/signup"
                                        className="label-text-alt link link-hover"
                                    >
                                        Signup
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="text-red-600">
                                    Erorr: {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
