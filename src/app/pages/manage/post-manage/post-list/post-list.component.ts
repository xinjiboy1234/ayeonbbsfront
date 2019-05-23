import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { FirstCategory } from 'src/app/pages/models/firstcategory';
import { PostViewModel } from 'src/app/pages/models/postviewmodel';
import { Post } from 'src/app/pages/models/post';
import { PostService } from 'src/app/pages/service/postservice/post.service';
import { ManageRequestPostViewModel } from 'src/app/pages/models/manage.request.postViewModel';
import { PageViewModel } from 'src/app/pages/models/pageviewmodel';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  validateForm: FormGroup;
  currpageIndex: number = 1;
  secondCategories: SecondCategory[];
  firstCategories: FirstCategory[];
  postViewModel: PostViewModel;
  manageRequestPostViewModel: ManageRequestPostViewModel;
  pageSize: number = 10;
  isLoading: boolean = false;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<Post> = [];
  operating = false;
  indeterminate = false;

  constructor(
      private fb: FormBuilder,
      private postService: PostService
    ) {}

  ngOnInit() {
    this.postViewModel = new PostViewModel();
    this.postViewModel.posts = []
    this.manageRequestPostViewModel = new ManageRequestPostViewModel();
    this.validateForm = this.fb.group({
      postTitle: [ null, [] ],
      postStatus: [ null, [] ],
      firstCategory: [ null, [] ],
      secondCategory: [ null, [] ]
    });
    this.pageIndexChange(1);
    this.getSecondCategories();
  }

  currentPageDataChange($event: Array<Post>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.postViewModel.posts.some(value => value.checked);
    this.checkedNumber = this.postViewModel.posts.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  //查询方法
  inQuery(){
    this.pageIndexChange(1);
  }

  // 获取小分类
  getSecondCategories(){
    this.postService.getSecondCategories().subscribe(
      res => {
        this.secondCategories = res;
      },
      error => {

      }
    );
  }

  //获取帖子
  getPostInfos(){
    this.isLoading = true;
    this.postService.manageGetPosts(this.manageRequestPostViewModel).subscribe(
      res => {
        this.postViewModel = res;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  //置顶
  setTop(postInfo: Post){
    this.postService.setTop(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      }
    );
  }
  
  // 取消置顶
  dropTop(postInfo: Post){
    this.postService.dropTop(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      }
    );
  }

  // 删除帖子
  deletePost(postInfo: Post){
    this.postService.deletePostInfo(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      }
    );
  }

  // 恢复帖子
  recoveryPostStatus(postInfo: Post){
    this.postService.recoveryPostStatus(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      },
      error => {

      }
    );
  }

  // 换页
  pageIndexChange($event: number){
    this.currpageIndex = $event;
    this.manageRequestPostViewModel.secondCategoryIds = this.validateForm.get("secondCategory").value;
    this.manageRequestPostViewModel.status = this.validateForm.get("postStatus").value===null? 0 : this.validateForm.get("postStatus").value;
    this.manageRequestPostViewModel.postTitle = this.validateForm.get("postTitle").value;
    this.manageRequestPostViewModel.pageViewModel = new PageViewModel($event, this.pageSize);
    this.getPostInfos();
  }

  psotMultyDelete(){
    this.manageRequestPostViewModel.postIds = []
    this.postViewModel.posts.forEach(e => {
      if (e.checked){
        this.manageRequestPostViewModel.postIds.push(e.postId);
      }
    });
    this.postService.postMultyDelete(this.manageRequestPostViewModel.postIds).subscribe(
      res => {
        if(res.mark === "1"){
          this.pageIndexChange(this.currpageIndex);
        }
      },
      error => {

      }
    );
  }
}
