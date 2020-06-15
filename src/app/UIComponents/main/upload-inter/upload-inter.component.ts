import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-inter',
  templateUrl: './upload-inter.component.html',
  styleUrls: ['./upload-inter.component.scss']
})
export class UploadInterComponent implements OnInit {

  constructor() { }
  interdoc: boolean = true;
  ngOnInit(): void {}

  // tslint:disable-next-line: member-ordering
  isHovering: boolean;

  // tslint:disable-next-line: member-ordering
  panfiles: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(file: FileList) {
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      this.panfiles.push(file.item(i));
      // files.stopPropagation();
    }
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}


}
