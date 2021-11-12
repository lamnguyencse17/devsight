import AuthModel from '@models/auth'
import {isEmpty} from "lodash";
import mongoose, {LeanDocument} from "mongoose";
import Auth from "@models/interfaces/auth";
import User from "@models/interfaces/user";
import {newAuthData} from "@services/interfaces/auth";
import bcrypt from 'bcryptjs'
import logger from "../utils/logger";
import jwt from 'jsonwebtoken'

export interface IUserFoundWithToken extends Omit<LeanDocument<Auth>, 'user'> {
    user?: LeanDocument<User>
}

export const verifyTokenAndFindUser = async (token: string, userId: string): Promise<IUserFoundWithToken> => {
    const user = await AuthModel.findOne({user: userId, token}).populate('user').lean()
    if (isEmpty(user)) {
        throw new Error('No match credential found')
    }
    return user
}

export const verifyGoogleAndFindUser = async (email: string): Promise<IUserFoundWithToken> => {
    return AuthModel.findOne({email}).populate('user').lean()
}

export const createNewAuth = async (authData: newAuthData): Promise<string> => {
    if (!process.env.BCRYPT_ROUND){
        logger.error('NO BCRYPT_ROUND FOUND')
        throw new Error('NO BCRYPT_ROUND FOUND')
    }
    const token = generateToken(authData.email, authData.user)
    if (authData.password) {
        const hashedPassword = await bcrypt.hash(authData.password, process.env.BCRYPT_ROUND)
        await AuthModel.create({...authData, password: hashedPassword, user: authData.user, token})
    } else {
        await AuthModel.create({...authData, user: authData.user, token})
    }
    return token
}

export const generateToken = (email: string, userId: mongoose.Types.ObjectId): string => {
    if (!process.env.TOKEN_SECRET) {
        logger.error('NO TOKEN_SECRET provided')
        throw new Error('NO TOKEN_SECRET provided')
    }
    return jwt.sign({userId: userId.toString(), email}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
}
