import mongoose from 'mongoose';

export default interface Auth extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    user: string;
    password: string;
    token: string;
}
