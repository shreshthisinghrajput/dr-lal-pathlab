import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Test title is required'],
        trim: true,
        minlength: [2, 'Title must be at least 2 characters'],
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: {
            values: [
                'Blood Tests',
                'Urine Tests',
                'Thyroid Tests',
                'Diabetes Tests',
                'Liver Tests',
                'Kidney Tests',
                'Heart Tests',
                'Vitamin Tests',
                'Hormone Tests',
                'Allergy Tests',
                'Cancer Markers',
                'Infection Tests',
                'Other',
            ],
            message: '{VALUE} is not a valid category',
        },
    },
    sampleType: {
        type: String,
        required: [true, 'Sample type is required'],
        trim: true,
        enum: {
            values: ['Blood', 'Urine', 'Stool', 'Saliva', 'Swab', 'Tissue', 'Other'],
            message: '{VALUE} is not a valid sample type',
        },
    },
    imageURL: {
        type: String,
        default: '/images/test-placeholder.jpg',
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add text index for search
testSchema.index({ title: 'text', description: 'text', category: 'text' });

const Test = mongoose.models.Test || mongoose.model('Test', testSchema);

export default Test;
