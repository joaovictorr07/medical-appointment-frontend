import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ConsultaMedicaModel } from '../models/consulta-medica.model';
@Component({
  selector: 'app-consultas-medicas-grid',
  templateUrl: './consultas-medicas-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultasMedicasGridComponent {
  @Input() listConsultasMedicas!: ConsultaMedicaModel[];
  @Output() emittDeletar = new EventEmitter<ConsultaMedicaModel>();
  @Output() emittEditar = new EventEmitter<ConsultaMedicaModel>();
  @Output() emittNovo = new EventEmitter<boolean>();

  consultaMedica: ConsultaMedicaModel = {} as ConsultaMedicaModel;

  constructor() {}

  public handleListaGrid(listaGrid: ConsultaMedicaModel[]): void {
    this.listConsultasMedicas = listaGrid;
  }

  public btnDelete(consultaMedica: ConsultaMedicaModel) {
    this.emittDeletar.emit(consultaMedica);
  }

  public btnEdit(consultaMedica: ConsultaMedicaModel) {
    this.emittEditar.emit(consultaMedica);
  }

  public btnNew(): void {
    this.emittNovo.emit(true);
  }
}
