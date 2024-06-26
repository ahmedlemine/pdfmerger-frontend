import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import mergerAxios from '../../axios.js'

// import FileForm from './FileForm';

const CreateOrderForm = () => {

    const [orderName, setOrderName] = useState()


    const navigate = useNavigate();


    const cerateNewOrder = async (orderName) => {
        const data = { name: orderName }
        const res = await mergerAxios.post('/orders/', data)
        const newOrder = res.data
        toast.success("merge created!")   
        navigate(`/order/${newOrder.id}/`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        cerateNewOrder(orderName)
    }


    return (
        <div className="m-10">
            <div className="mt-10 mb-10 p-10 bg-base-200 text-center place-items-center">
                <h2 className='mb-2'>Create a new merge</h2>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="name for new merge"
                            className="input input-bordered input-neutral w-full max-w-xs"
                            onChange={e => setOrderName(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-outline btn-primary mt-3">Create</button>
                        
                    </div>
                </form>
                
            </div>
        </div>

    )
};
export default CreateOrderForm;

