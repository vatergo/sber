import { Schema, model } from 'mongoose';

const schema = new Schema({
    userId: { type: String, required: true },
    productsId: { type: String, required: true },
    orderInfo: { type: String, required: true },
    creationDate: { type: String, required: true },
});

export default model('Order', schema);