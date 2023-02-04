import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  errorMessage = '';
  btnDisabled: boolean = true;
  file: any;
  categories = ['Debit Card', 'Credit Card'];
  selectedCategory= '';
  fileName='';
  uploadedFiles:any[]=[];
  pdfSrc:string='';
  constructor(private _upload: UploadService) {}


  ngOnInit(): void {}

  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.fileName=this.file.name;
    if (this.file.type !== 'application/pdf') {
      this.btnDisabled = true;
      this.errorMessage =
        'Only PDF files are allowed, uploaded file is of "' +
        this.file.name.split('.').pop() +
        '" type.';
    } else {
      this.errorMessage = '';
      this.btnDisabled = false;
      
      console.log('Found pdf file => ' + this.file.name);
    }
  }
  uploadfile() {
    if (this.selectedCategory == '') {
      this.errorMessage = 'Select function is blank';
    } else {
      this.errorMessage = '';
      let formData = new FormData();
      formData.set('file', this.file);
      this._upload.uploadFile(formData, this.selectedCategory).subscribe(
        (data: any) => {
          const d = new Date();
          d.setDate(d.getDate() + 50);
          this.uploadedFiles.push(this.fileName +' added in - "'+this.selectedCategory+'" AT "' +d +'"');
          console.log('file uploaded successfully');
          alert("file uploaded successfully");
          this.file="";
          this.btnDisabled = true;
          this.fileName="";
        },
        (error:any) => {
          console.log(error);
          console.log('error while uploading the file');
        }
      );
    }
  }
}
