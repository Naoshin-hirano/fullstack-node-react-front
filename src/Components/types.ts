// アップロード画像ファイル
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// アップロード画像ファイルのオブジェクト
export interface FILE_OBJ {
    file: File | null
}

// ページネーションコンポーネントに渡すProps
export interface PAGENATION_PROPS {
    postsPerPage: number;
    totalPosts: number;
    paginate: (number: number) => void;
    currentPage: number;
}

// サジェスチョンリストコンポーネントに渡すProps
export interface SUGGESTION_LIST_PROPS {
    onClick: (e: any) => void;
    filteredSuggestions: string[];
}