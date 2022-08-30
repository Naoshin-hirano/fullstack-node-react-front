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

export interface AUTH_STATE {
    username: string;
    id: number;
    status: boolean;
}