import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) {
    throw new Error("NO MONGODB URI IS PROVIDED")
}

const connectToMongoDB = async () => {
    await mongoose.connect(uri)
}


export default async () => {
    if (mongoose.connection.readyState === 1){
        return
    }
    await connectToMongoDB()
}

connectToMongoDB()
