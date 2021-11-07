import UserModel from "@models/user";
import {LeanDocument} from "mongoose";
import User from "@models/interfaces/user";

export const findUser = async (email: string): Promise<LeanDocument<User>> => {
    return UserModel.findOne({email}, {_id: 1}).lean()
}

export const createUser = async (userDetail: Omit<User, '_id'>): Promise<LeanDocument<User>> => {
    return UserModel.create(userDetail)
}
