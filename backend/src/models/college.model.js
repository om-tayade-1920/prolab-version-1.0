import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "College name is required"],
            trim: true,
            minlength: [3, "College name must be at least 3 characters"],
            maxlength: [200, "College name cannot exceed 200 characters"],
        },

        domain: {
            type: String,
            required: [true, "Domain is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid domain"],
        },

        logoUrl: {
            type: String,
            default: null,
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
            maxlength: [100, "City cannot exceed 100 characters"],
        },
    },
    {
        timestamps: true,
    }
);

collegeSchema.index({ domain: 1 }, { unique: true });

export const College = mongoose.model('College', collegeSchema);