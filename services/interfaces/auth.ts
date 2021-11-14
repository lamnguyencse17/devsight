import mongoose from 'mongoose';

export interface NewAuthData {
    password?: string;
    email: string;
    user: mongoose.Types.ObjectId;
}

export interface FacebookResponse {
    id: string;
    email: string;
    name: string;
}
