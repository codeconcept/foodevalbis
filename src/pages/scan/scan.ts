import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  result: BarcodeScanResult;

  constructor(public navCtrl: NavController, private bcs: BarcodeScanner, public navParams: NavParams, private toastCtrl: ToastController) {
  }


  scanBarcode() {
    const options: BarcodeScannerOptions = {
      prompt: 'Pointer votre caméra vers un code barre',
      torchOn: false
    };

    this.bcs.scan(options)
      .then(res => {
        this.result = res;
      }).catch(err => {
        this.toastCtrl.create({ message: err.message }).present();
        console.error(err)
      });

  }

  // async scanBarcode() {
  //   try{
  //     const options: BarcodeScannerOptions = {
  //       prompt: 'Pointer votre caméra vers un code barre',
  //       torchOn: false
  //     };

  //     this.result = await this.bcs.scan(options);
  //     await this.bcs.scan(options);
  //   } catch(err) {
  //     console.error(err);
  //     this.toastCtrl.create({message: err.message}).present();      
  //   }
  // }
}
