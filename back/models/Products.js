const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  itemOwner: { type: Schema.Types.ObjectId, ref: "User" },
  productName: String,
  productDescription: String,
  photo: String,
  productPrice: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;