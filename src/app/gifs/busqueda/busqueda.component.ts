import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  buscar () {
    const termino = this.txtBuscar.nativeElement.value;
    if( termino.trim().length === 0 ) return;
    this.gifsService.buscarGifs(termino);
    this.txtBuscar.nativeElement.value = '';
  }



}
