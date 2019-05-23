import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html-pipe';
import { HttpClientModule } from '@angular/common/http';
import { ConvertStatusPipe } from './pipes/status-pipe';
import { HtmlFillter } from './pipes/html-fillter-pipe';
import { ConvertPostStatusPipe } from './pipes/post-status-pipe';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,ConvertStatusPipe,HtmlFillter,ConvertPostStatusPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SanitizeHtmlPipe,ConvertStatusPipe,HtmlFillter,ConvertPostStatusPipe
  ]
})
export class SharedModule { }
