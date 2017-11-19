import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  items: Array<{title: string, note: string, icon: string}>;
  afl: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afd: AngularFireDatabase) {
    this.afl = this.afd.list('food-articles');
    this.afl.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }
  
}
