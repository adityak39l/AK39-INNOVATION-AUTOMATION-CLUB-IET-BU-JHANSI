const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    rollNo: {
        type: String,
        required: [true, 'Roll number is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'WhatsApp phone number is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: ['EIE', 'BME', 'BT', 'ECE', 'CSE', 'ME', 'OTHER']
    },
    year: {
        type: String,
        required: [true, 'Year of study is required'],
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
    },
    interest: {
        type: String,
        required: [true, 'Technical interest is required'],
        default: 'Embedded Systems'
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
