import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a name'] 
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true, 
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'], 
        minlength: 6, 
        select: false // Won't return password in queries by default
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    // Required for MindSettler's "Confidentiality Policy" check
    isConsultant: { 
        type: Boolean, 
        default: false 
    },
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