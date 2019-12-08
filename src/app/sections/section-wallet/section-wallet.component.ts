import { Component, OnInit, Inject } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  quantity: string;
}

@Component({
  selector: 'app-section-wallet',
  templateUrl: './section-wallet.component.html',
  styleUrls: ['./section-wallet.component.css']
})
export class SectionWalletComponent implements OnInit {

  constructor(private _cryptoDataService: CryptoDataService, public dialog: MatDialog) { }

  cryptos: Crypto[];

  quantity: string;

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
      // this._cryptoDataService.addToWallet(id,parseFloat(this.quantity.replace(",","."))).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
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
