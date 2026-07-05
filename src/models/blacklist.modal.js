import mongoose from "mongoose";


const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token needed"]
    }
})

const blacklistModal = mongoose.model("blacklistedTokens",blacklistSchema)

export default blacklistModal   