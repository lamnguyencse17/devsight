import axios from "axios";

export const authenticateGoogle = async (token: string) => {
    try {
        return await axios.post('api/auth/google', {token})
    }
    catch (err) {
        console.error(err)
    }
}
