import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: function() { return this.provider === 'local'; },
    },
    surname: {
        type: String,
        required: function() { return this.provider === 'local'; },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const userProfile = mongoose.model('profile', userProfileSchema);

export { userProfile }; 
