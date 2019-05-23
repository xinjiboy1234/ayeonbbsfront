import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

@Pipe({
    name: 'HtmlFillter'
})
export class HtmlFillter implements PipeTransform {
    constructor() { }
    transform(value: any): any {
        let content = value.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"");
        return content.toString().length > 100?content.substring(0,101)+"...":content;
    }
}