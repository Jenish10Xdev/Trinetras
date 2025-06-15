import nodemailer from 'nodemailer';

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send welcome email
export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Trinetras!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Welcome to Trinetras!</h1>
                    <p>Dear ${name},</p>
                    <p>Thank you for creating an account with us. We're excited to have you on board!</p>
                    <p>With your account, you can:</p>
                    <ul>
                        <li>Browse our products</li>
                        <li>Add items to your cart</li>
                        <li>Track your orders</li>
                        <li>And much more!</li>
                    </ul>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best regards,<br>The Trinetras Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
};

// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (email, name, orderDetails) => {
    try {
        const { items, amount, address, orderId, date } = orderDetails;
        
        // Format the date
        const orderDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create HTML for order items
        const itemsHtml = items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Order Confirmation - Trinetras',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Order Confirmation</h1>
                    <p>Dear ${name},</p>
                    <p>Thank you for your order! We're pleased to confirm that we've received your order.</p>
                    
                    <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #333; margin-top: 0;">Order Details</h2>
                        <p><strong>Order ID:</strong> ${orderId}</p>
                        <p><strong>Order Date:</strong> ${orderDate}</p>
                        
                        <h3 style="color: #333;">Shipping Address:</h3>
                        <p>
                            ${address.firstName} ${address.lastName}<br>
                            ${address.street}<br>
                            ${address.city}, ${address.state} ${address.zipcode}<br>
                            ${address.country}
                        </p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 10px; text-align: left;">Product</th>
                                <th style="padding: 10px; text-align: left;">Quantity</th>
                                <th style="padding: 10px; text-align: left;">Price</th>
                                <th style="padding: 10px; text-align: left;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
                                <td style="padding: 10px;"><strong>$${amount.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>

                    <p>We'll notify you when your order ships.</p>
                    <p>If you have any questions about your order, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>The Trinetras Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};

// Function to send order tracking status email
export const sendOrderTrackingEmail = async (email, name, orderDetails) => {
    try {
        const { orderId, status, items, trackingNumber, estimatedDelivery } = orderDetails;
        
        // Format the date
        const deliveryDate = estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'To be determined';

        // Get status-specific message
        const getStatusMessage = (status) => {
            switch(status.toLowerCase()) {
                case 'processing':
                    return 'Your order is being processed and prepared for shipping.';
                case 'shipped':
                    return `Your order has been shipped! Tracking number: ${trackingNumber || 'Not available yet'}`;
                case 'delivered':
                    return 'Your order has been delivered!';
                case 'cancelled':
                    return 'Your order has been cancelled.';
                default:
                    return 'Your order status has been updated.';
            }
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Order Status Update - ${status}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Order Status Update</h1>
                    <p>Dear ${name},</p>
                    
                    <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9;">
                        <h2 style="color: #333; margin-top: 0;">Order Information</h2>
                        <p><strong>Order ID:</strong> ${orderId}</p>
                        <p><strong>Status:</strong> <span style="color: #2e7d32; font-weight: bold;">${status}</span></p>
                        ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
                        <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Status Update</h3>
                        <p>${getStatusMessage(status)}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #f5f5f5;">
                                    <th style="padding: 10px; text-align: left;">Product</th>
                                    <th style="padding: 10px; text-align: left;">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(item => `
                                    <tr>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <p>You can track your order status anytime by logging into your account.</p>
                    <p>If you have any questions about your order, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>The Trinetras Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Order tracking email sent successfully');
    } catch (error) {
        console.error('Error sending order tracking email:', error);
        throw error;
    }
}; 