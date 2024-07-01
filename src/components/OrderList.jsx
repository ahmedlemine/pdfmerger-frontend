import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FaCheckCircle, FaPen, FaTimes, FaTrash } from "react-icons/fa";
import { baseURL } from "../../axios";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [showApiError, setShowApiError] = useState(false);

    const navigate = useNavigate();

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
        },
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(baseURL + "orders/", axiosConfig);
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                setShowApiError(true);
                setApiError("");
                if (error.response) {
                    if (error.response.status === 401) {
                        setApiError(
                            "Not authorized. Please check you're logged in."
                        );
                        console.error(error.response.data.detail);
                    } else if (error.response.status === 403) {
                        setApiError(error.response.data.detail);
                        console.error(error.response.data.detail);
                    }
                } else if (error.request) {
                    setApiError(error.request);
                } else {
                    setApiError(error.message);
                }
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${baseURL}orders/${id}/`, axiosConfig);
            setOrders(orders.filter((order) => order.id !== id));
            toast.success("Merge deleted!");
        } catch (error) {
            setShowApiError(true);
            if (error.response.status === 404) {
                setApiError("file doesn't exist.");
            } else if (error.response.status === 401) {
                setApiError(
                    "Not authorized. Please make sure you're logged in."
                );
            } else {
                console.error(error);
            }
        }
    };

    const handleDelete = (orderId) => {
        window.confirm("Are you sure you want to delete this merge?");
        if (!confirm) return;

        deleteOrder(orderId);
    };

    const getDate = (date) => {
        return new Date(date).toDateString();
    };

    const dismissErrorMsg = () => {
        setApiError("");
        setShowApiError(false);
    };

    return (
        <>
            {loading ? (
                <div className="flex place-content-center mt-2 mb-2">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            ) : (
                <>
                    {showApiError && (
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-error">
                                <svg
                                    onClick={() => dismissErrorMsg()}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{apiError}</span>
                            </div>
                        </div>
                    )}
                    {orders.length ? (
                        <>
                            <h1 className="text-2xl font-bold mb-4 text-center">
                                My Merges ({orders.length})
                            </h1>
                            <div className="overflow-x-auto m-5">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created On</th>
                                            <th>Merged?</th>
                                            <th>Downloads</th>
                                            <th>PDF files</th>
                                            <th>Manage</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.name}</td>
                                                <td>
                                                    {getDate(order.created_on)}
                                                </td>
                                                <td
                                                    className={
                                                        order.is_merged
                                                            ? "text-green-600"
                                                            : ""
                                                    }
                                                >
                                                    {order.is_merged ? (
                                                        <FaCheckCircle />
                                                    ) : (
                                                        "No"
                                                    )}
                                                </td>
                                                <td>{order.download_count}</td>
                                                <td>
                                                    {order.pdf_files &&
                                                        order.pdf_files.length}
                                                </td>

                                                <td>
                                                    <Link
                                                        to={`/order/${order.id}/`}
                                                    >
                                                        <FaPen />
                                                    </Link>
                                                </td>
                                                <td
                                                    className="text-red-400"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleDelete(order.id)
                                                    }
                                                >
                                                    <FaTrash />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="min-h-screen">
                            <div className="card bg-base-200 border-2 border-dashed grid m-20 min-h-80 min-w-96 place-items-center">
                                <p>No merges yet.</p>
                                <Link
                                    to="/create"
                                    className="btn btn-primary mr-2"
                                >
                                    Create New Merge
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default OrderList;
