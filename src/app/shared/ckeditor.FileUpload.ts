export class FileUploadAdapter {
    loader: any;
    http: any;
    editor: any;
    constructor(loader: any, editor: any) {
      this.loader = loader;
      this.editor = editor;
      // 获取传入的http模块
      this.http = this.editor.config.get('http');
    }
    upload() {
      const data = new FormData();
      // 表单name为file，和后端app.js中的 req.files.file 相对应
      data.append('file', this.loader.file);
      return new Promise((resolve, reject) => {
        this.http.post(
          'http://localhost:5000/api/FileUpload/uploadpostimg',
          data)
          .subscribe(
            (resp) => {
              resolve({
                default: resp.result
              });
            },
            (err) => reject("服务拒绝，"+err.value)
          );
      });
    }
    abort() {
    }
  }
  export function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // 将 editor 对象也注入其中
      return new FileUploadAdapter(loader, editor);
    };
  }