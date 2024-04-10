import mongoose from 'mongoose';
import SchemaConstants from './constants';
const { Schema } = mongoose;

const organizationSchema = new Schema({
  orgName: String,
  userId: String,
  description: String,
  image: String,
  location: String,
  created_by: String,
  updated_by: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  isActive: Boolean,
  isDeleted: Boolean,
});

const orgModel = mongoose.model(SchemaConstants.organization, organizationSchema);

export default orgModel;