const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    customerId: {type: String},
    paymentIntentId: {type: String},
    products: [
        {
            id: {type: String},
            title: {type: String},
            image: {type: String},
            price: {type: String},
            quantity: {type: Number},
        }
    ],
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: {type: String, default:"pending"},
    payment_status:{type: String, required: true}
  },
  {timestamps: true});

const Orders = mongoose.model('Orders', OrderSchema);
module.exports = Orders