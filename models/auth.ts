import mongoose, {model, Schema} from 'mongoose';
import Auth from './interfaces/auth';

const AuthSchema = new Schema({
    email: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    password: {type: String},
    token: {type: String, required: true}
})

AuthSchema.index({
    email: 1,
    password: 1
}, {unique: true})

AuthSchema.index({
    user: 1,
    token: 1
}, {unique: true})

export default mongoose.models.Auth || model<Auth>('Auth', AuthSchema);
