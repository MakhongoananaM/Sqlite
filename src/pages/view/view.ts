import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';
import { SQLite, SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  students: any = [];
  
  constructor(public navCtrl: NavController,
    private sqlite: SQLite) {}

    ionViewDidLoad() {
      this.getData();
    }
    
    ionViewWillEnter() {
      this.getData();
    }
    
    getData() {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS students(rowid INTEGER PRIMARY KEY, name TEXT, surname TEXT, gender TEXT, studentNumber INT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('SELECT * FROM students ORDER BY rowid DESC', [])
        .then(res => {
          this.students = [];
          for(var i=0; i<res.rows.length; i++) {
            this.students.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,surname:res.rows.item(i).surname,gender:res.rows.item(i).gender,studentNumber:res.rows.item(i).studentNumber})
          }
        })
        .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }
    
    addData() {
      this.navCtrl.push(AddDataPage);
    }
    
    editData(rowid) {
      this.navCtrl.push(EditDataPage, {
        rowid:rowid
      });
    }
    
    deleteData(rowid) {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM students WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }


}
