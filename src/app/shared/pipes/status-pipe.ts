import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

@Pipe({
    name: 'ConvertStatus'
})
export class ConvertStatusPipe implements PipeTransform {
    constructor() { }
    transform(value: any): any {
        return value == '1'?"使用":"不使用";
    }
}