import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../service/postservice/post.service';

@Component({
  selector: 'app-hotpost',
  templateUrl: './hotpost.component.html',
  styleUrls: ['./hotpost.component.css']
})
export class HotpostComponent implements OnInit {

  hotPostData: Post[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.postService.getHotPosts().subscribe(
      res => {
        this.hotPostData = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  //点赞
  addPostGood(postInfo: Post, idx: number){
    this.postService.addPostGood(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              // this.postViewModel.posts[idx].postGood = new PostGood();
              // this.postViewModel.posts[idx].postGood.goodsId = res.result;
              // this.postViewModel.posts[idx].postGoodCount = resp;
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
  deletePostGood(postInfo: Post, idx: number){
    this.postService.addPostGood(postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.postService.getPostGoodCountByPostId(postInfo).subscribe(
            resp => {
              // this.postViewModel.posts[idx].postGoodCount = resp;
              // this.postViewModel.posts[idx].postGood = null;
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
