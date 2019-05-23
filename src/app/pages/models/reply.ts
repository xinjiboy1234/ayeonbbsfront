import { User } from './user';
import { PageViewModel } from './pageviewmodel';
import { Post } from './post';
import { ReplyGood } from './replygood';

export class Reply {
    replyId: number;
    repliedId: number;
    parentReplyId: number;
    replyContent: string;
    createUser: User;
    replyUser: User;
    replyDate: Date;
    replyGoodCount: number;
    replyInfoViewModels: Reply[];
    pageViewModel: PageViewModel;
    repliedUserInfo: User;
    innerReplyCount: number;
    postInfo: Post;
    replyGood: ReplyGood;
}