import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

@Pipe({
    name: 'ConvertPostStatus'
})
export class ConvertPostStatusPipe implements PipeTransform {
    constructor() { }
    transform(value: any): any {
        if(value == "1"){
            return "发布";
        }else if(value == "2"){
            return "保存";
        }else{
            return "删除";
        }
    }
}