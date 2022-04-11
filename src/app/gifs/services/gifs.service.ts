import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "Q5lMssaLYWSLs81LZth0WPmziaFaOYUN";
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TODO: Cambiar tipo de dato de respuesta
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http:HttpClient ) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /* if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
  }
  

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    /* const resp = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.apiKey}&limit=25`);
    const data = await resp.json(); */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( (resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }

}
