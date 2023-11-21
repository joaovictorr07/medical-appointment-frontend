import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  OnInit,
  AfterContentChecked,
} from '@angular/core';
import { catchError, first, throwError } from 'rxjs';
import { ConsultasMedicasCadastroComponent } from '../consultas-medicas-cadastro/consultas-medicas-cadastro.component';
import { ConsultasMedicasGridComponent } from '../consultas-medicas-grid/consultas-medicas-grid.component';
import { ConsultaMedicaModel } from '../models/consulta-medica.model';
import { HttpConsultaMedicaService } from '../services/http-consulta-medica.service';
import { isConsultaMedicaValid } from '../consultas-medicas.validator';

@Component({
  selector: 'app-consulta-medica',
  templateUrl: './consultas-medicas-container.component.html',
})
export class ConsultasMedicasContainerComponent
  implements OnInit, AfterContentChecked
{
  @ViewChild('grid') grid!: ConsultasMedicasGridComponent;
  @ViewChild('appcadastro') appcadastro!: ConsultasMedicasCadastroComponent;
  modoEdicao = false;
  isNovocadastro = false;
  consultaMedicaSelecionada!: ConsultaMedicaModel | null;
  listConsultasMedicas!: ConsultaMedicaModel[];

  constructor(
    private httpConsultaMedicaService: HttpConsultaMedicaService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.handleGetListConsultas();
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  public handleGetListConsultas(): void {
    this.httpConsultaMedicaService
      .getConsultas()
      .pipe(first())
      .subscribe(
        (res) => {
          this.listConsultasMedicas = res;
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  public handleAlterar(consultaMedica: ConsultaMedicaModel): void {
    this.consultaMedicaSelecionada = consultaMedica;
    this.modoEdicao = true;
    this.isNovocadastro = false;
  }

  public handleNovo(): void {
    this.consultaMedicaSelecionada = null;
    this.modoEdicao = true;
    this.isNovocadastro = true;
  }

  public handleSalvar(consultaMedica: ConsultaMedicaModel): void {
    if (!isConsultaMedicaValid(consultaMedica)) {
      return;
    }
    if (consultaMedica.id) {
      this.httpConsultaMedicaService
        .updateConsulta(consultaMedica)
        .pipe(first())
        .subscribe({
          complete: () => this.handleSaveSucess(),
          error: (error) => this.handleError(error),
        });
    } else {
      this.httpConsultaMedicaService
      this.httpConsultaMedicaService
      .saveConsulta(consultaMedica)
      .pipe(first())
      .subscribe({
        complete: () => this.handleSaveSucess(),
        error: (error) => this.handleError(error),
      });
    }
  }

  public handleSaveSucess(): void {
    this.handleGetListConsultas();
    //this.boxNotificationService.showSucessBox("Sucesso", "Consulta salva com sucesso");
    this.modoEdicao = false;
  }

  public handleDeleteSucess(): void {
    this.handleGetListConsultas();
    //this.boxNotificationService.showSucessBox("Sucesso", "Consulta excluída com sucesso");
  }

  public handleVoltar(): void {
    this.modoEdicao = false;
  }

  public handleExcluir(consultaMedica: ConsultaMedicaModel): void {
    this.httpConsultaMedicaService.deleteConsulta(consultaMedica)
    .pipe(first())
    .subscribe({
      complete: () => this.handleDeleteSucess(),
      error: error => this.handleError(error),
    });
  }

  public handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      alert('Erro ao processar a solicitação');
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
      alert('Erro ao processar a solicitação servidor' + (errorMessage) + "erro" + error);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
