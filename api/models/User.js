const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: String,
    url: String,
    genre: String,
    artists: mongoose.Schema.Types.Mixed,
    coverUrl: String,
    tags: mongoose.Schema.Types.Mixed,
    download: mongoose.Schema.Types.Mixed,
});
const playlistSchema = new mongoose.Schema(
    {
        name: String,
        songs: [songSchema],
    },
    { timestamps: true }
);

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        // birthdate: {
        //   type: Date,
        //   required: true,
        // },
        premiumSubscriber: {
            type: Boolean,
            default: false,
        },
        playlists: {
            type: [playlistSchema],
            default: [],
        },
        refreshToken: {
            type: String,
            default: "",
        },
        // You can add more fields as needed (e.g., profile image, playlists, etc.)
    },
    {
        timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    }
);

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
