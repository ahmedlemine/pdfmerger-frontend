import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { FaCheckCircle, FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import mergerAxios from '../../axios'


function OrderList() {
  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();



  useEffect(() => {
    const fetchOrders = async () => {
      const res = await mergerAxios.get("/orders/")
      setOrders(res.data)
      setLoading(false)
    }

    fetchOrders()
  }, [])




  const deleteOrder = async (id) => {
    await mergerAxios.delete(`/orders/${id}`)
    setOrders(orders.filter((order) => order.id !== id))
    toast.success("Merge deleted!")
  }


  const handleDelete = (orderId) => {
    window.confirm("Are you sure you want to delete this merge?")
    if (!confirm) return;

    deleteOrder(orderId)

  }


  const getDate = (date) => {
    return new Date(date).toDateString()
  }

  return (
    <>
      {loading ? (
        <div className="loading loading-spinner text-primary text-xl"></div>
      ) : (
        <>
          {orders.length ? (


            <>
              <h1 className='text-2xl font-bold mb-4 text-center'>My Merges</h1>
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
                    {
                      orders.map(order =>
                        <tr key={order.id}>
                          <td>{order.name}</td>
                          <td>{getDate(order.created_on)}</td>
                          <td className={order.is_merged ? "text-green-600" : ""} >{order.is_merged ? <FaCheckCircle /> : "No"}</td>
                          <td>{order.download_count}</td>
                          <td>{order.pdf_files && order.pdf_files.length}</td>

                          <td>
                            <Link to={`/order/${order.id}/`}><FaPen /></Link>
                          </td>
                          <td className="text-red-400" style={{ cursor: 'pointer' }} onClick={() => handleDelete(order.id)}><FaTrash /></td>

                        </tr>

                      )
                    }


                  </tbody>
                </table>

              </div>
            </>
          ) : (
            <div className='min-h-screen'>
              <div className="card bg-base-200 border-2 border-dashed grid m-20 min-h-80 min-w-96 place-items-center">
                <p>No merges yet.</p>
                <Link to='/create' className="btn btn-primary mr-2">Create New Merge</Link>
              </div>
            </div>

          )}


        </>)
      }
    </>

  )
}

export default OrderList