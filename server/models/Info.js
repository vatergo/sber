import { Schema, model } from 'mongoose';

const schema = new Schema({
    studentId: { type: String, required: true },
    photo: { type: String },
    birthday: { type: String },
    address: { type: String },
    education: { type: String },
    info: { type: String },
    diplom: { type: String },
});

export default model('Info', schema);