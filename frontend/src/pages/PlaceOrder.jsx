import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    // const initPay = (order) => {
    //     const options = {
    //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    //         amount: order.amount,
    //         currency: order.currency,
    //         name:'Order Payment',
    //         description:'Order Payment',
    //         order_id: order.id,
    //         receipt: order.receipt,
    //         handler: async (response) => {
    //             console.log(response)
    //             try {
    //                 const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
    //                 if (data.success) {
    //                     navigate('/orders')
    //                     setCartItems({})
    //                 }
    //             } catch (error) {
    //                 console.log(error)
    //                 toast.error(error)
    //             }
    //         }
    //     }
    //     const rzp = new window.Razorpay(options)
    //     rzp.open()
    // }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            // Prevent order if cart is empty
            if (orderItems.length === 0) {
                toast.error("Your cart is empty. Please add items before placing an order.");
                return;
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                // case 'stripe':
                //     const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                //     if (responseStripe.data.success) {
                //         const {session_url} = responseStripe.data
                //         window.location.replace(session_url)
                //     } else {
                //         toast.error(responseStripe.data.message)
                //     }
                //     break;

                // case 'razorpay':
                //     const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                //     if (responseRazorpay.data.success) {
                //         initPay(responseRazorpay.data.order)
                //     }
                //     break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'CART'} text2={'TOTALS'} />
                </div>
                <CartTotal />
                <div className='mt-3 mb-2'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                        <img className='h-5' src={assets.cod_icon} alt="" />
                        <p>Cash On Delivery</p>
                    </div>
                    {/* <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        <p>Stripe</p>
                    </div>
                    <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        <p>Razorpay</p>
                    </div> */}
                </div>
                <div className='w-full text-end mt-8'>
                    <button onClick={onSubmitHandler} className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800'>Place Order</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
