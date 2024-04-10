import mongoose from 'mongoose';
import SchemaConstants from './constants';
const { Schema } = mongoose;

const itemsSchema = new Schema({
  orgId: String,
  Name: String,
  description: String,
  image: String,
  price: Number,
  currentStock: Number,
  unit: String,
  created_by: String,
  updated_by: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  isActive: Boolean,
  isDeleted: Boolean,
});

const itemModel = mongoose.model(SchemaConstants.item, itemsSchema);

export default itemModel;