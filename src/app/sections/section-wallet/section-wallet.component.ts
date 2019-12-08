import { Component, OnInit, Inject } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  quantity: string;
  alertUp: string;
  alertDown: string;
}

@Component({
  selector: 'app-section-wallet',
  templateUrl: './section-wallet.component.html',
  styleUrls: ['./section-wallet.component.css']
})
export class SectionWalletComponent implements OnInit {

  constructor(private _cryptoDataService: CryptoDataService, public dialog: MatDialog) { }

  cryptos: Crypto;
  quantity: string;
  alertUp: string;
  alertDown: string;

  ngOnInit() {
    // this._cryptoDataService.getCryptos().subscribe(res => {
    //   this.cryptoData = res;
    // });

    this._cryptoDataService.getWallet().subscribe(res => {
      this.cryptos = res;
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '260px',
      data: {quantity: this.quantity},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.quantity = result;
      console.log(this.quantity);
      this._cryptoDataService.editQuantity(id,this.quantity).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }

  openDialogAlertUp(id): void {
    const dialogRef = this.dialog.open(DialogAlertUp, {
      width: '260px',
      data: {alertUp: this.alertUp},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.alertUp = result;
      console.log(this.alertUp);
      this._cryptoDataService.setAlertUp(id,this.alertUp).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }

  openDialogAlertDown(id): void {
    const dialogRef = this.dialog.open(DialogAlertDown, {
      width: '260px',
      data: {alertDown: this.alertDown},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.alertDown = result;
      console.log(this.alertDown);
      this._cryptoDataService.setAlertDown(id,this.alertDown).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }


 }

@Component({
  selector: 'app-section-wallet-dialog',
  templateUrl: 'section-wallet.component-dialog.html',
  styleUrls: ['section-wallet.component.css']
})

export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-section-wallet-dialog',
  templateUrl: 'section-wallet.component-dialogAlertUp.html',
  styleUrls: ['section-wallet.component.css']
})

export class DialogAlertUp {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertUp>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-section-wallet-dialog',
  templateUrl: 'section-wallet.component-dialogAlertDown.html',
  styleUrls: ['section-wallet.component.css']
})

export class DialogAlertDown {
  
  constructor(
    public dialogRef: MatDialogRef<DialogAlertDown>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}