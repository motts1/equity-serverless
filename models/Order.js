const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  id: String,
  orderDate: Date, 
  productQuantity: Number,
  shipDate: Date,
  deliverDate: Date,
  createdAt: Date,
  processed: Boolean,
  userId: String

});
module.exports = mongoose.model('Order', OrderSchema);
