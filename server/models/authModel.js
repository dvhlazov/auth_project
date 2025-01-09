import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
        default: 'local',
        enum: ['local', 'google', 'facebook', 'github'],
    },
    password: {
        type: String,
        required: function() { return this.provider === 'local'; },
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });





const authModel = mongoose.model('auth', authSchema);

export { authModel };

