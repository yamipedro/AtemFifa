import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FifaProvider } from '../../providers/fifa/fifa';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  fifas: Object;
  fifas_key: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
              public alertCtrl: AlertController, public fifa: FifaProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.init();
  }

  public init() {
    this.storage.get('fifa').then((fifa) => {
      this.fifas = fifa;
      this.fifas_key = Object.keys(this.fifas);
    });
  }

  public removeSpaces(text) {
    return text.replace(/_/g, ' ')
  }

  public addFifa() {
    let alertAddFifa = this.alertCtrl.create({
      title: 'Adicionar FIFA',
      message: "",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Salvar',
          handler: data => {
            this.fifa.addFifa(data.name, function() {
              this.init();
            }.bind(this));
          }
        }
      ]
    });
    alertAddFifa.present();
  }

  public removeFifa(name) {
    this.fifa.removeFifa(name, function() {
      this.init();
    }.bind(this));
  }

}
