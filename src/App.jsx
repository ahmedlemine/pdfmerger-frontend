import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import CurrentUserContext from "./Context";

import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./components/ErrorPage";
import Hero from "./components/Hero";
import Login from "./components/Login";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import CreateOrderForm from "./components/CreateOrderForm";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

import Signup from "./components/Signup";

function App() {
    const { isLoggedIn, setIsLoggedIn, user, setUser } =
        useContext(CurrentUserContext);

    return (
        // <CurrentUserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Hero />} />

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                <Route
                    path="orders"
                    element={
                        <ProtectedRoute>
                            <OrderList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="create"
                    element={
                        <ProtectedRoute>
                            <CreateOrderForm />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="logout"
                    element={
                        <ProtectedRoute>
                            <Logout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="order/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetail />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
        // </CurrentUserContext.Provider>
    );
}

export default App;
