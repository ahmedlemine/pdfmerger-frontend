import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../Context";

import { baseURL } from "../utils/axios.js";
import { FaTimes } from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);

    const { isLoggedIn, setUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const doSignup = async (newUser) => {
        setUser({});
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        try {
            await axios.post(baseURL + "auth/users/", newUser);
            toast.success("Successfully signed up. Please login now.");
            navigate("/login");
        } catch (error) {
            if (error?.response) {
                if (error?.response?.status === 400) {
                    const errorObject = error.response.data;
                    setErrorMessage(errorObject);
                }
            } else {
                console.log(error);
            }
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            password: password,
        };
        doSignup(newUser);
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                        <p className="py-6">
                            To keep each user's documents private, every user
                            must have an account.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered"
                                    required
                                    autoFocus
                                />
                            </div>
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
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                            {errorMessage && (
                                <ul className="list-desc">
                                    {Object.entries(errorMessage).map(
                                        ([key, field]) => (
                                            <li key={key}>
                                                {key.toUpperCase()}: <ol className="text-red-600 list">{field.map(err => (
                                                     <li key={err}>- {err}</li>
                                                     
                                                ))}
                                                </ol>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;
