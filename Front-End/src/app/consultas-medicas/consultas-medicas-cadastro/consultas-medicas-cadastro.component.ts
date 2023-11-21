import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaMedicaModel } from '../models/consulta-medica.model';
@Component({
  selector: 'app-consultas-medicas-cadastro',
  templateUrl: './consultas-medicas-cadastro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultasMedicasCadastroComponent implements OnInit {
  @Input() consultaMedica!: ConsultaMedicaModel | null;
  @Output() emittSalvar = new EventEmitter<ConsultaMedicaModel>();
  @Output() emittVoltar = new EventEmitter<boolean>();

  formGroup: FormGroup;
  teste = false;
  exibirErro = false;


  constructor(private formBuilder: FormBuilder,
 ){
    this.formGroup = this.formBuilder.group({
      id:[null, null],
      nomePaciente: [null, [Validators.required, Validators.minLength(3)]],
      crmMedico: [null, [Validators.required,  Validators.minLength(13)]],
      nomeMedico: [null, [Validators.required, Validators.minLength(3)]],
      dataConsulta: [null, [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
      horaConsulta: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      salaConsulta: [null, [Validators.required]],
    })
  }
  ngOnInit(): void {
    if(this.consultaMedica) {
      this.formGroup.patchValue({
        ...this.consultaMedica,
      });
    }
  }

  public btnSalvar(): void {
    if(!this.formGroup.valid){
      debugger
      this.exibirErro = true;
    }
    let consultaMedica: ConsultaMedicaModel = {
      ...this.formGroup.value,
    }
    console.log(consultaMedica);
    this.emittSalvar.emit(consultaMedica);
  }

  public btnVoltar(): void {
    //this.formGroup.reset();
  this.emittVoltar.emit(true);
  }
}
