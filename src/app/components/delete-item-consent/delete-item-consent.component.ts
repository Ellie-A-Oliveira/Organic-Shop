import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item-consent',
  templateUrl: './delete-item-consent.component.html',
  styleUrls: ['./delete-item-consent.component.scss']
})
export class DeleteItemConsentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteItemConsentComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
