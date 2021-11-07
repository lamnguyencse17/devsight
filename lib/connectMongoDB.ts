import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) {
    throw new Error("NO MONGODB URI IS PROVIDED")
}
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: true,
    useCreateIndex: true
}

const connectToMongoDB = async () => {
    mongoose.connect(uri, opts)
}


export default async () => {
    if (mongoose.connection.readyState === 1){
        return
    }
    await connectToMongoDB()
}

connectToMongoDB()
