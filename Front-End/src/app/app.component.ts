import { Component, OnInit } from '@angular/core';
import { ConsultaService } from './services/consulta.service';
import { Consulta } from './models/consulta';
import { NgForm } from '@angular/forms';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'API-rest-http';
  consulta = {} as Consulta;
  consultas: Consulta[] = [];

  constructor(private consultaService: ConsultaService){}

  ngOnInit() {
    this.getConsultas();
  }
onSubmit(){
  console.log();
}

  saveConsulta (form: NgForm){
    if (this.consulta.id !== undefined){
      this.consultaService.updateConsulta(this.consulta).subscribe(() => {
        this.cleanForm(form);
        return this.toastNotificationExito();
      });
    } else {
    this.consultaService.saveConsulta({ consulta: this.consulta }).subscribe(() => {
      this.cleanForm(form);
      return this.toastNotificationExito();

    });
    }
  }
  getConsultas() {
    this.consultaService.getConsultas().subscribe((consultas: Consulta[]) => {
      this.consultas = consultas;
    });
  }

  deleteConsulta(consulta: Consulta) {
    this.consultaService.deleteConsulta(consulta).subscribe(() => {
      this.getConsultas();
      return this.toastNotificationExito();
    });
  }

  editConsulta(consulta: Consulta){
    this.consulta = {...consulta};
  }
  
  cleanForm (form: NgForm){
    this.getConsultas();
    form.resetForm();
    this.consulta = {} as Consulta;
  }

  toastNotificationExito() {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('');
    newToastNotification.setMessage('Solicitação concluída com sucesso');

    // Choose layout color type
    newToastNotification.setConfig({
    autoCloseDelay: 5000, // optional
    textPosition: 'center', // optional
    layoutType: DialogLayoutDisplay.SUCCESS,
    progressBar: ToastProgressBarEnum.NONE, 
    toastUserViewType: ToastUserViewTypeEnum.SIMPLE, 
    animationIn: AppearanceAnimation.BOUNCE_IN,
    animationOut: DisappearanceAnimation.BOUNCE_OUT, 
    toastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
}


}