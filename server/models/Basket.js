import { Schema, model } from 'mongoose';

const schema = new Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
});

export default model('Basket', schema);