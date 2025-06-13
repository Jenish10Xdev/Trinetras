import React from 'react';
import Title from '../components/Title';

const PrivacyPolicy = () => (
  <div className='max-w-3xl mx-auto py-12 px-4 text-gray-800'>
    <div className='text-center mb-8'>
      <Title text1={'PRIVACY'} text2={'POLICY'} />
    </div>
    <h2 className='text-xl font-semibold mb-4'>Your Privacy Matters</h2>
    <p className='mb-4'>
      At Trinetras, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. By using our site, you consent to the practices described in this policy.
    </p>
    <h3 className='font-semibold mb-2'>Information We Collect</h3>
    <ul className='list-disc ml-6 mb-4'>
      <li>Personal identification information (Name, email address, phone number, etc.)</li>
      <li>Order and payment information</li>
      <li>Usage data and cookies</li>
    </ul>
    <h3 className='font-semibold mb-2'>How We Use Your Information</h3>
    <ul className='list-disc ml-6 mb-4'>
      <li>To process and fulfill your orders</li>
      <li>To improve our website and services</li>
      <li>To communicate with you about your orders or promotions</li>
      <li>To comply with legal obligations</li>
    </ul>
    <h3 className='font-semibold mb-2'>How We Protect Your Information</h3>
    <p className='mb-4'>
      We implement a variety of security measures to maintain the safety of your personal information. Your data is stored securely and is only accessible by authorized personnel.
    </p>
    <h3 className='font-semibold mb-2'>Third-Party Disclosure</h3>
    <p className='mb-4'>
      We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services or comply with the law.
    </p>
    <h3 className='font-semibold mb-2'>Your Consent</h3>
    <p className='mb-4'>
      By using our website, you consent to our privacy policy.
    </p>
    <h3 className='font-semibold mb-2'>Changes to This Policy</h3>
    <p className='mb-4'>
      We may update our Privacy Policy from time to time. Any changes will be posted on this page.
    </p>
    <h3 className='font-semibold mb-2'>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us.</p>
  </div>
);

export default PrivacyPolicy; 