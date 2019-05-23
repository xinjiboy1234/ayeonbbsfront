import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Post } from '../../models/post';
import { SecondCategory } from '../../models/secondcategory';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { PostService } from '../../service/postservice/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
// 第二分类
  secondCategories: SecondCategory[] = [];
  config: any;
  reqParam = {};
  isVisible = true;
  userInfo: User;
  isSpinning: boolean = false;
  postInfo = new Post();

  constructor(
    private postService: PostService,
    private modalService: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.config = {
      extraPlugins: 'uploadimage, image2, colorbutton, colordialog',
      uploadUrl: 'http://localhost:5000/api/FileUpload/uploadpostimg',
      filebrowserBrowseUrl: '',
      filebrowserUploadUrl: 'http://localhost:5000/api/FileUpload/uploadpostimg',
      image2_alignClasses: [ 'image-left', 'image-center', 'image-right' ],
      image2_captionedClass : 'image-captioned',
      height: '400px'
    }
  }

  ngOnInit() {
    this.postInfo.postContent="";
    this.postInfo.secondCategory = new SecondCategory();
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
    this.getSecondCategories();
    this.getPostInfo();
  }

  // 加载编辑器的方法

  //提交方法
  doSubmit(){
    this.isSpinning = true;
    this.postInfo.author = this.userInfo;
    if(this.postInfo.secondCategory.secondCategoryId <= 0){
      this.error("请选择分类");
      return;
    }
    if(this.postInfo.postTitle == null || this.postInfo.postTitle.trim() == ""){
      this.error("请填写标题");
      return;
    }
    this.postService.addPost(this.postInfo).subscribe(
      res=>{
        if(res.mark === "1"){
          this.successAndJump("发表成功！", res.postId);
        }else{
          this.error(res.msg);
          this.isSpinning = false;
        }
      },
      err=>{
        this.error(err.message);
        this.isSpinning = false;
      }
    );
  }

  getPostInfo(){
    const postId: number = this.activatedRoute.snapshot.params["postid"];
    this.postService.getPostInfo(postId).subscribe(
      res => {
        this.postInfo = res;
      },
      error => {
        this.error(error.message);
      }
    );
  }

  //取消就后退
  cancel(){
    history.go(-1);
  }

  //获取二级分类
  getSecondCategories(){
    this.postService.getSecondCategories().subscribe(
      res => {
        this.secondCategories = res;
      },
      err =>{
        this.error(err.message);
      }
    );
  }

  // 保存
  savePost(){
    if(this.postInfo.postTitle == null || this.postInfo.postTitle.trim() == ""){
      this.error("请填写标题");
      return;
    }
    this.postService.savePostInfo(this.postInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.success("保存成功！");
        }else{
          this.error(res.msg);
        }
      },
      error => {
        this.error(error.message);
      }
    );
  }

  successAndJump(msg: string, postId: number): void {
    this.modalService.success({
      nzTitle: '系统提示',
      nzContent: msg,
      nzOnOk:()=>{
        // 跳转 本人的主页
        // this.router.navigateByUrl("main/user/space/"+JSON.parse(localStorage.getItem("currentUser")).userId);
        this.router.navigateByUrl("main/post-detail/" + postId);
      }
    });
  }

  success(msg: string): void {
    this.modalService.success({
      nzTitle: '系统提示',
      nzContent: msg,
      nzOnOk:()=>{
        // 点击确定
      }
    });
  }

  error(msg: string): void {
    this.modalService.error({
      nzTitle: '系统提示',
      nzContent: msg
    });
  }
}
