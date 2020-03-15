import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
    cost: { type: String, required: true },
    categoryId: { type: String, required: true }
});

export default model('Product', schema);