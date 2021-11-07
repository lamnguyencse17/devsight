import mongoose, {model, Schema} from 'mongoose';
import User from "./interfaces/user";

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true}
})

UserSchema.index({
    email: 1,
}, {unique: true})

const UserModel = model<User>('User', UserSchema);

export default mongoose.models.User || UserModel
