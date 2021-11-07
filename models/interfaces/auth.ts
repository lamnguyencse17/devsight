import mongoose from "mongoose";

export default interface Auth extends Document{
    _id: string;
    email: string;
    user: string;
    googleId: string;
    password: string;
    token: string;
}
