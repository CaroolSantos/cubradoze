import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JogadaProvider {
  urlBase: string;

  constructor(public http: Http) {
    console.log('Hello JogadaProvider Provider');
    this.urlBase = 'http://cubradoze.azurewebsites.net/api';
  }

  salvar(jogada){
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase + '/Jogadas', JSON.stringify(jogada), options)
      .map(res => res.json());
  }

}
