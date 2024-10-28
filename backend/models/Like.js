import mongoose from "mongoose";

const {Schema} = mongoose;

const likeSchema = new Schema({
    // 1. Post-ga like ta la saaray
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    // 2. User-ka like ta saaray
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

const Like = mongoose.model('Like', likeSchema);
export default Like;
