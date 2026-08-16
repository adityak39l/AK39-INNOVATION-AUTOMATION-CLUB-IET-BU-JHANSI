const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Application = require('./models/Application');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@cluster0.mongodb.net/iac_db?retryWrites=true&w=majority';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'iac_admin_secret_key_2026';

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB Atlas Database!'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('ℹ️ Running backend API server with MongoDB Atlas fallback mode.');
    });

// API Key Validation Middleware for Admin endpoints
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey && apiKey === ADMIN_API_KEY) {
        next();
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized: Invalid or missing Admin API Key' });
    }
};

// =========================================================================
// API ENDPOINTS
// =========================================================================

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'IAC Website Backend API',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date()
    });
});

// 2. Submit Membership Application (Public Endpoint)
app.post('/api/applications', async (req, res) => {
    try {
        const { fullName, rollNo, email, phone, department, year, interest } = req.body;

        // Validation
        if (!fullName || !rollNo || !email || !phone || !department || !year) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields (fullName, rollNo, email, phone, department, year)'
            });
        }

        const newApplication = new Application({
            fullName,
            rollNo,
            email,
            phone,
            department,
            year,
            interest: interest || 'Embedded Systems'
        });

        const savedApp = await newApplication.save();

        console.log(`📥 New Membership Application Received: ${fullName} (${rollNo}) - Dept: ${department}`);

        res.status(201).json({
            success: true,
            message: 'Application submitted and saved to MongoDB Atlas successfully!',
            data: savedApp
        });
    } catch (err) {
        console.error('Error saving application:', err);
        res.status(500).json({ success: false, error: err.message || 'Server Error' });
    }
});

// 3. Get All Applications (Admin Protected Endpoint)
app.get('/api/applications', verifyApiKey, async (req, res) => {
    try {
        const applications = await Application.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. Update Application Status (Admin Protected Endpoint)
app.patch('/api/applications/:id', verifyApiKey, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'contacted', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status value' });
        }

        const updatedApp = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedApp) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        res.json({
            success: true,
            message: `Application status updated to ${status}`,
            data: updatedApp
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 5. Delete Application (Admin Protected Endpoint)
app.delete('/api/applications/:id', verifyApiKey, async (req, res) => {
    try {
        const deletedApp = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApp) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start Server - Bind to 0.0.0.0 so all network devices (mobiles/laptops) can connect
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 IAC Express Backend API Server running on port ${PORT} (Listening on 0.0.0.0)`);
    console.log(`📡 Local API Endpoint: http://localhost:${PORT}/api/health`);
});
