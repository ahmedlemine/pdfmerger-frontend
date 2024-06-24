import React from 'react'

function OrderList({ orders }) {
  
  return (
    <>
    <h1>Orders</h1>
    {orders.map((order) => (
        <p key={order.id}>{order.name}</p>
    ))}
    </>
    
  )
}

export default OrderList