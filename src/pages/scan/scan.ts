import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  result: BarcodeScanResult;
  BASE_URL = 'https://world.openfoodfacts.org/api/v0/product/';
  api_response;
  api_response_raw;

  constructor(public navCtrl: NavController, private bcs: BarcodeScanner, public navParams: NavParams, private toastCtrl: ToastController, private http: HttpClient) {
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

  getArticleByBarcode(code: string) {
    this.http
        .get(`${this.BASE_URL}${this.result.text}`)
        // .map(res => res.json())
        .subscribe(data => this.displayResult(data), error => this.handleGetError(error));
  }

  displayResult(data) {
    this.api_response_raw = data;
    this.api_response = data;
  }

  handleGetError(error) {
    console.log(error);
    console.error(error.message);
  }
}
