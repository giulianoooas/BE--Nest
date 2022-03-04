/* eslint-disable prettier/prettier */
export interface ForumCommentDto{
    forumCommentId?: number;
    text: string;
    date: Date;
    userId?: number;
    forumTextId: number;
}