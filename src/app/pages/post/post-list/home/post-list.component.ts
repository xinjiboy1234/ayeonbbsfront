import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { PostViewModel } from '../../../models/postviewmodel';
import { Post } from 'src/app/pages/models/post';
import { PostGood } from 'src/app/pages/models/postgood';
import { PostService } from 'src/app/pages/service/postservice/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  
  secondCategoryList = [];
  firstCategoryId: number;
  secondtCategoryId: number;
  currentPage: number = 1;
  pageSize: number = 20;
  postViewModel: PostViewModel = new PostViewModel();
  isSpinning: boolean = false;

  constructor(
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.getDateByUrl();
  }

  // 根据地址获取参数并请求数据，主要是大分类，和小分类，根据当前激活的路由获取
  getDateByUrl(){
    this.isSpinning = true;
    this.acivatedRoute.params.subscribe(
      p => {
        this.currentPage = p["currpage"];
        //如果一级分类路由存在
        if(p["firstCategory"]) {
          this.firstCategoryId = p["firstCategory"];
          this.postService.getSecondCategoriesByFirstCategoryId(this.firstCategoryId).subscribe(
            res => {
              this.secondCategoryList = res;
              this.isSpinning = false;
            },
            error => {
              console.log(error);
              this.isSpinning = false;
            }
          );
          // 二级分类路由不存在
          if (!p["secondCategory"]){
            this.postService.getPostsByFirstCategoryId(this.firstCategoryId, this.currentPage, this.pageSize).subscribe(
              res => {
                this.postViewModel = res;
                this.isSpinning = false;
              },
              error => {
                console.log(error);
                this.isSpinning = false;
              }
            );
          }else{
            this.secondtCategoryId = p["secondCategory"];
            console.log(this.secondtCategoryId);
            this.postService.getPostsBySecondCategoryId(this.secondtCategoryId, this.currentPage, this.pageSize).subscribe(
              res => {
                this.postViewModel = res;
                this.isSpinning = false;
              },
              error => {
                console.log(error);
                this.isSpinning = false;
              }
            );
          }
        }else{
          this.loadData(this.currentPage, this.pageSize);
          this.isSpinning = false;
        }
      }
    );
  }

  //加载首页数据
  loadData(currpage: number, pageSize: number): void {
    this.postService.getAllPosts(currpage, pageSize).subscribe(
      res=>{
        this.postViewModel = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  //分页方法
  changePageIndex(currpage: number){
    let url = this.router.url;
    url = url.substring(0, url.lastIndexOf("/")+1);
    //路由跳转
    this.router.navigateByUrl(url+currpage);
  }

  //点赞
  addPostGood(postInfo: Post){
    this.isSpinning = true;
    this.postService.addPostGood(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              let idx = this.postViewModel.posts.indexOf(postInfo);
              this.postViewModel.posts[idx].postGood = new PostGood();
              this.postViewModel.posts[idx].postGood.goodsId = res.result;
              this.postViewModel.posts[idx].postGoodCount = resp;
              this.isSpinning = false;
            },
            err => {
              this.isSpinning = false;
            }
          );
        }
      },
      error => {
        this.isSpinning = false;
      }
    );
  }
  // 取消赞
  deletePostGood(postInfo: Post){
    this.isSpinning = true;
    this.postService.deletePostGood(postInfo.postGood).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              let idx = this.postViewModel.posts.indexOf(postInfo);
              this.postViewModel.posts[idx].postGood = null;
              this.postViewModel.posts[idx].postGoodCount = resp;
              this.isSpinning = false;
            },
            err => {
              this.isSpinning = false;
            }
          );
        }
      },
      error => {
        this.isSpinning = false;
      }
    );
  }
}
