import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mergerAxios from '../../axios.js'


const CreateOrderForm = () => {

    const [orderName, setOrderName] = useState()
    const [apiError, setApiError] = useState('')
    const [showApiError, setShowApiError] = useState(false)

    const navigate = useNavigate();


    const cerateNewOrder = async (orderName) => {
        try {
            setApiError('')
            setShowApiError(false)
            const data = { name: orderName }
            const res = await mergerAxios.post('/orders/', data)
            const newOrder = res.data
            navigate(`/order/${newOrder.id}/`)

        } catch (error) {
            setApiError(error?.message || JSON.stringify(error))
            setShowApiError(true)

        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        cerateNewOrder(orderName)
    }


    return (
        <div className="m-10">
            <div className="mt-10 mb-10 p-10 border-2 border-dashed text-center place-items-center">
                <h2 className='mb-2'>Create a new merge</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="name for new merge"
                            className="input input-bordered input-neutral w-full max-w-xs"
                            onChange={e => setOrderName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button className="btn btn-outline btn-primary mt-3">Create</button>

                    </div>
                </form>
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
        </div>

    )
};
export default CreateOrderForm;

