import mongoose from "mongoose";
// ctrl +shift + l

const {Schema} = mongoose;

const commentSchema = new Schema({
    // 1.comment-ga uu qoray user-ka
    content:{
        type: String,
        required: true,
        // validate: [value => value.length <0, 'Content should be at least 5 characters.']
    },
    // 2. post-ga laga bixiyay comment-ga
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
    {
        timestamps: true
    }

);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;