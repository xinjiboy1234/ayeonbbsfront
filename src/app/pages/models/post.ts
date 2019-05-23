import { User } from './user';
import { PostGood } from './postgood';
import { SecondCategory } from './secondcategory';

export class Post {
    postId: number;
    postTitle: string;
    postContent: string;
    createDate: Date;
    author: User;
    visitedCount: number;
    postGood: PostGood;
    status: number;
    secondCategory: SecondCategory;
    postGoodCount: number;
    replyCount: number;
    isTop: number;
    whatch: number;
    description: string;
    checked: boolean;
}