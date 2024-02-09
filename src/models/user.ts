import { Model, model, Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  accountType: string;
  IDNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  alternatePhone: string;

  DOB: Date;
  age: number;
  gender: string;
  nationality: string;
  height: string;
  origin: string;
  skinColor: string;
  dressSize: string;
  languages: string[];

  picture: string;
  summary: string;
  occupation: string;

  address: {
    street: string;
    city: string;
    LGA: string;
    state: string;
    zipCode: string;
  }[];

  education: {
    institution: string;
    degree: string;
    grade: string;
    gradYear: string;
  }[];
  openTo: string[];

  favorites: {
    favedBy: Types.ObjectId | string;
  }[];

  ratings: {
    ratedBy: Types.ObjectId | string;
    house: Types.ObjectId | string;
    rating: number;
  }[];
  averageRating: number;

  metaData: {
    verificationCode: string;
    isActive: boolean;
    createdBy: Types.ObjectId | string;
    isOnline: boolean;
    lastOnline: Date;
  };
}

const userSchema = new Schema<IUser>(
  {
    accountType: {
      type: String,
      trim: true,
      enum: ['hunter', 'agent', 'landlord'],
      default: 'hunter',
      lowercase: true,
    },

    firstName: { type: String, trim: true, index: 'text' },
    lastName: { type: String, trim: true, index: 'text' },
    middleName: { type: String, trim: true, index: 'text' },
    fullName: { type: String, trim: true, index: 'text' },
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

    education: [
      {
        institution: { type: String, trim: true },
        degree: { type: String, trim: true },
        grade: { type: String, trim: true },
        gradYear: { type: String, trim: true },
      },
    ],
    openTo: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    favorites: [
      {
        favedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],

    ratings: [
      {
        ratedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        house: { type: Schema.Types.ObjectId, ref: 'House' },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
    averageRating: { type: Number, default: 0 },

    metaData: {
      verificationCode: { type: String, default: '' },
      isActive: { type: Boolean, default: false },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
      lastOnline: { type: Date, default: Date.now },
    },
  },
  { timestamps: true },
);

export const User: Model<IUser> = model<IUser>('User', userSchema);
