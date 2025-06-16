import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-privacy',
  templateUrl: './data-privacy.component.html',
  styleUrls: ['./data-privacy.component.css']
})
export class DataPrivacyComponent {
 constructor(private dialogRef: MatDialogRef<DataPrivacyComponent>) {}

  acceptPrivacy() {
    sessionStorage.setItem('privacyAccepted', 'true');
    this.dialogRef.close();
  }
}
