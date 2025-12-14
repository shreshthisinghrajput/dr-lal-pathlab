import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ''
    }
});

const healthCampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Camp name is required'],
        trim: true
    },
    nameHindi: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    descriptionHindi: {
        type: String,
        trim: true,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        trim: true,
        default: 'Ambikapur, Chhattisgarh'
    },
    media: [mediaSchema],
    services: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for active camps
healthCampSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.models.HealthCamp || mongoose.model('HealthCamp', healthCampSchema);
