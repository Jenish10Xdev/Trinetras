import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const updateStockStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'In Stock' ? 'Out of Stock' : 'In Stock';
      const response = await axios.post(backendUrl + '/api/product/status', { id, status: newStatus }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list to show updated status
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating stock status: ' + error.message);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Type</b>
          <b>Price</b>
          <b>Status</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Product List ------ */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.subCategory}</p>
              <p>{currency}{item.price}</p>
              <p className={`font-medium ${item.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>{item.status}</p>
              <div className='flex gap-2 justify-center'>
                <button onClick={() => updateStockStatus(item._id, item.status)} className={`px-3 py-1 rounded text-white text-xs ${item.status === 'In Stock' ? 'bg-red-500' : 'bg-green-500'}`}>
                  {item.status === 'In Stock' ? 'Out of Stock' : 'In Stock'}
                </button>
                <p onClick={()=>removeProduct(item._id)} className='cursor-pointer text-lg'>X</p>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List