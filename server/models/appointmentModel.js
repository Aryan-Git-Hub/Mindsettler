import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    // Link to the user who is booking
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Mandatory session types from problem statement
    sessionType: { 
        type: String, 
        enum: ['Online', 'Offline'], 
        required: true 
    },
    // Appointment date and time slot
    date: { 
        type: Date, 
        required: true 
    },
    timeSlot: { 
        type: String, 
        required: true 
    },
    // Strictly mandated 60-minute duration
    duration: { 
        type: Number, 
        default: 60 
    },
    // Backend-controlled appointment status
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Rejected'], 
        default: 'Pending' 
    },
    // Manual payment tracking as there is no gateway
    paymentMethod: { 
        type: String, 
        enum: ['UPI', 'Cash'], 
        required: true 
    },
    isPaid: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true }); // Tracks when booking was created

export default mongoose.model('Appointment', appointmentSchema);