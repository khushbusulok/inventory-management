import mongoose from 'mongoose';
import SchemaConstants from './constants';
const { Schema } = mongoose;

const itemStockTransactionSchema = new Schema({
  orgId: String,
  itemId: String,
  transactionType: {type: String, enum: ['credit', 'debit']},
  stockChangeCount: Number,
  currentStock: Number,
  created_by: String,
  updated_by: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  isActive: Boolean,
  isDeleted: Boolean,
});

const itemStockTransactionModel = mongoose.model(SchemaConstants.itemStockTransaction, itemStockTransactionSchema);

export default itemStockTransactionModel;