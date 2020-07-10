import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  emptyCartConsent: boolean;
}

@Component({
  selector: 'app-empty-cart-consent',
  templateUrl: './empty-cart-consent.component.html',
  styleUrls: ['./empty-cart-consent.component.scss']
})
export class EmptyCartConsentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmptyCartConsentComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
