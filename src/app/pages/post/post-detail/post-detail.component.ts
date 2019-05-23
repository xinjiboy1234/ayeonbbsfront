import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute, NavigationEnd, RouterState, RouterStateSnapshot } from  '@angular/router';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { SecondCategory } from '../../models/secondcategory';
import { NzModalService } from 'ng-zorro-antd';
import { PostGood } from '../../models/postgood';
import { PostService } from '../../service/postservice/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  private post = new Post();
  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post.postGood = new PostGood();
    this.post.author = new User();
    this.post.secondCategory = new SecondCategory();
    this.loadData();
  }

  loadData(){
    const param = this.activatedRoute.snapshot.params["postid"];
    this.postService.getPostById(param).subscribe(
      res => {
        this.post = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  postGoodAdd(){
    this.postService.addPostGood(this.post).subscribe(
      res => {
        if(res.mark === "1"){
          this.loadData();
        }
      },
      error => {

      }
    );
  }

  postGoodDelete(postGood: PostGood){
    this.postService.deletePostGood(postGood).subscribe(
      res => {
        if(res.mark === "1"){
          this.loadData();
        }
      },
      error => {

      }
    );
  }
}
