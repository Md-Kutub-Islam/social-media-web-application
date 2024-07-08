import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    stream: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map, // here i am giving the type is Map if some one like the post, so that person id is store in map and we can find the person
        of: Boolean
    },
    Comments: {
        type: Array,
        default: []
    },
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

export default Post