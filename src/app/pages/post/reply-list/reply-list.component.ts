import { Component,Input,Inject, OnInit } from '@angular/core';
import { ReplyserviceService } from '../../service/replyservice.service';
import { ReplyViewModel } from '../../models/replyviewmodel';
import { Reply } from '../../models/reply';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { NzModalService } from 'ng-zorro-antd';
import { ReplyGood } from '../../models/replygood';


@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {

  @Input() postId;
  private replyViewModel = new ReplyViewModel();
  private replyInfo = new Reply();
  private userInfo = new User();
  public config: any
  private innerCurrentPage: number = 1;
  private currentPage: number = 1;
  private isDisabled: boolean;
  private baseUrl: string = "http://localhost:5000/uploadimg/avatar/";
  private isSpinning: boolean = false;
  private innerSpinning: boolean = false;
  private outSpinning: boolean = true;
  private showReplyUserRelate: string = "";

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private replyService: ReplyserviceService,
      private modalService: NzModalService
    ) {
      this.config = {
        extraPlugins: 'uploadimage, image2, colorbutton, colordialog',
        uploadUrl: 'http://localhost:5000/api/FileUpload/uploadpostimg',
        filebrowserBrowseUrl: '',
        filebrowserUploadUrl: 'http://localhost:5000/api/FileUpload/uploadpostimg',
        image2_alignClasses: [ 'image-left', 'image-center', 'image-right' ],
        image2_captionedClass : 'image-captioned',
        height: '150px'
    }
  }

  ngOnInit() {
    this.replyInfo.replyContent="";
    this.replyInfo.replyGood = new ReplyGood();
    this.replyInfo.postInfo = new Post();
    this.replyInfo.postInfo.postId = this.postId;
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
    if(this.userInfo){
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }
    this.getReplies();
  }

  getReplies(){
    this.replyService.getRepliesByPostId(this.postId, this.currentPage, 5).subscribe(
      res => {
        this.replyViewModel = res;
        // console.log(this.replyViewModel);
        this.outSpinning = false;
      },
      error => {
        this.error(error.message);
      }
    );
  }

  innerChangePageIndex(pageIndex: number, idx: number){
    this.innerSpinning = true;
    let reply = this.replyViewModel.replyInfoViewModels[idx];
    this.innerCurrentPage = pageIndex;
    this.replyService.getRepliesByReplyId(reply.replyId, pageIndex, 5).subscribe(
      res => {
        this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels = res.replyInfoViewModels;
        this.innerSpinning = false;
      },
      error => {
        this.error(error.message);
      }
    );
  }

  changePageIndex(pageIndex: number, idx: number){
    this.currentPage = pageIndex;
    this.outSpinning = true;
    this.replyService.getRepliesByPostId(this.postId, pageIndex, 5).subscribe(
      res => {
        this.replyViewModel = res;
        this.outSpinning = false;
      },
      error => {
        this.error(error.message);
      }
    );
  }

  // 回复回复内容
  innerReplyClick(parentReplyId: number, nodeId: string){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.replyInfo.replyContent="";
    this.replyInfo.parentReplyId= 0;
    this.replyInfo.repliedId = 0;

    this.replyInfo.parentReplyId = parentReplyId;
    this.replyInfo.repliedUserInfo = new User();
    this.showReplyUserRelate = "回复 " + JSON.parse(localStorage.getItem("currentUser")).nickName + " :";
    // 编辑器获得焦点
    window.location.hash = '';
    window.location.hash = nodeId;
  }

  //回复中回复
  replyToReplyClick(parentReplyId: number,repliedUser: User, repliedId: number, nodeId: string){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.replyInfo.replyContent="";
    this.replyInfo.parentReplyId= 0;

    this.replyInfo.parentReplyId= parentReplyId;
    this.replyInfo.repliedUserInfo = new User();
    this.replyInfo.repliedId = repliedId;
    this.replyInfo.repliedUserInfo.userId = repliedUser.userId;
    this.showReplyUserRelate = JSON.parse(localStorage.getItem("currentUser")).nickName + " @ " + repliedUser.nickName + " :";
    // 编辑器获得焦点
    window.location.hash = ''; 
    window.location.hash = nodeId;
  }

  //添加评论
  addReplyInfo(){
    this.isSpinning = true;
    this.isDisabled = true;
    this.replyService.addReply(this.replyInfo).subscribe(
      res => {
        if(res.mark==="1"){
          this.replyInfo.replyContent="";
          this.replyInfo.parentReplyId= 0;
          this.replyInfo.repliedUserInfo = new User();
          this.showReplyUserRelate = "";
          // this.success("操作成功");
          this.getReplies();// 刷新回复内容
          this.isSpinning = false;
          this.isDisabled = false;
        }else{
          this.error(res.msg);
          this.isSpinning = false;
          this.isDisabled = false;
        }
      },
      error => {
        this.error(error.message);
        this.isSpinning = false;
        this.isDisabled = false;
      }
    );
  }

  // 外部回复点赞
  addReplyGood(replyInfo: Reply, idx: number){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.outSpinning = true;
    this.replyService.addReplyGood(replyInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.replyService.getReplyGoodCountById(replyInfo.replyId).subscribe(
            res1 => {
              this.replyViewModel.replyInfoViewModels[idx].replyGood = new ReplyGood();
              this.replyViewModel.replyInfoViewModels[idx].replyGood.goodsId = res.result;
              this.replyViewModel.replyInfoViewModels[idx].replyGoodCount = res1;
              this.outSpinning = false;
            },
            error1 => {
              this.error(error1.message);
              this.outSpinning = false;
            }
          );
        }
      },
      error => {
        this.error(error.message);
        this.outSpinning = false;
      }
    );
  }

  // 外部取消赞
  deleteReplyGood(replyInfo: Reply, idx: number){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.outSpinning = true;
    this.replyService.deleteReplyGood(replyInfo.replyGood).subscribe(
      res => {
        if(res.mark === "1"){
          this.replyService.getReplyGoodCountById(replyInfo.replyId).subscribe(
            res1 => {
              this.replyViewModel.replyInfoViewModels[idx].replyGood = null;
              this.replyViewModel.replyInfoViewModels[idx].replyGoodCount = res1;
              this.outSpinning = false;
            },
            error1 => {
              this.error(error1.message);
              this.outSpinning = false;
            }
          );
        }
      },
      error => {
        this.error(error.message);
        this.outSpinning = false;
      }
    );
  }

  // 内部回复点赞
  addInnerReplyGood(replyInfo: Reply, idx: number, innerIdx: number){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.innerSpinning = true;
    this.replyService.addReplyGood(replyInfo).subscribe(
      res => {
        if(res.mark === "1"){
          this.replyService.getReplyGoodCountById(replyInfo.replyId).subscribe(
            res1 => {
              this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels[innerIdx].replyGood = new ReplyGood();
              this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels[innerIdx].replyGood.goodsId = res.result;
              this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels[innerIdx].replyGoodCount = res1;
              this.innerSpinning = false;
            },
            error1 => {
              this.error(error1.message);
              this.innerSpinning = false;
            }
          );
        }
      },
      error => {
        this.error(error.message);
        this.innerSpinning = false;
      }
    );
  }

  // 内部回复取消赞
  deleteInnerReplyGood(replyInfo: Reply, idx: number, innerIdx: number){
    if(localStorage.getItem("currentUser") == null){
      this.error("您还没有登录");
      return;
    }
    this.innerSpinning = true;
    this.replyService.deleteReplyGood(replyInfo.replyGood).subscribe(
      res => {
        if(res.mark === "1"){
          this.replyService.getReplyGoodCountById(replyInfo.replyId).subscribe(
            res1 => {
              this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels[innerIdx].replyGood = null;
              this.replyViewModel.replyInfoViewModels[idx].replyInfoViewModels[innerIdx].replyGoodCount = res1;
              this.innerSpinning = false;
            },
            error1 => {
              this.error(error1.message);
              this.innerSpinning = false;
            }
          );
        }
      },
      error => {
        this.error(error.message);
        this.innerSpinning = false;
      }
    );
  }

  success(msg: string): void {
    this.modalService.success({
      nzTitle: '系统提示',
      nzContent: msg,
      nzOnOk:()=>{
        this.getReplies();
      } 
    });
  }

  error(msg: string): void {
    this.modalService.error({
      nzTitle: '系统提示',
      nzContent: msg
    });
  }

  blur(){
    // this.replyInfo.parentReplyId= 0;
    // this.replyInfo.repliedId = 0;
    // this.replyInfo.repliedUserInfo = new User();
    // this.showReplyUserRelace = "";
  }

  cancelRelate(){
    this.replyInfo.parentReplyId= 0;
    this.replyInfo.repliedId = 0;
    this.replyInfo.repliedUserInfo = new User();
    this.showReplyUserRelate = "";
  }
}
