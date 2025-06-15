import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { sendOrderConfirmationEmail, sendOrderTrackingEmail } from "../utils/emailService.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'

// global variables
const deliveryCharge = 10;
// const currency = 'inr'

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };
        const newOrder = new orderModel(orderData);
        const savedOrder = await newOrder.save();
        
        // Get user details for email
        const user = await userModel.findById(userId);
        if (user) {
            try {
                await sendOrderConfirmationEmail(user.email, user.name, {
                    ...savedOrder.toObject(),
                    orderId: savedOrder._id
                });
            } catch (emailError) {
                console.error('Error sending order confirmation email:', emailError);
                // Continue with order placement even if email fails
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//
//// // Placing orders using Stripe Method
//// const placeOrderStripe = async (req,res) => { ... }
//
//// // Verify Stripe
//// const verifyStripe = async (req,res) => { ... }
//
//// // Placing orders using Razorpay Method
//// const placeOrderRazorpay = async (req,res) => { ... }
//
//// // Verify Razorpay
// const verifyRazorpay = async (req,res) => { ... }

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status, trackingNumber, estimatedDelivery } = req.body;

        // Prepare update data
        const updateData = { status };
        if (trackingNumber) updateData.trackingNumber = trackingNumber;
        if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);

        // Update order status and tracking info
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            updateData,
            { new: true } // This returns the updated document
        );

        if (updatedOrder) {
            // Get user details for email
            const user = await userModel.findById(updatedOrder.userId);
            if (user) {
                try {
                    await sendOrderTrackingEmail(user.email, user.name, {
                        orderId: updatedOrder._id,
                        status: updatedOrder.status,
                        items: updatedOrder.items,
                        trackingNumber: updatedOrder.trackingNumber,
                        estimatedDelivery: updatedOrder.estimatedDelivery
                    });
                } catch (emailError) {
                    console.error('Error sending order tracking email:', emailError);
                    // Continue with status update even if email fails
                }
            }
        }

        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Add deleteOrder function
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (deletedOrder) {
            res.json({ success: true, message: 'Order deleted successfully' });
        } else {
            res.json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    // verifyRazorpay,
    // verifyStripe,
    placeOrder,
    // placeOrderStripe,
    // placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    deleteOrder
};