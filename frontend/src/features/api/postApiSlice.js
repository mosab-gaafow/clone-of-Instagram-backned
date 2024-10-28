import { apiSlice } from "./baseApiSlice";

// baseUrl-ka aan hayno ayaa lagu daba qabanaa api-gan o wxa access u heleena url-ka guud
export const postApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        // wxi function aad ubaahanthay ayaad ku qore meshan
        // mutation: markaad samenesid UPDATE,DELETE,CREATE
        // query: Markad information so aqrineesid
        // builder: wxa ki jiro "/api/v1"
        getPosts: builder.query({
            query: ()=>({
                url: "/posts/get-all-posts"
            })
        }),
        getPostInfo: builder.query({
            query: (postId) =>({ // post-ga laso aqrinaayo Id-gisa la baasa
                url: `/posts/get-postById/${postId}`
            })
        })
    })
});

// console.log("postApiSlice: ", postApiSlice);

// qaab-ka loo export-gareeyo query-ga
export const { useGetPostsQuery, useGetPostInfoQuery } = postApiSlice;

