import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';
import { ViewPage } from '../view/view';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  us(){

    this.navCtrl.push(ViewPage);
  }

  us1(){
    this.navCtrl.push(RegisterPage);
  }

}
