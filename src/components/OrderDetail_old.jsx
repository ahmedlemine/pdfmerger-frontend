import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import mergerAxios from '../../axios'

import FileForm from './FileForm'


function OrderDetail() {
    // use empty Object as initial state to solve order undefined issue (seems like if type changes it won't get updated to fetched data)
    const [order, setOrder] = useState({})
    const [files, setFiles] = useState([])
    const [showAddFile, setShowAddFile] = useState(false)
    const [apiError, setApiError] = useState()
    const [loading, setLoading] = useState(true)
    const [downloadUrl, setDownloadUrl] = useState()
    const [showDownloadBtn, setShowDownloadBtn] = useState(false)
    const [showMergeBtn, setShowMergeBtn] = useState(files.length > 1)
    const [showApiError, setShowApiError] = useState()


    const { id } = useParams()
    const baseDownloadURL = 'http://localhost:8000/';



    useEffect(() => {
        const fetchOrders = async () => {
            const res = await mergerAxios.get(`/orders/${id}/`)
            setOrder(res.data)
            setFiles(res.data.pdf_files)
        }
        fetchOrders()
    }, [id])












    return (
        <>
            {!order?.is_merged ?
                <>
                    <div className="card w-100 bg-base-100 shadow-xl">
                        <div className="card-body">

                            <h2 className="card-title">Merge: {order.name ? order.name : 'untitled merge'}</h2>
                            <h5 className="">Files: {files.length}</h5>
                            <p>add at least 2 PDF files to merge.</p>

                            <div className='mt-2'>{files.map((f) => {
                                <p>;alskdjf;asldfjk;ljk</p>>
                                <div key={f.id} className="card w-96 bg-base-100 shadow-xl mt-2 mb-2 ">
                                    <div className="card-body">
                                        <div className="card-actions justify-end">

                                            <button onClick={() => deleteFile(f.id)} className="btn btn-square btn-sm ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                        <div className="w-20">
                                            <img alt="PDF file icon" src="/src/assets/pdf.png" />

                                        </div>
                                        <span className='justify-self-end'>{f.original_name !== '' ? f.original_name : 'untitled pdf'}</span>
                                    </div>
                                </div>

                            })}</div>

                            <div className="card-actions justify-end">

                                <button onClick={() => handleAddFile()} disabled={files.length >= 5} className="btn btn-outline ml-2">Add PDFs</button>
                                <button onClick={() => handleMerge(order)} disabled={!showMergeBtn} className="btn btn-outline">Merge</button>
                                <button onClick={() => handleDownload(order)} disabled={!showDownloadBtn} className="btn btn-neutral">Download</button>
                                
                                

                                {downloadUrl &&
                                    <div className='alert link link-info'><a target='_blank' href={baseDownloadURL + downloadUrl}>Download merged PDF</a></div>
                                }

                                {showApiError &&
                                    <div className="toast toast-top toast-center">

                                        <div className="alert alert-error">
                                            <svg onClick={() => dismissErrorMsg()}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>{apiError}</span>
                                        </div>
                                    </div>
                                }

                            </div>
                            {showAddFile &&
                                <div>
                                    <FileForm
                                        order={order}
                                        apiError={apiError}
                                        uploadFile={uploadFile} />
                                    <button onClick={() => setShowAddFile(false)} className="btn bnt-secondary mt-10">Done</button>
                                </div>
                            }
                        </div>
                    </div>
                </>
                :

                <>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Merge Complete</h2>
                            <p>Merge is complete. You can download the final merged PDF.</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleDownload(order)} className="btn btn-success btn-outline">Download1</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default OrderDetail