import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the FifaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FifaProvider {

  constructor(private storage: Storage, public toastCtrl: ToastController) {
  }

  public getFifa(callback:(any) => void) {
    this.storage.get('fifa').then((fifa) => {
      callback(fifa);
    })
  }

  public saveFifa(fifa, callback:() => void) {
    this.storage.set('fifa', fifa).then(()  => {
      callback();
    })
  }

  public addFifa(name, callback:() => void) {
    this.getFifa(function (fifa){
      if (fifa[this.upercaseSpaces(name)] == undefined) {
        fifa[this.upercaseSpaces(name)] = {};
        this.saveFifa(fifa, function() {
          callback();
          this.toastShow(true);
        }.bind(this))
      }
      else {
        callback();
        this.toastShow(false);
      };
    });
  }

  public removeFifa(name, callback:() => void) {
    this.getFifa(function (fifa) {
      delete fifa[this.upercaseSpaces(name)];
      this.saveFifa(fifa, function() {
        callback();
      });
    }.bind(this));
  }

  public addTeam(_fifa, name, callback:() => void) {
    this.getFifa(function (fifa) {
      if (fifa[this.upercaseSpaces(_fifa)]['times'] == undefined) {
        fifa[this.upercaseSpaces(_fifa)]['times'] = {};
        fifa[this.upercaseSpaces(_fifa)]['times'][name] = {};
        this.saveFifa(fifa, function() {
          this.toastShow(true);
          callback();
        }.bind(this));
      }
      else {
        if (fifa[this.upercaseSpaces(_fifa)]['times'][name] == undefined) {
          fifa[this.upercaseSpaces(_fifa)]['times'][name] = {};
          this.saveFifa(fifa, function() {
            this.toastShow(true);
            callback();
          }.bind(this));
        }
        else {
          this.toastShow(false);
          callback();
        }
      }
    }.bind(this));
  }

  public toastShow(flag) {
    let toast = this.toastCtrl.create({
      message: (flag)?'Salvo com sucesso':'Erro ao salvar, verifique se já existe',
      duration: 2000
    });
    toast.present();
  }

  private upercaseSpaces(text) {
    return text.toUpperCase().replace(/ /g, '_');
  }

}
