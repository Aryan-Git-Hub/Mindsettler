import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a name'],
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true, 
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add a valid email'],
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'], 
        minlength: 6, 
        maxlength: 128,
        select: false // Won't return password in queries by default
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    isConsultant: { 
        type: Boolean, 
        default: false 
    },
    // Required for MindSettler's "Confidentiality Policy" check
    hasAcceptedPolicy: { 
        type: Boolean, 
        default: false 
    },
    // To track the user's mental wellness journey progress
    journeyStatus: {
        type: String,
        enum: ['Discovery', 'Awareness', 'Healing', 'Growth'],
        default: 'Discovery'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);