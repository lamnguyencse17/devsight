import UserModel from '@models/user';
import {LeanDocument} from 'mongoose';
import User from '@models/interfaces/user';
import axios from 'axios';
import {FacebookProfilePictureResponse} from '@services/interfaces/user';

export const findUser = async (email: string): Promise<LeanDocument<User>> => {
    return UserModel.findOne({email}, {_id: 1}).lean()
}

export const createUser = async (userDetail: Omit<User, '_id'>): Promise<LeanDocument<User>> => {
    return UserModel.create(userDetail)
}

export const getFacebookProfilePicture = async (token: string): Promise<string> => {
    const {data: {data: {url}}} = await axios.get<FacebookProfilePictureResponse>(`https://graph.facebook.com/me/picture?height=200&width=200&&redirect=false&access_token=${token}`)
    return url;
}
