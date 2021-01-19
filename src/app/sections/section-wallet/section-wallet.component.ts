import { Component, OnInit, Inject } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

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
  private isAuthenticated: boolean;
  private userId: string;
  private cryptos: any;
  private quantity: string;
  private alertUp: string;
  private alertDown: string;

  constructor(
    private _cryptoDataService: CryptoDataService, 
    public dialog: MatDialog,
    private authorizeService: AuthorizeService
    ) { }

  ngOnInit() {
    this._cryptoDataService.updateWalletPrices().subscribe();

    this.authorizeService.isAuthenticated().subscribe( value => {
      this.isAuthenticated = value;
    });  

    setTimeout(() => {
      if(this.isAuthenticated){
        this.authorizeService.getUser().subscribe(data => {
          this.userId = data['sub'];
          this._cryptoDataService.GetWalletByUserId(this.userId).subscribe(res => {
            this.cryptos = res;
          });
        });
      }
    }, 1500);

    setTimeout(() => {
      this.calculateAlerts();
    }, 3000);
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '260px',
      data: {quantity: this.quantity},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) { 
        // this.alertUp = "0";
        return;
      } else {
      this.quantity = result;
      }
      console.log(this.quantity);
      this._cryptoDataService.editQuantity(id,this.quantity).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }

  openDialogAlertUp(id): void {
    const dialogRef2 = this.dialog.open(DialogAlertUp, {
      width: '260px',
      data: {alertUp: this.alertUp},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef2.afterClosed().subscribe(result => {
      if(result == undefined) { 
        // this.alertUp = "0";
        return;
      } else {
        this.alertUp = result;
      }
      console.log(this.alertUp);
      this._cryptoDataService.setAlertUp(id,this.alertUp).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }

  openDialogAlertDown(id): void {
    const dialogRef3 = this.dialog.open(DialogAlertDown, {
      width: '260px',
      data: {alertDown: this.alertDown},
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef3.afterClosed().subscribe(result => {
      if(result == undefined) { 
        return;
      } else {
      this.alertDown = result;
      }
      console.log(this.alertDown);
      this._cryptoDataService.setAlertDown(id,this.alertDown).subscribe();
      // console.log(parseFloat(this.quantity.replace(",",".")));
      location.reload();
    }); 
  }


  calculateAlerts() { 
    for (const id in this.cryptos) {
      if (this.cryptos.hasOwnProperty(id)) {
        const element = this.cryptos[id];
        
        var symbol = element.symbol;
        var oldPrice = parseFloat(element.oldPrice.replace(",","."));
        var newPrice = parseFloat(element.price.replace(",","."));
        var calculation = parseFloat((((newPrice/oldPrice)-1)*100).toFixed(2));
        var alertUp = parseFloat(element.alertUp.replace(",","."));
        var alertDown = parseFloat(element.alertDown.replace(",","."));
        element.calculation = calculation;

        if(calculation<-alertDown) {
          element.buy = "Price is below your alert (" + -alertDown + "%)  -  buy  " + symbol
          console.log("Price is below alert - buy  " + symbol)
        }
        if(calculation>alertUp) {
          element.sell = "Price is above your alert (" + alertUp + "%)  -  sell  " + symbol
          console.log("Price is above alert - sell  " + symbol)
        }
      }
    }
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
  selector: 'app-section-wallet-dialogalertup',
  templateUrl: 'section-wallet.component-dialogAlertUp.html',
  styleUrls: ['section-wallet.component.css']
})

export class DialogAlertUp {
  constructor(
    public dialogRef2: MatDialogRef<DialogAlertUp>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClickUp(): void {
    this.dialogRef2.close();
  }
}


@Component({
  selector: 'app-section-wallet-dialogalertdown',
  templateUrl: 'section-wallet.component-dialogAlertDown.html',
  styleUrls: ['section-wallet.component.css']
})

export class DialogAlertDown {
  constructor(
    public dialogRef3: MatDialogRef<DialogAlertDown>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClickDown(): void {
    this.dialogRef3.close();
  }
}