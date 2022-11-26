export const Config = {
    api: {
        auth: {
            url: String(process.env.REACT_APP_AUTH),
        },
        changePassword: {
            url: String(process.env.REACT_APP_AUTH_CHANGEPASSWAORD),
        },
        changeAvatar: {
            url: String(process.env.REACT_APP_AUTH_CHANGEAVATAR),
        },
        authauth: {
            url: String(process.env.REACT_APP_AUTH_AUTH),
        },
        login: {
            url: String(process.env.REACT_APP_AUTH_LOGIN),
        },
        dmUser: {
            url: String(process.env.REACT_APP_AUTH_DMUSER),
        },
        userInfo: {
            url: String(process.env.REACT_APP_AUTH_USERINFO),
        },
        posts: {
            url: String(process.env.REACT_APP_POSTS),
        },
        postsById: {
            url: String(process.env.REACT_APP_POSTS_BYID),
        },
        suggests: {
            url: String(process.env.REACT_APP_POSTS_SUGGESTS),
        },
        search: {
            url: String(process.env.REACT_APP_POSTS_SEARCH),
        },
        title: {
            url: String(process.env.REACT_APP_POSTS_TITLE),
        },
        postText: {
            url: String(process.env.REACT_APP_POSTS_TEXT),
        },
        userPosts: {
            url: String(process.env.REACT_APP_POSTS_USERID),
        },
        hashTagPosts: {
            url: String(process.env.REACT_APP_POSTS_HASHTAG),
        },
        comments: {
            url: String(process.env.REACT_APP_COMMENTS),
        },
        commentById: {
            url: String(process.env.REACT_APP_COMMENTS_COMMENTID),
        },
        tags: {
            url: String(process.env.REACT_APP_TAGS),
        },
        dm: {
            url: String(process.env.REACT_APP_DM),
        },
        likes: {
            url: String(process.env.REACT_APP_LIKES),
        },
        relationships: {
            url: String(process.env.REACT_APP_RELATIONSHIPS),
        },
    },
};

export const apiConfig = Config.api;
