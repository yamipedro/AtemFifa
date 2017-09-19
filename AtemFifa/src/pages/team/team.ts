import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FifaProvider } from '../../providers/fifa/fifa';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  objectKeys: any = Object.keys;
  fifas: Object;
  fifas_key: Array<string> = [];
  fifaSel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
              public alertCtrl: AlertController, public fifa: FifaProvider) {
  }

  ionViewDidLoad() {
    this.init();
  }

  public init() {
    this.storage.get('fifa').then((fifa) => {
      this.fifas = fifa;
      this.fifas_key = Object.keys(this.fifas);
      console.log(fifa);
    });
  }

  public removeSpaces(text) {
    return text.replace(/_/g, ' ')
  }

  public addTeam() {
    let alertAddFifa = this.alertCtrl.create({
      title: 'Adicionar Time',
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
            this.fifa.addTeam(this.fifaSel, data.name, function() {
              this.init();
            }.bind(this));
          }
        }
      ]
    });
    alertAddFifa.present();
  }

}
