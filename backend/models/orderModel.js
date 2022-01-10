import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    orderItems: [
      {
        name:{type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        qty: {type: Number, required: true},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    shipping: {
      address: {type: String, required: true},
      city: {type: String, required: true},
      country: {type: String, required: true},
      postalCode: {type: String, required: true},
    },
    payment: {
      paymentMethod: String,
      paymentResult: {
        orderID: String,
        payerID: String,
        paymentID: String,
      }
    },
    itemsPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: {type: Boolean, default: false, required: true},
    paidAt: Date,
    isDelivered: {type: Boolean, default: false, required: true},
    deliveredAt: Date,
},

{timestamps: true}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;