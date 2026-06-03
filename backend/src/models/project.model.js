import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["image", "video"],
            required: [true, "Media type is required"],
        },

        url: {
            type: String,
            required: [true, "Cloudinary URL is required"],
        },

        publicId: {
            type: String,
            required: [true, "Cloudinary public ID is required"], 
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);

const projectSchema = new mongoose.Schema(
    {
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: [true, "College is required"],
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Owner is required"],
        },

        teamMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [150, "Title cannot exceed 150 characters"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },

        thumbnail: {
            url: {
                type: String,
                default: null,
            },
            publicId: {
                type: String,
                default: null, 
            },
        },

        repoUrl: {
            type: String,
            default: null,
            match: [/^https?:\/\/.+/, "Please provide a valid URL"],
        },

        demoUrl: {
            type: String,
            default: null,
            match: [/^https?:\/\/.+/, "Please provide a valid URL"],
        },

        tags: {
            type: [String],
            default: [],
            validate: {
                validator: (tags) => tags.length <= 10,
                message: "Cannot add more than 10 tags",
            },
        },

        media: {
            type: [mediaSchema],
            default: [],
            validate: {
                validator: (media) => media.length <= 10,
                message: "Cannot add more than 10 media items",
            },
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },

        viewsCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        likesCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        commentsCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);


projectSchema.index({ collegeId: 1, status: 1, createdAt: -1 });
projectSchema.index({ ownerId: 1, createdAt: -1 });
projectSchema.index({ collegeId: 1, tags: 1 });

export const Project = mongoose.model('Project', projectSchema);