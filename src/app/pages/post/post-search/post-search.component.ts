import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { PostViewModel } from '../../models/postviewmodel';
import { Post } from 'src/app/pages/models/post';
import { PostGood } from 'src/app/pages/models/postgood';
import { PostService } from 'src/app/pages/service/postservice/post.service';
import { PageViewModel } from '../../models/pageviewmodel';
import { RequestPostViewModel } from '../../models/request.postviewmodel';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  secondCategoryList = [];
  searchText: string;
  secondtCategoryId: number;
  currentPage: number = 1;
  pageSize: number = 20;
  postViewModel: PostViewModel = new PostViewModel();
  post: Post = new Post();
  requestPostViewModel: RequestPostViewModel = new RequestPostViewModel();
  isSpinning: boolean = false;

  constructor(
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.postViewModel.pageViewModel = new PageViewModel(this.currentPage, this.pageSize);
    this.getDataByUrl();
  }

  // 根据地址获取参数并请求数据，主要是大分类，和小分类，根据当前激活的路由获取
  getDataByUrl(){
    this.isSpinning = true;
    this.acivatedRoute.params.subscribe(
      p => {
        this.currentPage = p["searchtext"];
        //如果一级分类路由存在
        if(p["searchtext"]) {
          this.searchText = p["searchtext"].trim();
          if(this.searchText.length > 0){
            this.requestPostViewModel.postTitle = this.searchText;
            this.postService.searchPost(this.requestPostViewModel).subscribe(
              res => {
                this.postViewModel = res;
                this.isSpinning = false;
              },
              error => {
                this.isSpinning = false;
              }
            );
          }
        }
      }
    );
  }

  //分页方法
  changePageIndex(currpage: number){
    this.requestPostViewModel.pageViewModel = new PageViewModel(currpage, 20);
    this.getDataByUrl();
  }

  //点赞
  addPostGood(postInfo: Post){
    this.postService.addPostGood(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              let idx = this.postViewModel.posts.indexOf(postInfo);
              this.postViewModel.posts[idx].postGood = new PostGood();
              this.postViewModel.posts[idx].postGood.goodsId = res.result;
              this.postViewModel.posts[idx].postGoodCount = resp;
            },
            err => {

            }
          );
        }
      },
      error => {

      }
    );
  }
  // 取消赞
  deletePostGood(postInfo: Post){
    this.postService.deletePostGood(postInfo.postGood).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              let idx = this.postViewModel.posts.indexOf(postInfo);
              this.postViewModel.posts[idx].postGood = null;
              this.postViewModel.posts[idx].postGoodCount = resp;
            },
            err => {

            }
          );
        }
      },
      error => {
        
      }
    );
  }
}
