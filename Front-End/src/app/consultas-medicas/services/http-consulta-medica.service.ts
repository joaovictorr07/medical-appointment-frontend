import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, first } from 'rxjs/operators';
import { Consulta } from '../../models/consulta';
import { ConsultaMedicaModel } from '../models/consulta-medica.model';

@Injectable({
  providedIn: 'root',
})
export class HttpConsultaMedicaService {
  url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  getConsultas(): Observable<ConsultaMedicaModel[]> {
      return this.httpClient
      .get<ConsultaMedicaModel[]>(this.url + '/cadastro');

  }

  getConsultaById(id: number): Observable<ConsultaMedicaModel> {
    return this.httpClient
      .get<ConsultaMedicaModel>(this.url + '/cadastro/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveConsulta(consulta: ConsultaMedicaModel): Observable<Consulta> {
    return this.httpClient
      .post<Consulta>(
        this.url + '/cadastro/',
        JSON.stringify(consulta),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateConsulta(consulta: ConsultaMedicaModel): Observable<Consulta> {
    return this.httpClient
      .put<ConsultaMedicaModel>(
        this.url + '/cadastro/' + consulta.id,
        JSON.stringify(consulta),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteConsulta(consulta: ConsultaMedicaModel) {
    return this.httpClient
      .delete<ConsultaMedicaModel>(
        this.url + '/cadastro/' + consulta.id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      alert('Erro ao processar a solicitação');
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
      alert('Erro ao processar a solicitação servidor');
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
