import { PageViewModel } from './pageviewmodel';
import {Post} from './post';

export class ManageRequestPostViewModel extends Post {
    pageViewModel: PageViewModel;
    secondCategoryIds: number[];
    postIds: number[];
}