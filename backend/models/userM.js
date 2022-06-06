const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    salt: String,
    hash: String,
    userInfo : Object,
    googleId: String,
    facebookId: String,

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;