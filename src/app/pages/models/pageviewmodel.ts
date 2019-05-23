export class PageViewModel{
    currentPage: number;
    pageSize: number;
    constructor (currpage: number, ps: number){
        this.currentPage = currpage;
        this.pageSize= ps;
    }
}