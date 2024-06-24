import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import mergerAxios from '../../axios'


function OrderDetail() {
    const [order, setOrder] = useState({}) // use empty Object as initial state to solve order undefined issue (seems like if type changes it won't get updated to fetched data)

    const { id} = useParams()
    

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await mergerAxios.get(`/orders/${id}/`)
            setOrder(res.data)
        }
        fetchOrders()
    }, [])

    return (
        <div>
            <h1>Order Detail for {order.name}</h1>
            <p>{Date(order.created_on).toString()}</p>
            {/* <p>{JSON.stringify(order, 2, true)}</p> */}
        </div>
    )
}

export default OrderDetail