import * as yup from 'yup'

export const registerUserSchema = yup.object({
    name: yup.string().defined().required(),
    email: yup.string().defined().required().email(),
    password: yup.string().defined().required().length(8)
})

export interface registerUserData extends yup.Asserts<typeof registerUserSchema> {
}
