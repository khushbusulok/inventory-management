import mongoose from 'mongoose';
import SchemaConstants from './constants'
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  prfile: String,
  email: String,
  password: String,
  mobile: String,
  countryCode: String,
  created_by: String,
  updated_by: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  isActive: {type: Boolean, default: true},
  isDeleted: {type: Boolean, default: false}
});

const userModel = mongoose.model(SchemaConstants.user,userSchema);

export default userModel;