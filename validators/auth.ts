import * as yup from 'yup'

export const authPayloadSchema = yup.object({
    token: yup.string().defined().required(),
})

export interface authPayload extends yup.Asserts<typeof authPayloadSchema> {
}
