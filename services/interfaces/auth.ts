import mongoose from "mongoose";

export interface newAuthData {
    password?: string;
    email: string;
    user: mongoose.Types.ObjectId;
}
