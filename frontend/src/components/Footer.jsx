import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo2} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Trinetras Stones is a platform dedicated to providing a wide range of natural stones and spiritual accessories. We offer a curated selection of high-quality products that are ethically sourced and spiritually meaningful. Our mission is to empower individuals by offering products that promote wellness, beauty, and spiritual growth.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href='/' className='hover:text-black hover:underline transition-colors'>Home</a></li>
                <li><a href='/about' className='hover:text-black hover:underline transition-colors'>About us</a></li>
                <li><a href='/delivery' className='hover:text-black hover:underline transition-colors'>Delivery</a></li>
                <li><a href='/privacy-policy' className='hover:text-black hover:underline transition-colors'>Privacy policy</a></li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Phone:-6357057750</li>
                <li>Gmail:-trinetrasstones09@gmail.com</li>
                <li>insta:-trinetrasstones</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2025 Trinetras - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
