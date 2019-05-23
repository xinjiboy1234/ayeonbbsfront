import { User } from './user';
import { PageViewModel } from './pageviewmodel';

export class RequestUserViewModel extends User {
    pageViewModel: PageViewModel;
    userIds: number[];
}