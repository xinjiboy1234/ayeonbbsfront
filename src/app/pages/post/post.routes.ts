import { PostListComponent } from './post-list/home/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { WritePostComponent } from './write-post/write-post.component';
import { PostMainComponent } from './post-main/post-main.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { PostEditComponent } from './post-edit/post-edit.component';

export const PostRoutes = [
    { path: '', component: PostMainComponent,
        children: [
            { path: '', redirectTo: 'plist/1', pathMatch: 'full'},
            { path: 'plist/:currpage', component: PostListComponent},
            { path: 'plist/category/:firstCategory/:currpage', component: PostListComponent},
            { path: 'plist/category/:firstCategory/:secondCategory/:currpage', component: PostListComponent},
            
        ]
    },
    { path: 'post-detail/:postid', component: PostDetailComponent },
    { path: 'post-edit/:postid', component: PostEditComponent },
    { path: 'write-post', component: WritePostComponent },
    { path: 'post-search/:searchtext/:dt', component: PostSearchComponent }
]