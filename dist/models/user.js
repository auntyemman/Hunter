"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    accountType: {
        type: String,
        trim: true,
        enum: ['hunter', 'agent', 'landlord'],
        default: 'hunter',
        lowercase: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    middleName: { type: String, trim: true },
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, lowercase: true },
    password: { type: String, trim: true, minlength: 8 },
    phone: { type: String, trim: true },
    alternatePhone: { type: String, trim: true },
    gender: {
        type: String,
        enum: ['male', 'female', ''],
        trim: true,
        lowercase: true,
        default: '',
    },
    DOB: { type: Date, trim: true },
    age: { type: Number, trim: true },
    origin: { type: String, trim: true },
    nationality: { type: String, trim: true },
    languages: [{ type: String, trim: true }],
    picture: { type: String, trim: true },
    summary: { type: String, trim: true },
    occupation: { type: String, trim: true },
    address: [
        {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            LGA: { type: String, trim: true },
            state: { type: String, trim: true },
            zipCode: { type: String, trim: true },
        },
    ],
    openTo: [
        {
            type: String,
            trim: true,
            lowercase: true,
        },
    ],
    averageRating: { type: Number, default: 0 },
    metaData: {
        verificationCode: { type: String, default: '' },
        isActive: { type: Boolean, default: false },
        lastOnline: { type: Date },
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map