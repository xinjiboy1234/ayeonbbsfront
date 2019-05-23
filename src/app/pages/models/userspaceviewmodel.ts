import { User } from './user';
import { SecondCategory } from './secondcategory';

export class UserSpaceViewModel{
    postGoodCount: number;
    replyCount: number;
    isLogin: boolean;
    userInfo: User;
    secondCategories: SecondCategory[];
}