import mongoose from "mongoose";

export default interface User {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    avatar: string;
}
