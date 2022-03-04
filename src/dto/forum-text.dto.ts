/* eslint-disable prettier/prettier */
import { ForumCommentDto } from "./forum-comment.dto";

export interface ForumTextDto{
    forumTextId?: number;
    text: string;
    date: Date;
    userId?: number;
    forumComments: ForumCommentDto[];
}