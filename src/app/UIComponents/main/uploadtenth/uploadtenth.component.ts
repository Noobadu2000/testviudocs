import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadtenth',
  templateUrl: './uploadtenth.component.html',
  styleUrls: ['./uploadtenth.component.scss']
})
export class UploadtenthComponent implements OnInit {

  constructor() { }
  tenthdoc: boolean = true;
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
