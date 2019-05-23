import { PostManager } from './postmanager';
import { UserPublishCategory } from './userpublishcategory';

export class User {
    userId: number;
    userName: string;
    loginId: string;
    password: string;
    nickName: string;
    postManageCount: number;
    publishCategoryCount: number;
    postCount: number;
    email: string;
    avatar: string;
    status: number;
    checked: boolean;
    postManagers: PostManager[];
    isSuperManager: number;
    isPostManager: boolean;
    userPublishCategories: UserPublishCategory[];
} 