import mongoose, {Mongoose} from 'mongoose';
import userSchema from './user.schema';
import organizationSchema from './organization.schema';
import itemsSchema from './items.schema';
import itemStockTransactionSchema from './itemStockTransaction.schema';
mongoose.Promise = global.Promise;

interface Database {
    mongoose: Mongoose;
    [key: string]: any;
}
const db: Database = {
    mongoose: mongoose
};

db.mongoose = mongoose;

db.user = userSchema;
db.organization = organizationSchema;
db.items = itemsSchema;
db.itemStockTransaction = itemStockTransactionSchema;

export default db;