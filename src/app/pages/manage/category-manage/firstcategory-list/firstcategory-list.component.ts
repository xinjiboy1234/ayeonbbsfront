import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirstCategory } from 'src/app/pages/models/firstcategory';
import { FirstCategoryViewModel } from 'src/app/pages/models/firstcategoryviewmodel';
import { FirstcategoryService } from 'src/app/pages/service/categoryservice/firstcategory.service';
import { RequestFirstCategoryViewModel } from 'src/app/pages/models/manage.request.firstcategoryviewmodel';
import { PageViewModel } from 'src/app/pages/models/pageviewmodel';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FirstcategoryEditComponent } from '../firstcategory-edit/firstcategory-edit.component';

@Component({
  selector: 'app-firstcategory-list',
  templateUrl: './firstcategory-list.component.html',
  styleUrls: ['./firstcategory-list.component.css']
})
export class FirstcategoryListComponent implements OnInit {
  validateForm: FormGroup;
  isVisible: boolean = false;
  allChecked: boolean = false;
  disabledButton: boolean = true;
  checkedNumber: number = 0;
  displayData: Array<FirstCategory> = [];
  operating: boolean = false;
  indeterminate: boolean = false;
  //大分类对象，用于编辑
  firstCategory: FirstCategory = new FirstCategory();
  // 大分类视图模型
  firstCategoryViewModel: FirstCategoryViewModel = new FirstCategoryViewModel();
  reqFirstCategory: RequestFirstCategoryViewModel = new RequestFirstCategoryViewModel();
  isLoading: boolean = false;
  currpageIndex: number = 1; // 当前页码
  pageSize: number = 10; // 一页显示条数

  constructor(
    private fb: FormBuilder,
    private firstCategoryService: FirstcategoryService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.reqFirstCategory.pageViewModel = new PageViewModel(1, this.pageSize);
    this.firstCategoryViewModel.firstCategories = [];
    this.validateForm = this.fb.group({
      firstCategoryName: [ null, [] ],
      categoryStatus: [ null, [] ],
    });
    this.getFirstCategories();
  }

  showModal(): void {
    this.firstCategory = new FirstCategory();
    this.isVisible = true;
  }

  currentPageDataChange($event: Array<FirstCategory>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.firstCategoryViewModel.firstCategories.some(value => value.checked);
    this.checkedNumber = this.firstCategoryViewModel.firstCategories.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  //添加大分类
  handleOk() {
    if (this.firstCategory.firstCategoryName == null || this.firstCategory.firstCategoryName == ""){
      this.createMessage("warning", "分类名称不可为空");
      return;
    }
    this.firstCategoryService.addFirstCategory(this.firstCategory).subscribe(
      res => {
        if(res.mark === "1"){
          this.createMessage("succcess", "添加成功");
          this.pageIndexChange(this.currpageIndex);
        }
    },
    error => {
      this.createMessage("error", `${error.status}, ${error.message}`);
      return;
    });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // 获取大分类数据
  getFirstCategories(){
    this.firstCategoryService.getFirstCategories(this.reqFirstCategory).subscribe(
      res => {
        this.firstCategoryViewModel = res;
        this.isLoading = false;
      },
      error=>{
        this.createMessage("error", `${error.status}, ${error.message}`);
        this.isLoading = false;
      }
    );
  }

  // 查询
  inQuery(){
    this.currpageIndex = 1;
    this.pageIndexChange(1);
  }

  // 换页
  pageIndexChange($event: number){
    this.reqFirstCategory = new RequestFirstCategoryViewModel();
    this.currpageIndex = $event;
    if(this.validateForm.get("firstCategoryName").value){
      this.reqFirstCategory.firstCategoryName = this.validateForm.get("firstCategoryName").value;
    }
    if(this.validateForm.get("categoryStatus").value){
      this.reqFirstCategory.status = this.validateForm.get("categoryStatus").value;
    }
    this.reqFirstCategory.pageViewModel = new PageViewModel($event, this.pageSize);
    this.getFirstCategories();
  }

  // 创建编辑分类小窗体
  createComponentModal(firstCategory: FirstCategory): void {
    this.firstCategory = new FirstCategory();
    // 为了避免编辑页面于 表格数据绑定，特意转移一下数据
    this.firstCategory.firstCategoryId = firstCategory.firstCategoryId;
    this.firstCategory.firstCategoryName = firstCategory.firstCategoryName;
    const modal: NzModalRef = this.modalService.create({
      nzTitle: '编辑大分类',
      nzContent: FirstcategoryEditComponent,
      nzComponentParams: {
        firstCategory: this.firstCategory
      },
      nzFooter: [
        {
          label: '保存',
          onClick: componentInstance => {
            this.firstCategory = componentInstance.firstCategory;
            if (this.firstCategory.firstCategoryName == null || this.firstCategory.firstCategoryName == ""){
              this.createMessage("warning", "分类名称不可为空");
              return;
            }
            this.firstCategoryService.changeFirstCategoryInfo(this.firstCategory).subscribe( 
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
  // 保存编辑
  saveEdit(){
    if (this.firstCategory.firstCategoryName == null || this.firstCategory.firstCategoryName == ""){
      this.createMessage("warning", "分类名称不可为空");
      return;
    }
    this.firstCategoryService.changeFirstCategoryInfo(this.firstCategory).subscribe( 
      res => {
        if(res.mark === "1"){
          this.createMessage("success", "修改成功！");
          this.firstCategory = new FirstCategory();
          this.pageIndexChange(this.currpageIndex);
        }else{
          this.createMessage("warning", res.msg);
        }
      },
      error => {
        this.createMessage("error", `${error.status}, ${error.message}`);
        return;
      }
    );
  }

  // 删除分类
  deleteFirstCategory(firstCategory: FirstCategory){
    this.firstCategoryService.deleteFirstCategory(firstCategory).subscribe(
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
  recoveryFirstCategoryStatus(firstCategory: FirstCategory){
    this.firstCategoryService.recoveryFirstCategoryStatus(firstCategory).subscribe(
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
