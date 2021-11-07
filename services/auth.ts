import AuthModel from '@models/auth'
import {isEmpty} from "lodash";
import {LeanDocument} from "mongoose";
import Auth from "@models/interfaces/auth";
import User from "@models/interfaces/user";

export interface IUserFoundWithToken extends Omit<LeanDocument<Auth>, 'user'> {
    user?: LeanDocument<User>
}

export const verifyTokenAndFindUser = async (token: string, userId: string): Promise<IUserFoundWithToken> => {
    const user = await AuthModel.findOne({user: userId, token}).populate('userId').lean()
    if (isEmpty(user)) {
        throw new Error('No match credential found')
    }
    return user
}

export const verifyGoogleAndFindUser = async (email: string): Promise<IUserFoundWithToken> => {
    const user = await AuthModel.findOne({email}).populate('userId').lean()
    if (isEmpty(user)) {
        throw new Error('No match credential found')
    }
    return user
}
