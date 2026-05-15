// USER MONGOOSE SCHEMA
// Defines user data structure

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    role: {
      type: String,
      enum: ['user', 'organizer', 'admin'],
      default: 'user',
    },
    eventsAttended: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsOrganized: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  {
    timestamps: true, // This automatically handles createdAt and updatedAt
    collection: 'users',
  }
);

// Mongoose timestamps already update `updatedAt` automatically.

// Methods
userSchema.methods.attendEvent = async function (eventId) {
  if (!this.eventsAttended.includes(eventId)) {
    this.eventsAttended.push(eventId);
    return await this.save();
  }
  return this;
};

userSchema.methods.organizeEvent = async function (eventId) {
  if (!this.eventsOrganized.includes(eventId)) {
    this.eventsOrganized.push(eventId);
    return await this.save();
  }
  return this;
};

// Statics
userSchema.statics.findByRole = function (role) {
  return this.find({ role });
};

// Indexes
userSchema.index({ role: 1 });

export default userSchema;