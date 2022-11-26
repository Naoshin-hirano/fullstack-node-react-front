// 汎用的な型の定義

export interface COMMENT {
    id: string;
    commentBody: string;
    username: string;
}

export interface POST_TAG {
    PostId: number;
    TagId: number;
    createAt: string;
    updatedAt: string;
}

export interface TAG {
    PostTag: POST_TAG;
    createdAt: string;
    id: number;
    tag_name: string;
    updatedAt: string;
}

export interface LIKE {
    PostId: number;
    UserId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
}

export interface POST {
    Likes: LIKE[];
    Tags: TAG[];
    UserId: number;
    createdAt: string;
    id: number;
    imageName: string;
    postText: string;
    title: string;
    updatedAt: string;
    username: string;
}

export interface AUTH_STATE {
    username: string;
    id: number;
    status: boolean;
    imageName: string;
}

export interface RELATIONSHIP {
    createdAt: string;
    followed: number;
    following: number;
    id: number;
    updatedAt: string;
}

export interface USER {
    id: string;
    username: string;
    password: string;
    imageName: string;
    createAt: string;
    updatedAt: string;
}

export interface DM_OBJ {
    id: string;
    text: string;
    UserId: string;
}
