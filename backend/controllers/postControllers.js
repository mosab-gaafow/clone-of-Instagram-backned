import cloudinary from '../config/cloudinary.js';
import upload from '../middlewares/multer.js'
import Like from '../models/Like.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js'
import { model } from 'mongoose';
export const createPost = async(req, res) => {
    console.log('Request received:', req.body, req.file); 

    try{
        let result;
        // Haddi lagu guulesto inu multer uu si qabto sawir-ka
        if(req.file){

            // encode aa loo bedelaa image-ka, base64 aa loo bedelaa
            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                trasnformation : [
                    {width: 500, height: 500,  crop: 'limit'}
                ],
                // nooca encoding0ka
                encoding: 'base64'
            });
        }
        
        // post-ga samee
        const post = new Post({
            content: req.body.content,
            image: result?.url || null, // haddi sawir-la waayo null ku badal required maahane
            author: req.user._id // user-ka ku jiro qadka le loo diwangelinaa post-gaas.
        });

        await post.save();
         return res.status(201).send(post);

    }catch(e){
        console.log(e);
        console.log("Error at Creating Post...",e)
        res.status(400).send(e.message);
    }
};


export const updatePost = async(req, res) => {
    console.log('Request received:', req.body, req.file); 

    try{

        let updatedFields =  {
            content: req.body.content
        };


        let result;

        // raadi post-ga
    const isExistsPost =  await Post.findById(req.params.id);
    if(!isExistsPost) return res.status(400).send("Post not found.");

    // Hubi inay post-ka sameeysay user-kaan hadda
    if (isExistsPost.author.toString() !== req.user._id.toString()) {
        return res.status(403).send("Access denied. You are not allowed to update this post.");
    }


        // Haddi lagu guulesto inu multer uu si qabto sawir-ka
        if(req.file){

            // encode aa loo bedelaa image-ka, base64 aa loo bedelaa
            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                trasnformation : [
                    {width: 500, height: 500,  crop: 'limit'}
                ],
                // nooca encoding0ka
                encoding: 'base64'
            });

            // updateing
            updatedFields.image = result.url;
        };
        
    //    post raadso
    const post =  await Post.findByIdAndUpdate(req.params.id, updatedFields, {new: true});

    // hadii aan la updte graeenin
        
         return res.status(200).send({
            message: "post updated successful✅",
            post
         });

    }catch(e){
        console.log(e);
        console.log("Error at Creating Post...",e)
        res.status(400).send(e.message);
    }
};

export const getAllPosts = async(req, res) => {

    try{
        const posts = await Post.find().populate({
            path: "likes",
            model: "Like",
            populate:{
                path: "user",
                model: "User" , // model-ka isagaga xirmaan
                select: "username"
            }
        }).populate({
        // maadama author iyo likes ay simayihiin populate banaanka aa ka dhahaa
            path: "author",
            model: "User",
            select: "username email"
        }).populate({
            path: "comments",
            "model": "Comment",
            select: "content",
            populate:{
                path: "user",
                "model": "User",
                select: "username"
            }
        })
        .sort({createdAt: -1}) // qof-ka ugu dambeeyay aya so hormaraayo

        res.status(200).send(posts);


    }catch(e){
        console.log("Error at getting Posts..",e)
        return res.status(400).send(e.message);
    }




}

export const LikePost = async(req, res) => {

    try {
        // find the post first

        const post = await Post.findById(req.params.id);

        // hadi lasoo waayo
        
        if(!post) return res.status(400).send("Post Not Found");

        // user-ka qadka ku jiro post-ga uu like-ta saaray means: horay ayuu like u saaray
        const existingLike = await Like.findOne({post: post._id, user: req.user._id});

        // hadi lasoo helo oo uu user-ku horay like u saaray remove gare
        if(existingLike){
            await Like.findByIdAndDelete(existingLike._id);
        // trick Array qaab-ka wax looga remove-gareyo
        // id-ga post-gan la delete gareyay oo like-ta laga bixiyay postkana ka dir
        post.likes.pull(existingLike._id); // like-ta ka bixi

        await post.save();
        return res.status(200).send("Post Un-liked Successful✅");
        }

        // Like cusub aa abuurenaa hadda first time Like u saari rabaa

        const like = new Like({
            post: post._id,
            user: req.user._id // user-ka like gareyay oo qadka ku jiro
        });

        await like.save();
        
        // like-taan in Post-ga lagu xiro ayaa la rabaa
        // relationship between likes and posts
        post.likes.push(like._id);
        // user-ka liketa saaray iyo post liketa las aaray aa diwangelineena
        await post.save(); 
        return res.status(200).send("Post liked Successful✅👍");


    }catch(e){
        console.log("Error at Liking Post..", e)
        return res.status(400).send(e.message);
    }

}


export const commentOnPost = async (req, res) => {
    try{

        // 1. post majiraa horta bal  raadi
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(400).send("Post not Found");
        };

        // comment bixi
        const comment =  new Comment({
            content: req.body.content,
            user: req.user._id, // user-ka qadka ku jiro oo login-ah
            post: post._id
        });

        await comment.save();

        // relation ship
        // comment kii hada la sameyay ya iskaleh

        post.comments.push(comment._id);

        await post.save();

        return res.status(200).send("Comment created✅")



    }catch(e){
        console.log("Error at commnenting post",e)
        return res.status(400).send(e.message);
    }
}

export const deletePost = async (req, res) => {

    try{

        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) {
            return res.status(400).send("Post not found");

        }

        return res.status(200).send("Post deleted Successful.✅")



    }catch(e) {
        console.log("Error at deleting Post", e);
        return res.status(400).send(e.message);
    }


}

export const getPostById = async(req, res) => {

    try{

        const post = await Post.findById(req.params.id).populate({
            path: "comments",
            model: "Comment",
            populate:{
                path: "author",
                model: "User"
            }
        })
        .populate({
            path: "likes",
            model:"Like",
            populate:{
                path: "user",
                model: "User",
                select: "username, email"
            }
        })

    if(!post){
        return res.status(400).send("Post Not Found");
    }

    res.status(200).send(post);

    }catch(e){
        console.log("Error at getting Post by Id",e);
        return res.status(400).send(e.message);
    }

    




}