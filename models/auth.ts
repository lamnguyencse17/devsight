import mongoose, {model, Schema} from 'mongoose';
import Auth from "./interfaces/auth";

const AuthSchema = new Schema({
    email: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    googleId: {type: String},
    password: {type: String},
    token: {type: String}
})

AuthSchema.index({
    email: 1,
})

AuthSchema.index({
    email: 1,
    password: 1
}, {unique: true})

AuthSchema.index({
    userId: 1,
    token: 1
}, {unique: true})

const AuthModel = model<Auth>('User', AuthSchema);

export default mongoose.models.Auth || AuthModel
