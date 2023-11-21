import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, } from 'rxjs/operators';
import { Consulta } from '../models/consulta';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json; charset=utf-8'})
  }

  getConsultas(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(this.url + '/cadastro')
    .pipe (
      retry(2),
      catchError(this.handleError)
    )
  }

  getConsultaById (id: number) :Observable<Consulta> {
    return this.httpClient.get<Consulta>(this.url + '/cadastro/' + id)
    .pipe (
      retry(2),
      catchError(this.handleError)
    )
  }

  saveConsulta ({ consulta }: { consulta: Consulta; }): Observable<Consulta> {
    return this.httpClient.post<Consulta>(this.url + '/cadastro/', JSON.stringify(consulta), this.httpOptions)
    .pipe (
      retry (2),
      catchError(this.handleError)
      
    )
  }

  updateConsulta (consulta: Consulta): Observable<Consulta> {
    return this.httpClient.put<Consulta>(this.url + '/cadastro/' + consulta.id,  JSON.stringify(consulta), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteConsulta (consulta: Consulta){
    return this.httpClient.delete<Consulta>(this.url + '/cadastro/' + consulta.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      alert ("Erro ao processar a solicitação")
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
      alert ("Erro ao processar a solicitação")
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    
  };

}
