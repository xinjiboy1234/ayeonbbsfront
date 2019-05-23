import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SecondCategoryViewModel } from 'src/app/pages/models/secondcategoryviewmodel';
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { FirstCategoryViewModel } from 'src/app/pages/models/firstcategoryviewmodel';
import { FirstCategory } from 'src/app/pages/models/firstcategory';
import { SecondcategoryService } from 'src/app/pages/service/categoryservice/secondcategory.service';
import { RequestSecondCategoryViewModel } from 'src/app/pages/models/manage.request.secondcategory';
import { PageViewModel } from 'src/app/pages/models/pageviewmodel';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SecondcategoryEditComponent } from '../secondcategory-edit/secondcategory-edit.component';

@Component({
  selector: 'app-secondcategory-list',
  templateUrl: './secondcategory-list.component.html',
  styleUrls: ['./secondcategory-list.component.css']
})
export class SecondcategoryListComponent implements OnInit {
  validateForm: FormGroup;
  isVisible: boolean = false; // 弹出框是否可见
  allChecked: boolean = false;
  checkedNumber: number = 0;
  displayData: Array<SecondCategory> = [];
  operating: boolean = false;
  indeterminate: boolean = false;
  secondCategoryViewModel: SecondCategoryViewModel = new SecondCategoryViewModel();
  firstCategoryViewModel: FirstCategoryViewModel = new FirstCategoryViewModel();
  reqSecondCategory: RequestSecondCategoryViewModel = new RequestSecondCategoryViewModel();
  secondCategory: SecondCategory = new SecondCategory();
  isLoading: boolean = false;
  currpageIndex: number = 1; // 当前页码
  pageSize: number = 10; // 一页显示条数

  constructor(
    private fb: FormBuilder,
    private secondCategoryService: SecondcategoryService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.reqSecondCategory.pageViewModel = new PageViewModel(1, this.pageSize);
    this.secondCategoryViewModel.secondCategories = [];
    this.secondCategory.firstCategory = new FirstCategory();
    this.getFirstCategories(); // 获取大分类
    this.validateForm = this.fb.group({
      categoryName: [ null, [] ],
      categoryStatus: [ null, [] ],
    });
    this.getSecondCategories();
  }

  currentPageDataChange($event: Array<SecondCategory>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedNumber = this.secondCategoryViewModel.secondCategories.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  // 添加界面弹出
  showModal(): void {
    this.secondCategory = new SecondCategory();
    this.secondCategory.firstCategory = new FirstCategory();
    this.isVisible = true;
  }

  // 点击添加
  handleOk(): void {
    this.secondCategoryService.addSecondCategory(this.secondCategory).subscribe(
      res => {
        if(res.mark === "1"){
          this.createMessage("success", "添加成功");
          this.isVisible = false;
          this.pageIndexChange(this.currpageIndex);
        }else{
          this.createMessage("error", res.msg);
        }
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
      }
    );
  }

  //点击取消
  handleCancel(): void {
    this.isVisible = false;
  }

  //获取二级分类
  getSecondCategories(){
    this.isLoading = true;
    this.secondCategoryService.getSecondCategories(this.reqSecondCategory).subscribe(
      res => {
        this.secondCategoryViewModel = res;
        this.isLoading =false;
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
        this.isLoading =false;
      }
    );
  }

  //获取大分类数据
  getFirstCategories(){
    this.secondCategoryService.getFirstCategories().subscribe(
      res => {
        this.firstCategoryViewModel.firstCategories = res;
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
      }
    );
  }

  // 换页
  pageIndexChange($event: number){
    this.reqSecondCategory = new RequestSecondCategoryViewModel();
    this.currpageIndex = $event;
    if (this.validateForm.get("categoryName").value){
      this.reqSecondCategory.secondCategoryName = this.validateForm.get("categoryName").value;
    }
    if (this.validateForm.get("categoryStatus").value){
      this.reqSecondCategory.status = this.validateForm.get("categoryStatus").value;
    }
    this.reqSecondCategory.pageViewModel = new PageViewModel($event, this.pageSize);
    this.getSecondCategories();
  }

  // 查询
  inQuery(){
    this.currpageIndex = 1;
    this.pageIndexChange(1);
  }

  // 创建编辑分类小窗体
  createComponentModal(secondCategory: SecondCategory): void {
    this.secondCategory = new SecondCategory();
    this.secondCategory.firstCategory = new FirstCategory();
    // 为了避免编辑页面于 表格数据绑定，特意转移一下数据
    this.secondCategory.secondCategoryId = secondCategory.secondCategoryId;
    this.secondCategory.secondCategoryName = secondCategory.secondCategoryName;
    this.secondCategory.firstCategory.firstCategoryId = secondCategory.firstCategory.firstCategoryId;
    const modal: NzModalRef = this.modalService.create({
      nzTitle: '编辑二级分类',
      nzContent: SecondcategoryEditComponent,
      nzComponentParams: {
        secondCategory: this.secondCategory,
        firstCategories: this.firstCategoryViewModel.firstCategories
      },
      nzFooter: [
        {
          label: '保存',
          onClick: componentInstance => {
            this.secondCategory = componentInstance.secondCategory;
            if (this.secondCategory.firstCategory == null || this.secondCategory.firstCategory.firstCategoryId <= 0){
              this.createMessage("warning", "大分类不可为空！");
              return;
            }
            if (this.secondCategory.secondCategoryName == null || this.secondCategory.secondCategoryName == ""){
              this.createMessage("warning", "分类名称不可为空");
              return;
            }
            this.secondCategoryService.changeSecondCategoryInfo(this.secondCategory).subscribe( 
              res => {
                if(res.mark === "1"){
                  this.createMessage("success", "修改成功！");
                  modal.destroy();
                  this.pageIndexChange(this.currpageIndex);
                }else{
                  this.createMessage("warning", res.msg);
                  return;
                }
              },
              error => {
                this.createMessage("error", `${error.status}, ${error.message}`);
                return;
              }
            )
          },
          size: 'small',
          type: 'primary'
        },
        {
          label: '取消',
          onClick: () => modal.destroy(),
          size: 'small',
          type: 'default'
        }
      ]
    });
  }
  // 删除分类
  deleteSecondCategory(secondCategory: SecondCategory){
    this.secondCategoryService.deleteSecondCategory(secondCategory).subscribe(
      res => {
        if(res.mark === "1"){
          this.createMessage("success", "操作成功！");
          this.pageIndexChange(this.currpageIndex);
        }else{
          this.createMessage("error", res.msg);
        }
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
        return;
      }
    );
  }

  // 恢复分类状态
  recoverySecondCategoryStatus(secondCategory: SecondCategory){
    this.secondCategoryService.recoverySecondCategoryStatus(secondCategory).subscribe(
      res => {
        if(res.mark === "1"){
          this.createMessage("success", "操作成功！");
          this.pageIndexChange(this.currpageIndex);
        }else{
          this.createMessage("error", res.msg);
        }
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
        return;
      }
    );
  }

  // 弹出提示框
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}

