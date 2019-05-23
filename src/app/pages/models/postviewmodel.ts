import { Post } from './post';
import { PageViewModel } from './pageviewmodel';

export class PostViewModel{
    posts: Post[];
    totalCount: number = 0;
    pageViewModel: PageViewModel;
}