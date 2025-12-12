import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: [true, 'Test ID is required'],
    },
    bookingDate: {
        type: Date,
        required: [true, 'Booking date is required'],
    },
    bookingTime: {
        type: String,
        required: [true, 'Booking time is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Sample Collected', 'Completed'],
            message: '{VALUE} is not a valid status',
        },
        default: 'Pending',
    },
    reportPDF: {
        type: String,
        default: null,
        trim: true,
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Populate user and test by default
bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'userId',
        select: 'name email phone',
    }).populate({
        path: 'testId',
        select: 'title price category sampleType',
    });
    next();
});

// Index for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
