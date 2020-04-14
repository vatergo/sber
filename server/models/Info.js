import { Schema, model } from 'mongoose';

const schema = new Schema({
    studentId: { type: String, required: true },
    photo: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    education: { type: String, required: true },
    info: { type: String, required: true },
    diplom: { type: String, required: true }
});

export default model('Info', schema);