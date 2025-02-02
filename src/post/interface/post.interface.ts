export interface Post {
    postIdx: number;
    title: string;
    content: string;
    isPublished: boolean;
    userIdx: number;
    postCategoryIdx: number;
    publishedAt?: Date;
    enable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
