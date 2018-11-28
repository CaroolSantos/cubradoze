import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PartidaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartidaProvider {
  urlBase:string;

  constructor(public http: Http) {
    console.log('Hello PartidaProvider Provider');
    this.urlBase = 'http://cubradoze.azurewebsites.net/api';
  }

  salvar(partida){
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase + '/Partidas', JSON.stringify(partida), options)
      .map(res => res.json());
  }

  finalizar(partida){
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase + '/Partidas/Finalizar', JSON.stringify(partida), options)
      .map(res => res.json());
  }

}
