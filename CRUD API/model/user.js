const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
    userName: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    dayBirth: { type: Date, required: false},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false},
    created: { type: Date, default: Date.now},
});

UserSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (_err, encrypted) => {
        user.password = encrypted;
        return next();

    });
});

module.exports = mongoose.model('User', UserSchema);

