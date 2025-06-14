import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [trackingInfo, setTrackingInfo] = useState({})

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value,
          trackingNumber: trackingInfo[orderId]?.trackingNumber,
          estimatedDelivery: trackingInfo[orderId]?.estimatedDelivery
        },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order status updated successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleTrackingInfoChange = (orderId, field, value) => {
    setTrackingInfo(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value
      }
    }))
  }

  const deleteOrderHandler = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axios.post(backendUrl + '/api/order/delete', { orderId }, { headers: { token } });
        if (response.data.success) {
          toast.success('Order deleted successfully');
          await fetchAllOrders();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span> </p>
                    }
                    else {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <div className='flex flex-col gap-2'>
                <select 
                  onChange={(event) => statusHandler(event, order._id)} 
                  value={order.status} 
                  className='p-2 font-semibold'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
                {(order.status === 'Shipped' || order.status === 'Out for delivery') && (
                  <>
                    <input
                      type="text"
                      placeholder="Tracking Number"
                      value={trackingInfo[order._id]?.trackingNumber || order.trackingNumber || ''}
                      onChange={(e) => handleTrackingInfoChange(order._id, 'trackingNumber', e.target.value)}
                      className='p-2 border rounded'
                    />
                    <input
                      type="date"
                      value={trackingInfo[order._id]?.estimatedDelivery || (order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : '')}
                      onChange={(e) => handleTrackingInfoChange(order._id, 'estimatedDelivery', e.target.value)}
                      className='p-2 border rounded'
                    />
                  </>
                )}
                <button 
                  onClick={() => deleteOrderHandler(order._id)}
                  className='bg-red-500 text-white font-light px-4 py-2 mt-2 rounded'
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders