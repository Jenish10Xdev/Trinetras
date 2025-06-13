import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, forgotPassword, resetPassword } from '../controllers/userController.js';
import { sendWelcomeEmail } from '../utils/emailService.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

// Test email route
userRouter.post('/test-email', async (req, res) => {
    try {
        const { email, name } = req.body;
        await sendWelcomeEmail(email, name);
        res.json({ success: true, message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Error in test email route:', error);
        res.json({ success: false, message: error.message });
    }
});

// Auth routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

// Profile routes
userRouter.post('/profile', authUser, getUserProfile);
userRouter.post('/update-profile', authUser, updateUserProfile);

export default userRouter;