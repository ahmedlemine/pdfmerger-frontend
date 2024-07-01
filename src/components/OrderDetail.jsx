import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import mergerAxios, { baseURL } from "../utils/axios.js";
import FileCard from "./FileCard";
import FileForm from "./FileForm";



const baseDownloadURL = "http://localhost:8000/";

const INITIAL_VIEW = {
    showAddFileBtn: false,
    showAddFilesMsg: false,
    showMergeBtn: false,
    showDownloadBtn: false,
    showDownloadURL: false,
};

const reducer = (viewState, { mode }) => {
    switch (mode) {
        case "FILES NOT ENOUGH":
            return {
                ...viewState,
                showAddFileBtn: true,
                showAddFilesMsg: true,
                showMergeBtn: false,
                showDownloadBtn: false,
            };
        case "ENOUGH FILES":
            return { ...viewState, showMergeBtn: true, showAddFileBtn: true };
        case "FIVE FILES":
            return {
                ...viewState,
                showAddFileBtn: false,
                showAddFilesMsg: false,
                showMergeBtn: true,
            };
        case "MERGED":
            return {
                ...viewState,
                showAddFileBtn: false,
                showAddFilesMsg: false,
                showMergeBtn: false,
                showDownloadBtn: true,
            };
        case "DOWNLOADED":
            return {
                ...viewState,
                showAddFileBtn: false,
                showAddFilesMsg: false,
                showDownloadURL: true,
            };
        default:
            return viewState;
    }
}

const OrderDetail = () => {
    const [viewState, dispatch] = useReducer(reducer, INITIAL_VIEW);
    // use empty Object as initial state to solve "order undefined" error (seems like if type changes, it won't get updated to fetched data)
    const [order, setOrder] = useState({});
    const [files, setFiles] = useState([]);
    const [shwoFileForm, setShowFileForm] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloadUrl, setDownloadUrl] = useState();
    const [showApiError, setShowApiError] = useState(false);
    const [uploadError, setUploadError] = useState('')

    const {
        showAddFileBtn,
        showAddFilesMsg,
        showMergeBtn,
        showDownloadBtn,
        showDownloadURL,
    } = viewState;

    const { id } = useParams();

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
        },
    };

    useEffect(() => {
        fetchOrder();
        setLoading(false)
    }, []);

    useEffect(() => {
        fetchFiles();
    }, []);

    useEffect(() => {
        if (files.length < 2) {
            dispatch({ mode: "FILES NOT ENOUGH" });
        }
        if (files.length >= 2) {
            dispatch({ mode: "ENOUGH FILES" });
        }
        if (files.length > 4) {
            dispatch({ mode: "FIVE FILES" });
            setShowFileForm(false);
        }
    }, [files]);

    const fetchOrder = async () => {
        try {
            setApiError('')

            const { data } = await axios.get(
                `${baseURL}orders/${id}/`,
                axiosConfig
            );
            setOrder(data);
            if (data.is_merged) {
                dispatch({ mode: "MERGED" });
            } else if (data.download_count > 0) {
                dispatch({ mode: "DOWNLOADED" });
            } else if (data.pdf_files.length > 1) {
                dispatch({ mode: "ENOUGH FILES" });
            } else {
                dispatch({ mode: "FILES NOT ENOUGH" });
            }
        } catch (error) {
            setShowApiError(true);
            if (error?.response?.status === 404) {
                setApiError("No order found with this ID.");
            } else {
                setApiError("Error: unable to fetch data from API");
                throw new Error(error);
            }
        }
    };

    const fetchFiles = async () => {
        try {
            setApiError('')
            const { data } = await axios.get(
                `${baseURL}orders/${id}/files/`,
                axiosConfig
            );
            setFiles(data);
        } catch (error) {
            setShowApiError(true);
            if (error?.response?.status === 404) {
                setApiError("No order found with this ID.");
            } else {
                setApiError("Error: unable to fetch data from API");
                throw new Error(error);
            }
        }
    };

    const deleteFile = async (id) => {
        try {
            setApiError('')
            setShowApiError(false)
            await axios.delete(
                `${baseURL}files/${id}/delete/`,
                axiosConfig
            );
            setFiles(files.filter((f) => f.id !== id));
            fetchFiles();
            toast.success("file deleted!");
            if (files.length < 2) {
                dispatch({ mode: "FILES NOT ENOUGH" });
            }
        } catch (error) {
            setShowApiError(true);
            if (error.response?.status === 404) {
                setApiError("file doesn't exist.");
            } else {
                console.error(error);
            }
        }
    };

    const uploadFile = async (pdf, orderId) => {
        try {
            setLoading(true)
            setUploadError('')
            setShowApiError(false);
            const newFile = await axios({
                method: "post",
                url: `${baseURL}orders/${orderId}/add_files/`,
                headers: {
                    Authorization: "Bearer " + Cookies.get("access_token"),
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    file: pdf,
                },
            });

            setLoading(false)

            setFiles([...files, newFile]);
            
            fetchFiles();

            if (files.length >= 2) {
                dispatch({ mode: "ENOUGH FILES" });
            }
            if (files.length > 4) {
                setShowFileForm(false);
                dispatch({ mode: "FIVE FILES" });
            }
        } catch (error) {
            setUploadError("");
            if (error.response) {
                if (error?.response?.status === 400) {
                    // console.log(error?.response?.data.detail);
                    setUploadError(
                        error.response.data.error || error.response.data.file
                    );
                } else if (error.response.status === 401) {
                    setUploadError(
                        "Not authorized. Please check you're logged in."
                    );
                    console.error(error.response.data.detail);
                } else if (error.response.status === 403) {
                    setUploadError(error.response.data.detail);
                    console.error(error.response.data.detail);
                }
            } else if (error.request) {
                setUploadError(error.request);
            } else {
                setUploadError(error.message);
            }
        } finally {
            setLoading(false)
        }
    };

    const mergeOrder = async (orderId) => {
        if (files.length < 2) {
            setShowApiError(true);
            setApiError(
                "not enough PDFs to merge. Please add at least 2 PDF files."
            );
            return;
        }

        try {
            setApiError('')
            setShowApiError(false);
            setShowFileForm(false);
            await axios.get(`${baseURL}orders/${orderId}/merge/`, axiosConfig);
            dispatch({ mode: "MERGED" });
            toast.success("merge completed!");
            fetchOrder();
        } catch (error) {
            setShowApiError(true);
            if (error.response.status === 400) {
                setApiError(error.response.data.error);
            }
            console.log(error);
        }
    };

    const downloadOrder = async (orderId) => {
        setShowApiError(false);
        setApiError('')

        await axios
            .get(`orders/${orderId}/download/`, axiosConfig)
            .then((res) => {
                setDownloadUrl(res.data.download_url);
                dispatch({ mode: "DOWNLOADED" });
            })
            .catch((error) => {
                setShowApiError(true);

                if (error.response.status === 400) {
                    setApiError(error.response.data.error);
                    setDownloadUrl(null);
                }
            });
    };

    const handleAddFile = () => {
        setShowFileForm((v) => !v);
    };

    const dismissErrorMsg = () => {
        setApiError("");
        setShowApiError(false);
    };

    if (order.is_merged) {
        return (
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Merge Complete</h2>
                    <p>
                        Merge <b>{order.name}</b> is complete. You can download
                        the final merged PDF.
                    </p>
                    <div className="card-actions justify-end">
                        <a
                            role="button"
                            className="btn btn-outline btn-success"
                            href={baseDownloadURL + order.download_url}
                            target="_blank"
                        >
                            Download merged PDF
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="card w-100 bg-base-100 shadow-xl mt-10">
                <div className="card-body">
                    <h2 className="card-title">
                        Merge: {order.name || "untitled order"}
                        <span>({files.length} files)</span>
                    </h2>
                    <div className="mt-2 mb-2 items-center gap-1">
                        {files.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                deleteFile={deleteFile}
                            />
                        ))}
                    </div>
                    {showAddFilesMsg && (
                        <p>Add at least 2 PDFs to merge (max 5 PDFs).</p>
                    )}
                    <div className="card-actions justify-end">
                        <button
                            onClick={() => handleAddFile()}
                            disabled={!showAddFileBtn}
                            className="btn btn-outline btn-primary ml-2"
                        >
                            {!shwoFileForm ? "Add PDFs" : "done adding PDFs?"}
                        </button>
                        <button
                            onClick={() => mergeOrder(order.id)}
                            disabled={!showMergeBtn}
                            className="btn btn-outline"
                        >
                            Merge
                        </button>
                        <button
                            onClick={() => downloadOrder(order.id)}
                            disabled={!showDownloadBtn}
                            className="btn btn-neutral"
                        >
                            Download
                        </button>
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
                    </div>
                </div>
            </div>
            {showDownloadURL && (
                <div className="alert link link-info">
                    <a href={baseDownloadURL + downloadUrl}>
                        Download merged PDF
                    </a>
                </div>
            )}
            {shwoFileForm && (
                <FileForm
                    uploadFile={uploadFile}
                    order={order}
                    apiError={apiError}
                    loading={loading}
                    uploadError={uploadError}
                    setUploadError={setUploadError}
                />
            )}
        </>
    );
}

export default OrderDetail;