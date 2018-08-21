import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
* Generated class for the EditDataPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-edit-data',
 templateUrl: 'edit-data.html',
})
export class EditDataPage {
 data = { rowid:0, Surname:"", type:"", Firstname:"", Student:"",Address:"" };
 constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private sqlite: SQLite,
   private toast: Toast) {
     this.getCurrentData(navParams.get("rowid"));
 }


 getCurrentData(rowid) {
   this.sqlite.create({
     name: 'ionicdb.db',
     location: 'default'
   }).then((db: SQLiteObject) => {
     db.executeSql('SELECT * FROM classlist WHERE rowid=?', [rowid])
       .then(res => {
         if(res.rows.length > 0) {
           this.data.rowid = res.rows.item(0).rowid;
           this.data.Firstname = res.rows.item(0).Firstname;
           this.data.type = res.rows.item(0).type;
           this.data.Surname = res.rows.item(0).Surname;
           this.data.Student = res.rows.item(0).Student;
           this.data.Address = res.rows.item(0).Address;
         }
       })
       .catch(e => {
         console.log(e);
         this.toast.show(e, '5000', 'center').subscribe(
           toast => {
             console.log(toast);
           }
         );
       });
   }).catch(e => {
     console.log(e);
     this.toast.show(e, '5000', 'center').subscribe(
       toast => {
         console.log(toast);
       }
     );
   });
 }

 updateData() {
   this.sqlite.create({
     name: 'ionicdb.db',
     location: 'default'
   }).then((db: SQLiteObject) => {
     db.executeSql('UPDATE classlist SET Firstname=?,type=?,Surname=?,Student=?,Address=? WHERE rowid=?',[this.data.Firstname,this.data.Surname,this.data.type,this.data.Student,this.data.Address,this.data.rowid])
       .then(res => {
         console.log(res);
         this.toast.show('Data has been updated', '5000', 'center').subscribe(
           toast => {
             this.navCtrl.popToRoot();
           }
         );
       })
       .catch(e => {
         console.log(e);
         this.toast.show(e, '5000', 'center').subscribe(
           toast => {
             console.log(toast);
           }
         );
       });
   }).catch(e => {
     console.log(e);
     this.toast.show(e, '5000', 'center').subscribe(
       toast => {
         console.log(toast);
       }
     );
   });
 }

}