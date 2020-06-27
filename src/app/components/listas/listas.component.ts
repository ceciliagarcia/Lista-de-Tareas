import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  {
@Input() terminado = true;
  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) { }

  listaSeleccionada( lista: Lista ) {
if ( this.terminado ){
  this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
} else {
  this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
}
   }

   borrarLista( lista: Lista) {

this.deseosService.borrarLista( lista );
   }


  async editarLista( lista: Lista, slideItem: any) {
      const alert = await this.alertCtrl.create({
        header: 'Editar Lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            value: lista.titulo,
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
              slideItem.close();
            }
      },
      {
        text: 'Actualizar',
        handler: ( data ) => {
          console.log(data);
          if ( data.titulo.length === 0 ) {
            slideItem.close();
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          slideItem.close();
        }
      }
    ]
      }); 
      alert.present();
     }
   }

